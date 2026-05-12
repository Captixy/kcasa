export interface Property {
  id: string;
  img: string;
  title: string;
  location: string;
  price: string;
  type: string;
  area: string;
  link?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Post {
  id: string;
  cat: string;
  catLabel: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  img: string;
  featured?: boolean;
  body?: string;
}

export interface Service {
  id: string;
  iconName: string;
  title: string;
  desc: string;
  details?: string;
  link?: string;
  tag?: string;
}

export interface Partner {
  id: string;
  name: string;
  img: string;
}

export interface Category {
  id: string;
  label: string;
}
