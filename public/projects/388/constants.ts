import { ServiceItem, Review, NavLink } from './types';
import heroBgImg from './hero/bali.webp';
import birdImg from './bird.jpg';
import bird3Img from './bird3.jpeg';
import bird4Img from './bird4.jpeg';
import bird5Img from './bird5.jpg';
import bird6Img from './bird6.jpeg';
import nails1Img from './71_main-v1691139770.webp';
import nails2Img from './TPjANY2nWWQUyt0leQXQUG2n4MNJz0lrcYVwvYVw-content_front.jpg';
import nails3Img from './cJUVoNhbTZ7oXmEZcXLxrTBttvg1Lwppft6KxIdP-content_front.jpg';
import nails4Img from './71_main-v1691139770.webp';

// Configured constants for the application

export const NAV_LINKS: NavLink[] = [
  { label: 'Услуги', href: '#services' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "Маникюр 'Всё включено'",
    price: "2 500 ₽",
    duration: "1.5 ч",
    description: "Снятие, комбинированный маникюр, выравнивание, покрытие гель-лак."
  },
  {
    id: 2,
    title: "Наращивание 'Джунгли'",
    price: "3 800 ₽",
    duration: "2.5 ч",
    description: "Наращивание ногтей любой длины, моделирование формы, однотонное покрытие."
  },
  {
    id: 3,
    title: "Smart-Педикюр",
    price: "3 000 ₽",
    duration: "1.5 ч",
    description: "Обработка стоп дисками, пальчики, покрытие, легкий массаж."
  },
  {
    id: 4,
    title: "Дизайн 'Тропик'",
    price: "от 300 ₽",
    duration: "+30 мин",
    description: "Ручная роспись (флора, фауна), стемпинг, френч."
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Алина В.",
    rating: 5,
    text: "Это не салон, это настоящий курорт! Атмосфера Бали посреди города. Маникюр идеальный, держится уже 4 недели."
  },
  {
    id: 2,
    name: "Кристина М.",
    rating: 5,
    text: "Потрясающий сервис. Угостили манговым смузи, сделали шикарный дизайн с пальмами. Я в восторге!"
  },
  {
    id: 3,
    name: "Елена С.",
    rating: 5,
    text: "Очень уютно, зелено и стильно. Мастера профессионалы. Спасибо за красоту!"
  }
];

// URLs for tropical imagery (using Unsplash source for high quality)
export const IMAGES = {
  heroBg: heroBgImg,
  leafOverlay: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1000&auto=format&fit=crop", // Simulated transparent leaf
  parrot: birdImg,
  toucan: bird5Img,
  monkey: bird6Img,
  jaguar: bird3Img,
  flamingo: bird4Img,
  nails1: nails1Img,
  nails2: nails2Img,
  nails3: nails3Img,
  nails4: nails4Img,
};
