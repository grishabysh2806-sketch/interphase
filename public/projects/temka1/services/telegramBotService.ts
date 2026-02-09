
import { Post } from '../types';
import { fetchChannelPosts } from './telegramService';

// Internal cache for infinite scrolling state
let cachedPosts: Post[] = [];
let nextBeforeId: string | undefined = undefined;
let isEndOfChannel = false;

export const sendContactFormToTelegram = async (name: string, email: string, message: string): Promise<boolean> => {
  try {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram configuration missing');
      return false;
    }

    const text = `
📩 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📝 *Message:*
${message || 'No message provided'}
    `;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();
    return data.ok;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};

export const fetchTelegramPostsPage = async (limit: number, offset: number, forceRefresh: boolean = false): Promise<{ posts: Post[]; hasMore: boolean }> => {
  try {
    // If forcing refresh, clear cache and reset state
    if (forceRefresh) {
        cachedPosts = [];
        nextBeforeId = undefined;
        isEndOfChannel = false;
    }

    // If the requested offset is within our cache, return from cache
    // This handles "Back" navigation or simple re-renders
    // UNLESS we are forcing refresh
    if (!forceRefresh && offset < cachedPosts.length) {
       // If we have enough posts in cache to satisfy the request
       if (offset + limit <= cachedPosts.length) {
          return {
             posts: cachedPosts.slice(offset, offset + limit),
             hasMore: !isEndOfChannel || offset + limit < cachedPosts.length
          };
       }
       // If we need more posts than cache has, we might need to fetch
    }

    // If we need to fetch more posts (i.e. we are at the end of cache)
    // Only fetch if we haven't reached the end of channel
    if (!isEndOfChannel && (offset + limit > cachedPosts.length || forceRefresh)) {
       // Fetch next batch using nextBeforeId
       const result = await fetchChannelPosts(nextBeforeId);
       
       if (result.posts.length === 0) {
          isEndOfChannel = true;
       } else {
          // If we are refreshing, we just set the cache to the new posts
          if (forceRefresh && offset === 0) {
              cachedPosts = result.posts;
          } else {
              // Filter duplicates just in case (though IDs should be unique)
              const newPosts = result.posts.filter(p => !cachedPosts.some(cp => cp.id === p.id));
              cachedPosts = [...cachedPosts, ...newPosts];
          }
          nextBeforeId = result.nextBeforeId;
       }
    }

    const slicedPosts = cachedPosts.slice(offset, offset + limit);
    
    // Check if there are more posts available
    // 1. If we have more in cache
    // 2. OR if we are not at end of channel
    const hasMore = (offset + limit < cachedPosts.length) || !isEndOfChannel;

    return {
      posts: slicedPosts,
      hasMore: hasMore
    };

  } catch (error) {
    console.error('Error fetching Telegram posts page:', error);
    return { posts: [], hasMore: false };
  }
};
