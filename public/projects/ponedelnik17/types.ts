
export type Language = 'RU' | 'EN';

export interface Post {
  id: string;
  title: {
    RU: string;
    EN: string;
  };
  content: {
    RU: string;
    EN: string;
  };
  imageUrl: string;
  images: string[];
  date: string;
  timestamp: number;
  category: {
    RU: string;
    EN: string;
  };
  telegramUrl?: string;
}

export interface Dictionary {
  heroTitle: { RU: string; EN: string };
  heroSubtitle: { RU: string; EN: string };
  loadMore: { RU: string; EN: string };
  about: { RU: string; EN: string };
  subscribe: { RU: string; EN: string };
}
