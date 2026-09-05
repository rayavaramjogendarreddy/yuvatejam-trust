export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  phone: string;
  altPhone?: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  registrationNo: string;
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface PageData {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt?: string;
  heroImage?: string;
  content: string;
  sections?: Array<{
    heading?: string;
    subheading?: string;
    body?: string;
    image?: string;
    items?: string[];
  }>;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export interface CauseItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  fullDescription: string;
  icon: string;
  image: string;
  stats?: { label: string; value: string }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  date?: string;
  caption?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
