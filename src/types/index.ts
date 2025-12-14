import type { Timestamp } from 'firebase/firestore';

export type Product = {
  id: string;
  title: string;
  description: string;
  category: 'Diagnostic Devices' | 'Respiratory Care' | 'Mobility Aids' | 'Hospital Supplies' | 'disposal';
  price?: number;
  specs: { name: string; value: string }[];
  imageUrls?: string[];
  demo_link?: string;
  brochureUrl?: string;
  featured?: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type DemoVideo = {
  id: string;
  title: string;
  embedUrl: string;
};

export type Order = {
  id: string;
  productId: string;
  productTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: Timestamp;
}
