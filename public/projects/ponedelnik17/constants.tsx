
import { Post, Dictionary } from './types';

export const DICTIONARY: Dictionary = {
  heroTitle: {
    RU: "ПОНЕДЕЛЬНИК",
    EN: "MONDAY"
  },
  heroSubtitle: {
    RU: "ЦИФРОВОЙ ЖУРНАЛ О КУЛЬТУРЕ И ВИЗУАЛЕ",
    EN: "DIGITAL MAGAZINE ON CULTURE AND VISUALS"
  },
  loadMore: {
    RU: "ЗАГРУЗИТЬ ЕЩЕ",
    EN: "LOAD MORE"
  },
  about: {
    RU: "О ПРОЕКТЕ",
    EN: "ABOUT"
  },
  subscribe: {
    RU: "ПОДПИСАТЬСЯ",
    EN: "SUBSCRIBE"
  }
};

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: {
      RU: "Архитектура Будущего",
      EN: "Future Architecture"
    },
    content: {
      RU: "Исследование того, как цифровые технологии меняют наше восприятие пространства и формы в городской среде. От параметризма до метавселенных.",
      EN: "Exploring how digital technologies change our perception of space and form in the urban environment. From parametricism to metaverses."
    },
    imageUrl: "https://picsum.photos/id/10/1200/800",
    images: ["https://picsum.photos/id/10/1200/800"],
    date: "23.05.2024",
    timestamp: new Date('2024-05-23').getTime(),
    category: { RU: "ДИЗАЙН", EN: "DESIGN" }
  },
  {
    id: '2',
    title: {
      RU: "Эстетика Киберпанка",
      EN: "Cyberpunk Aesthetics"
    },
    content: {
      RU: "Почему неоновые огни и дождливые улицы стали символом нашего десятилетия? Разбираем культурный код жанра.",
      EN: "Why have neon lights and rainy streets become the symbol of our decade? Analyzing the genre's cultural code."
    },
    imageUrl: "https://picsum.photos/id/15/1200/800",
    images: ["https://picsum.photos/id/15/1200/800"],
    date: "21.05.2024",
    timestamp: new Date('2024-05-21').getTime(),
    category: { RU: "КУЛЬТУРА", EN: "CULTURE" }
  },
  {
    id: '3',
    title: {
      RU: "Цифровой Модернизм",
      EN: "Digital Modernism"
    },
    content: {
      RU: "Новое прочтение классических форм через призму современных рендеров и AI-генерации.",
      EN: "A new interpretation of classic forms through the lens of modern renders and AI generation."
    },
    imageUrl: "https://picsum.photos/id/20/1200/800",
    images: ["https://picsum.photos/id/20/1200/800"],
    date: "19.05.2024",
    timestamp: new Date('2024-05-19').getTime(),
    category: { RU: "АРТ", EN: "ART" }
  },
  {
    id: '4',
    title: {
      RU: "Звук Понедельника",
      EN: "Sound of Monday"
    },
    content: {
      RU: "Интервью с эмбиент-продюсерами о том, как музыка помогает структурировать рабочую неделю.",
      EN: "An interview with ambient producers on how music helps structure the work week."
    },
    imageUrl: "https://picsum.photos/id/24/1200/800",
    images: ["https://picsum.photos/id/24/1200/800"],
    date: "17.05.2024",
    timestamp: new Date('2024-05-17').getTime(),
    category: { RU: "МУЗЫКА", EN: "MUSIC" }
  }
];
