export interface Product {
  id: string;
  sku: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  salePrice: number; // Giá bán (VND)
  rentalPrice: number; // Giá thuê (VND / 3 ngày)
  rentalDeposit?: number; // Tiền cọc (VND)
  images: string[];
  mainImage: string;
  sizes: ('S' | 'M' | 'L' | 'XL' | 'May đo')[];
  colors: string[]; // e.g., ["Trắng", "Đỏ Hoàng Gia", "Champagne"]
  material: string; // e.g., "Lụa Tơ Tằm Bảo Lộc & Ren Pháp Thêu Tay"
  style: string; // e.g., "Hoàng Gia - Cổ Điển"
  occasion: string; // e.g., "Đám Hỏi & Lễ Cưới"
  description: string;
  highlightFeatures: string[];
  careInstructions: string;
  status: 'In Stock' | 'May Đo Riêng' | 'Sắp Ra Mắt';
  featured?: boolean;
  isNew?: boolean;
  rating?: number;
  viewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  itemCount: number;
  parentId?: string;
  level?: number;
}

export interface ContactConfig {
  shopName?: string;
  logoUrl?: string;
  phone: string;
  phoneFormatted: string;
  zaloUrl: string;
  messengerUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  instagramUrl: string;
  shopeeUrl: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  email: string;
  showroomAddress: string;
  showroomBranch2: string;
  openHours: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  categorySlug?: string;
}

export interface ConsultationInquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  productSku?: string;
  productTitle?: string;
  showroomBranch: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  date: string;
  excerpt: string;
  readTime: string;
  author: string;
}

export interface CustomServiceItem {
  id: string;
  title: string;
  subtitle: string;
  priceTag: string;
  image: string;
  description: string;
  features: string[];
}

export interface RentalProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface PricingPolicyItem {
  id: string;
  category: string;
  rental3DaysPrice: string;
  rental7DaysPrice: string;
  depositRate: string;
  tailorPrice: string;
}

export type ActiveTab = 'home' | 'collection' | 'about' | 'services' | 'rental-guide' | 'contact' | 'admin';
