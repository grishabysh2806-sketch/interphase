
import { BlogPost } from '../types';
import { supabase } from './supabaseClient';

const STORAGE_KEY = 'interphase_blogs';

// Helper to get local posts
const getLocalPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Helper to save local posts
const saveLocalPosts = (posts: BlogPost[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const blogService = {
  async getPosts(): Promise<BlogPost[]> {
    if (supabase) {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data.map((post: any) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        date: new Date(post.created_at).toLocaleDateString(),
        readTime: post.read_time || '5 min',
        category: post.category,
        imageUrl: post.image_url,
        content: post.content,
        author: post.author || 'Interphase'
      }));
    } else {
      // Local Fallback
      return getLocalPosts();
    }
  },

  async getPost(id: string): Promise<BlogPost | undefined> {
    if (supabase) {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) return undefined;
      return {
        id: data.id,
        title: data.title,
        excerpt: data.excerpt,
        date: new Date(data.created_at).toLocaleDateString(),
        readTime: data.read_time || '5 min',
        category: data.category,
        imageUrl: data.image_url,
        content: data.content,
        author: data.author || 'Interphase'
      };
    } else {
      const posts = getLocalPosts();
      return posts.find(p => p.id === id);
    }
  },

  async createPost(post: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> {
    const newPost = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author || 'Interphase',
      created_at: new Date().toISOString(),
      read_time: post.readTime,
      image_url: post.imageUrl
    };

    if (supabase) {
      const { data, error } = await supabase
        .from('blogs')
        .insert([newPost])
        .select()
        .single();
        
      if (error) throw error;
      return {
          ...post,
          id: data.id,
          date: new Date(data.created_at).toLocaleDateString()
      };
    } else {
      const posts = getLocalPosts();
      const id = Date.now().toString();
      const createdPost: BlogPost = {
        id,
        ...post,
        date: new Date().toLocaleDateString()
      };
      posts.unshift(createdPost);
      saveLocalPosts(posts);
      return createdPost;
    }
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<void> {
    if (supabase) {
      const supabaseUpdates: any = { ...updates };
      if (updates.readTime) supabaseUpdates.read_time = updates.readTime;
      if (updates.imageUrl) supabaseUpdates.image_url = updates.imageUrl;
      // Remove camelCase keys if mapping needed, but Supabase ignores extra usually if not strict
      
      const { error } = await supabase
        .from('blogs')
        .update(supabaseUpdates)
        .eq('id', id);
        
      if (error) throw error;
    } else {
      const posts = getLocalPosts();
      const index = posts.findIndex(p => p.id === id);
      if (index !== -1) {
        posts[index] = { ...posts[index], ...updates };
        saveLocalPosts(posts);
      }
    }
  },

  async deletePost(id: string): Promise<void> {
    if (supabase) {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } else {
      const posts = getLocalPosts();
      const filtered = posts.filter(p => p.id !== id);
      saveLocalPosts(filtered);
    }
  },

  subscribe(callback: () => void) {
    if (supabase) {
      return supabase
        .channel('blogs')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, callback)
        .subscribe();
    } else {
      // Listen for storage events (other tabs)
      const handler = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) callback();
      };
      window.addEventListener('storage', handler);
      // Also return a cleanup function
      return { unsubscribe: () => window.removeEventListener('storage', handler) };
    }
  }
};
