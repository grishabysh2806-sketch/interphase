export interface ServiceItem {
  id: number;
  title: string;
  price: string;
  duration: string;
  description: string;
}

export interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}