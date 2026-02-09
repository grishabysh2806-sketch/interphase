export enum Language {
  EN = 'en',
  RU = 'ru'
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  imageUrl: string;
  year: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface LegalSection {
  title: string;
  content: string[];
}

export interface Tournament {
  game: string;
  date: string;
  prize: string;
  status: string;
}

export interface GearItem {
  name: string;
  type: string;
  specs: string;
}
