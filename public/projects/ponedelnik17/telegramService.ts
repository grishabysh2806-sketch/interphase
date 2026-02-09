import { Post } from './types';

type ApiPostsResponse = {
  posts: Post[];
  hasMore?: boolean;
};

export const fetchTelegramPostsPage = async (limit: number = 10, offset: number = 0): Promise<{ posts: Post[]; hasMore: boolean }> => {
  try {
    const response = await fetch(
      `/api/posts?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiPostsResponse = await response.json();
    return { posts: data.posts ?? [], hasMore: Boolean(data.hasMore) };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error fetching Telegram posts:', error);
    }
    return { posts: [], hasMore: false };
  }
};

export const fetchTelegramPosts = async (limit: number = 10, offset: number = 0): Promise<Post[]> => {
  const page = await fetchTelegramPostsPage(limit, offset);
  return page.posts;
};

export const getTelegramFileUrl = async (fileId: string): Promise<string> => {
  try {
    // File URLs should be generated on the server side (token must not be in the browser).
    // Keep this stub for future expansion.
    void fileId;
  } catch (error) {
    console.error('Error getting Telegram file URL:', error);
  }

  return '';
};
