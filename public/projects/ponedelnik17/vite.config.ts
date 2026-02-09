import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  const TELEGRAM_CHANNEL_USERNAME = env.TELEGRAM_CHANNEL_USERNAME || 'mondeydelnik';

  const MONGODB_URI = env.MONGODB_URI || '';
  const MONGODB_DB = env.MONGODB_DB || 'monday';

  const SMTP_HOST = env.SMTP_HOST || '';
  const SMTP_PORT = Number(env.SMTP_PORT || 587);
  const SMTP_SECURE = String(env.SMTP_SECURE || '').toLowerCase() === 'true';
  const SMTP_USER = env.SMTP_USER || '';
  const SMTP_PASS = env.SMTP_PASS || '';
  const SMTP_FROM = env.SMTP_FROM || SMTP_USER || '';

  const SITE_URL = env.SITE_URL || 'http://localhost:3000';

  const cache: CachedPost[] = [];
  const cacheById = new Map<string, CachedPost>();
  let oldestLoadedMessageId: number | null = null;
  let endReached = false;

  let mongoClient: MongoClient | null = null;
  let mongoReady = false;

  const getMongo = async () => {
    if (!MONGODB_URI) return null;
    if (!mongoClient) mongoClient = new MongoClient(MONGODB_URI);
    if (!mongoReady) {
      await mongoClient.connect();
      const db = mongoClient.db(MONGODB_DB);
      await db.collection('subscribers').createIndex({ email: 1 }, { unique: true });
      await db.collection('notified_posts').createIndex({ postId: 1 }, { unique: true });
      mongoReady = true;
    }
    return mongoClient.db(MONGODB_DB);
  };

  const isValidEmail = (email: string) => {
    const e = email.trim().toLowerCase();
    if (!e) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const getMailer = () => {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) return null;
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  };

  const notifyNewPost = async (p: CachedPost) => {
    const db = await getMongo();
    if (!db) return;
    const transporter = getMailer();
    if (!transporter) return;

    const postId = p.id;
    try {
      await db.collection('notified_posts').insertOne({ postId, ts: p._ts, createdAt: new Date() });
    } catch (e: any) {
      if (String(e?.code) === '11000') return;
      throw e;
    }

    const subscribers = await db.collection('subscribers').find({ confirmed: true }).toArray();
    if (subscribers.length === 0) return;

    const subject = `Новый пост: ${p.title.RU}`;
    const link = `${SITE_URL}#/post/${encodeURIComponent(postId)}`;
    const text = `${p.title.RU}\n\n${p.content.RU}\n\nОткрыть: ${link}`;
    const html = `
        <div style="font-family: serif; line-height: 1.5;">
          <div style="letter-spacing: .2em; font-size: 12px; text-transform: uppercase; color: #777;">Monday Magazine</div>
          <h2 style="margin: 16px 0;">${p.title.RU}</h2>
          <p style="white-space: pre-wrap; color: #333;">${p.content.RU}</p>
          <p style="margin-top: 24px;"><a href="${link}">Открыть пост</a></p>
        </div>
      `;

    await Promise.allSettled(
      subscribers.map((s: any) =>
        transporter.sendMail({
          from: SMTP_FROM,
          to: s.email,
          subject,
          text,
          html,
        })
      )
    );
  };

  const upsertPost = (p: CachedPost) => {
    cacheById.set(p.id, p);
    const idx = cache.findIndex(x => x.id === p.id);
    if (idx >= 0) cache[idx] = p;
    else cache.push(p);
    cache.sort((a, b) => b._ts - a._ts);
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
    // Telegram HTML can vary (quotes, attributes order, etc.).
    // Find every message wrapper opening tag in a robust way.
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

      // Each message has its own datetime; if it's missing, skip to avoid incorrect dates.
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

      // IMPORTANT: only extract actual post photos. Do NOT take generic <img> tags
      // because they include avatars, emoji sprites and other unrelated images.
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
    const base = `https://t.me/s/${TELEGRAM_CHANNEL_USERNAME}`;
    const url = before ? `${base}?before=${before}` : base;
    const res = await fetch(url, {
      headers: {
        // Telegram sometimes returns lighter HTML if you send a UA.
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/html',
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch telegram public page: ${res.status}`);
    const html = await res.text();
    return parseTelegramPublicHtml(html);
  };

  const ensureCacheSize = async (minCount: number) => {
    // Avoid infinite loops on huge channels.
    const maxPages = 50;
    let pages = 0;

    while (!endReached && cache.length < minCount && pages < maxPages) {
      pages += 1;
      const before = oldestLoadedMessageId ?? undefined;
      const isLatestFetch = oldestLoadedMessageId === null;
      const sizeBefore = cacheById.size;
      const { posts, oldestId } = await fetchTelegramPublicPage(before);
      if (posts.length === 0) {
        endReached = true;
        break;
      }

      for (const p of posts) {
        const isNew = !cacheById.has(p.id);
        if (isNew) upsertPost(p);
        if (isNew && isLatestFetch) {
          try {
            await notifyNewPost(p);
          } catch {
            // ignore mail/mongo errors to avoid breaking the feed
          }
        }
      }

      if (oldestId !== null) {
        // next page should go strictly before the oldest id
        oldestLoadedMessageId = oldestId;
      } else {
        endReached = true;
        break;
      }

      // Heuristic: if we didn't add anything new, stop
      if (cacheById.size === sizeBefore) {
        endReached = true;
        break;
      }
    }
  };

  return {
    base: './',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'telegram-posts-api',
        configureServer(server) {
          server.middlewares.use('/api/posts', async (req, res) => {
            try {
              const u = new URL(req.url ?? '', 'http://localhost');
              const limit = Math.min(50, Math.max(1, Number(u.searchParams.get('limit') ?? 10)));
              const offset = Math.max(0, Number(u.searchParams.get('offset') ?? 0));

              await ensureCacheSize(offset + limit + 1);
              const posts = cache.slice(offset, offset + limit).map(({ _ts, ...rest }) => {
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

              const hasMore = !endReached || cache.length > offset + limit;

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ posts, hasMore }));
            } catch (e: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: String(e?.message ?? e), posts: [] }));
            }
          });

          server.middlewares.use('/api/subscribe', async (req, res) => {
            try {
              if (req.method !== 'POST') {
                res.statusCode = 405;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Method not allowed' }));
                return;
              }

              const db = await getMongo();
              if (!db) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'MongoDB is not configured' }));
                return;
              }

              const chunks: Buffer[] = [];
              await new Promise<void>((resolve, reject) => {
                req.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
                req.on('end', () => resolve());
                req.on('error', reject);
              });

              const raw = Buffer.concat(chunks).toString('utf8') || '{}';
              const body = JSON.parse(raw);
              const email = String(body?.email ?? '').trim().toLowerCase();

              if (!isValidEmail(email)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid email' }));
                return;
              }

              const now = new Date();
              try {
                await db.collection('subscribers').updateOne(
                  { email },
                  { $setOnInsert: { email, createdAt: now, confirmed: true }, $set: { updatedAt: now } },
                  { upsert: true }
                );
              } catch (e: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: String(e?.message ?? e) }));
                return;
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
            } catch (e: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: String(e?.message ?? e) }));
            }
          });
        },
      },
    ],
    define: {
      // 'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // 'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
