
import { BlogPost } from '../types';

const CHANNEL_USERNAME = 'interphase_art';
const PROXY_URL = 'https://corsproxy.io/?';

interface FetchResult {
  posts: BlogPost[];
  nextBeforeId?: string;
}

const determineCategory = (text: string): string => {
  const upperText = text.toUpperCase();
  if (upperText.includes('ДИЗАЙН') || upperText.includes('DESIGN')) return 'DESIGN';
  if (upperText.includes('АРТ') || upperText.includes('ART')) return 'ART';
  if (upperText.includes('КУЛЬТУРА') || upperText.includes('CULTURE')) return 'CULTURE';
  if (upperText.includes('КОД') || upperText.includes('CODE') || upperText.includes('DEV')) return 'DEV';
  if (upperText.includes('DATA') || upperText.includes('ДАННЫЕ')) return 'DATA';
  
  // Fallback to hashtag
  const match = text.match(/#(\w+)/);
  if (match) return match[1].toUpperCase();

  return 'JOURNAL';
};

export const fetchChannelPosts = async (beforeId?: string): Promise<FetchResult> => {
  try {
    const baseUrl = `https://t.me/s/${CHANNEL_USERNAME}`;
    
    // Add timestamp to query to bust Proxy Cache (allorigins) and Browser Cache
    const cacheBuster = `&_t=${Date.now()}`;
    
    const url = beforeId 
        ? `${baseUrl}?before=${beforeId}${cacheBuster}` 
        : `${baseUrl}?${cacheBuster}`; // Ensure query param is valid

    const response = await fetch(`${PROXY_URL}${encodeURIComponent(url)}`);
    
    // corsproxy.io returns the raw HTML content directly, not a JSON object like allorigins.win
    const contents = await response.text();

    if (!contents) {
      console.error('Failed to fetch Telegram channel HTML');
      return { posts: [] };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(contents, 'text/html');
    
    const messageNodes = doc.querySelectorAll('.tgme_widget_message');
    const posts: BlogPost[] = [];
    let oldestId: string | undefined;

    messageNodes.forEach((node) => {
      const id = node.getAttribute('data-post')?.split('/').pop();
      if (!id) return;
      
      const textNode = node.querySelector('.tgme_widget_message_text');
      const text = textNode?.innerHTML.replace(/<br>/g, '\n').replace(/<[^>]+>/g, '') || '';
      
      const contentHtml = textNode?.innerHTML || '';

      // Image
      const photoNode = node.querySelector('.tgme_widget_message_photo_wrap');
      let imageUrl = '';
      if (photoNode) {
        const style = photoNode.getAttribute('style');
        const match = style?.match(/url\('([^']+)'\)/);
        if (match) {
          imageUrl = match[1];
        }
      }

      // Date
      const timeNode = node.querySelector('.tgme_widget_message_date time');
      const dateStr = timeNode?.getAttribute('datetime');
      const date = dateStr ? new Date(dateStr).toLocaleDateString() : 'Unknown Date';

      // Title
      const cleanText = text.trim();
      if (!cleanText && !imageUrl) return;

      const title = cleanText.split('\n')[0].substring(0, 50) || 'New Post';
      const excerpt = cleanText.length > 100 ? cleanText.substring(0, 100) + '...' : cleanText;

      posts.push({
        id: id,
        title: title,
        excerpt: excerpt,
        date: date,
        readTime: '1 min',
        category: determineCategory(cleanText),
        imageUrl: imageUrl,
        content: contentHtml || cleanText,
        author: 'Interphase'
      });
    });

    if (messageNodes.length > 0) {
        const firstNode = messageNodes[0];
        const firstId = firstNode.getAttribute('data-post')?.split('/').pop();
        if (firstId) {
            oldestId = firstId;
        }
    }

    return {
      posts: posts.reverse(),
      nextBeforeId: oldestId
    };

  } catch (error) {
    console.error('Error parsing Telegram channel:', error);
    return { posts: [] };
  }
};

export const fetchTelegramPosts = async (): Promise<BlogPost[]> => {
    const result = await fetchChannelPosts();
    return result.posts;
};
