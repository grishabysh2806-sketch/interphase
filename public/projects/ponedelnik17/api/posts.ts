import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

type CachedPost = {
  id: string;
  title: { RU: string; EN: string };
  content: { RU: string; EN: string };
  imageUrl: string;
  images: string[];
  date: string;
  category: { RU: string; EN: string };
  _ts: number;
  telegramUrl?: string;
};

const decodeHtml = (s: string) => s
  .replaceAll('&nbsp;', ' ')
  .replaceAll('&#160;', ' ')
  .replace(/&#(\d+);/g, (_, n) => {
    const cp = Number(n);
    if (!Number.isFinite(cp)) return _;
    try { return String.fromCodePoint(cp); } catch { return _; }
  })
  .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
    const cp = Number.parseInt(String(hex), 16);
    if (!Number.isFinite(cp)) return _;
    try { return String.fromCodePoint(cp); } catch { return _; }
  })
  .replaceAll('&amp;', '&')
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replaceAll('&quot;', '"')
  .replaceAll('&#039;', "'");

const stripTags = (s: string) => s.replace(/<[^>]*>/g, '');

const htmlToTextPreserveLayout = (html: string) => {
  const withNewlines = html
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(p|div|blockquote)>/gi, '\n')
    .replace(/<\/(li)>/gi, '\n');

  return decodeHtml(stripTags(withNewlines))
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const splitMessageBlocks = (html: string): string[] => {
  const idxs: number[] = [];
  const re = /<div[^>]*\btgme_widget_message_wrap\b[^>]*>/g;
  for (const m of html.matchAll(re)) {
    if (typeof m.index === 'number') idxs.push(m.index);
  }
  if (idxs.length === 0) return [];

  const blocks: string[] = [];
  for (let k = 0; k < idxs.length; k += 1) {
    const start = idxs[k];
    const end = k + 1 < idxs.length ? idxs[k + 1] : html.length;
    blocks.push(html.slice(start, end));
  }
  return blocks;
};

const parseTelegramPublicHtml = (html: string): { posts: CachedPost[]; oldestId: number | null } => {
  const posts: CachedPost[] = [];
  let oldestId: number | null = null;

  const blocks = splitMessageBlocks(html);
  for (const block of blocks) {
    const dataPost = block.match(/data-post=["']([^"']+)["']/)?.[1];
    const msgIdStr = dataPost?.split('/')?.[1];
    const messageId = msgIdStr ? Number(msgIdStr) : NaN;
    if (!Number.isFinite(messageId)) continue;

    const telegramUrl = dataPost ? `https://t.me/${dataPost}` : undefined;

    const datetime = block.match(/datetime=["']([^"']+)["']/)?.[1];
    if (!datetime) continue;
    const ts = Date.parse(datetime);
    if (!Number.isFinite(ts)) continue;

    const textHtml = block.match(/<div[^>]*class=["'][^"']*tgme_widget_message_text[^"']*["'][^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
    const text = htmlToTextPreserveLayout(textHtml);

    const firstLine = text.split('\n')[0]?.trim() || '';
    const words = text.split(/\s+/).filter(Boolean);
    const title = firstLine && firstLine.length <= 120
      ? firstLine
      : (words.length > 0
        ? (words.slice(0, 8).join(' ') + (words.length > 8 ? '...' : ''))
        : `Пост #${messageId}`);
    const content = text.split('\n').slice(1).join('\n').trim() || text;

    const photoStyleUrls = Array.from(
      block.matchAll(/tgme_widget_message_photo_wrap[\s\S]*?style=["'][^"']*background-image:url\('([^']+)'\)/g)
    ).map(m => m[1]).filter(Boolean);

    const images: string[] = [];
    const seen = new Set<string>();
    for (const url of photoStyleUrls) {
      if (!seen.has(url)) {
        seen.add(url);
        images.push(url);
      }
    }

    const imageUrl = images[0] || '';
    if (!text.trim() && images.length === 0) continue;

    const p: CachedPost = {
      id: String(messageId),
      title: { RU: title, EN: title },
      content: { RU: content, EN: content },
      category: { RU: 'ТЕЛЕГРАМ', EN: 'TELEGRAM' },
      imageUrl,
      images,
      date: new Date(ts).toLocaleDateString('ru-RU'),
      _ts: ts,
      telegramUrl,
    };

    posts.push(p);
    oldestId = oldestId === null ? messageId : Math.min(oldestId, messageId);
  }

  return { posts, oldestId };
};

const fetchTelegramPublicPage = async (before?: number) => {
  const channel = process.env.TELEGRAM_CHANNEL_USERNAME || 'mondeydelnik';
  const base = `https://t.me/s/${channel}`;
  const url = before ? `${base}?before=${before}` : base;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'text/html',
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch telegram public page: ${res.status}`);
  const html = await res.text();
  return parseTelegramPublicHtml(html);
};

let client: MongoClient | null = null;
let mongoReady = false;

const getMongoDb = async () => {
  const uri = process.env.MONGODB_URI || '';
  const dbName = process.env.MONGODB_DB || 'monday';
  if (!uri) return null;

  if (!client) client = new MongoClient(uri);
  if (!mongoReady) {
    await client.connect();
    const db = client.db(dbName);
    await db.collection('subscribers').createIndex({ email: 1 }, { unique: true });
    await db.collection('notified_posts').createIndex({ postId: 1 }, { unique: true });
    mongoReady = true;
  }
  return client.db(dbName);
};

const getMailer = () => {
  const host = process.env.SMTP_HOST || '';
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';
  if (!host || !user || !pass) return null;
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
};

const notifyNewPostsIfAny = async (posts: CachedPost[]) => {
  const db = await getMongoDb();
  if (!db) return;
  const transporter = getMailer();
  if (!transporter) return;

  const from = process.env.SMTP_FROM || process.env.SMTP_USER || '';
  if (!from) return;

  const siteUrl = process.env.SITE_URL || 'https://example.com';

  const subscribers = await db.collection('subscribers').find({ confirmed: true }).toArray();
  if (subscribers.length === 0) return;

  for (const p of posts) {
    try {
      await db.collection('notified_posts').insertOne({ postId: p.id, ts: p._ts, createdAt: new Date() });
    } catch (e: any) {
      if (String(e?.code) === '11000') continue;
      continue;
    }

    const link = `${siteUrl}#/post/${encodeURIComponent(p.id)}`;
    const subject = `Новый пост: ${p.title.RU}`;
    const text = `${p.title.RU}\n\n${p.content.RU}\n\nОткрыть: ${link}`;

    await Promise.allSettled(
      subscribers.map((s: any) =>
        transporter.sendMail({
          from,
          to: s.email,
          subject,
          text,
          html: `<div style="font-family: serif; line-height: 1.5;"><h2>${p.title.RU}</h2><p style="white-space: pre-wrap;">${p.content.RU}</p><p><a href="${link}">Открыть пост</a></p></div>`,
        })
      )
    );
  }
};

export default async function handler(req: any, res: any) {
  try {
    const limit = Math.min(50, Math.max(1, Number(req.query?.limit ?? 10)));
    const offset = Math.max(0, Number(req.query?.offset ?? 0));

    // Robust pagination: fetch pages from newest going backwards until we have enough unique posts.
    const target = offset + limit + 1; // +1 for hasMore check
    const maxPages = 25;

    let before: number | undefined = undefined;
    let pages = 0;
    let reachedEnd = false;

    const byId = new Map<string, CachedPost>();

    while (pages < maxPages && !reachedEnd && byId.size < target) {
      pages += 1;
      const { posts, oldestId } = await fetchTelegramPublicPage(before);

      if (!posts || posts.length === 0) {
        reachedEnd = true;
        break;
      }

      for (const p of posts) {
        byId.set(p.id, p);
      }

      if (oldestId === null) {
        reachedEnd = true;
        break;
      }

      // Telegram `before` is exclusive: request messages strictly before this id.
      before = oldestId;
    }

    const all = Array.from(byId.values()).sort((a, b) => (b._ts ?? 0) - (a._ts ?? 0));

    const slice = all.slice(offset, offset + limit);
    const hasMore = all.length > offset + limit ? true : !reachedEnd;

    // Send notifications only on the first page request
    if (offset === 0 && slice.length > 0) {
      void notifyNewPostsIfAny(slice);
    }

    // Adapt to frontend Post type: timestamp is expected and proxy images
    const out = slice.map(({ _ts, ...rest }) => {
      const proxyImageUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http') && (
          url.includes('telegram.org') || 
          url.includes('t.me') || 
          url.includes('telesco.pe') || 
          url.includes('telegram-cdn.org')
        )) {
          return `/api/proxy-image?url=${encodeURIComponent(url)}`;
        }
        return url;
      };

      return {
        ...rest,
        timestamp: _ts,
        imageUrl: proxyImageUrl(rest.imageUrl),
        images: rest.images?.map(proxyImageUrl) || []
      };
    });

    res.status(200).json({ posts: out, hasMore });
  } catch (e: any) {
    res.status(500).json({ error: String(e?.message ?? e), posts: [], hasMore: false });
  }
}
