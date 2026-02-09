
export type Language = 'en' | 'ru';

export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  company: string;
}

export interface ServiceItem {
  id: string;
  number: string; // e.g., "01"
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[]; // List of bullet points
  faq: FAQItem[]; // 5 specific questions
  cta: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string;
  liveUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  content: string; // Can be HTML string or plain text with paragraphs
  author: string;
}

export type Post = BlogPost;

export interface USPItem {
  title: string;
  description: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  cta: string;
  whyChooseUs: {
    title: string;
    items: USPItem[];
  };
}

export interface FooterContent {
  sitemapTitle: string;
  socialTitle: string;
  contactTitle: string;
  rights: string;
  privacy: string;
  developedBy: string;
}

export interface UIContent {
  viewDetails: string;
  systemModule: string;
  backToServices: string;
  backToJournal: string;
  readyToStart: string;
  share: string;
  readMore: string;
  lightMode: string;
  darkMode: string;
  initializing: string;
  systemLog: string;
  endOfBuffer: string;
  readOnly: string;
  notFound: string;
  goHome: string;
  articleNotFound: string;
}

export interface PrivacyBlock {
  title?: string;
  content: string;
}

export interface PrivacyContent {
  title: string;
  lastUpdated: string;
  back: string;
  blocks: PrivacyBlock[];
}

export interface ContentDictionary {
  nav: NavItem[];
  ui: UIContent;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: AboutContent;
  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
    paymentTitle: string;
    paymentDescription: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    testimonials: Testimonial[];
    ctaTitle: string;
    ctaButton: string;
  };
  services: {
    title: string;
    subtitle: string; // "Services" label
    items: ServiceItem[];
  };
  portfolio: {
    title: string;
    subtitle: string;
    outro?: string;
    visitLink: string;
    items: ProjectItem[];
  };
  blog: {
    title: string;
    subtitle: string;
    items: BlogPost[];
    readMore: string;
    backText: string;
  };
  generalFaq: {
    title: string;
    subtitle: string;
    items: FAQItem[];
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    telegramButton: string;
    telegramLink: string;
  };
  footer: FooterContent;
  privacy: PrivacyContent;
}
