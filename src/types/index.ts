export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  imageUrl?: string;
  displayOrder: number;
  published: boolean;
  itemCount: number;
}

export type AffiliateNetwork = 'Amazon Associates' | 'Digistore24' | 'Direct Merchant' | 'Custom';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string; // short description
  longReview: string; // full description / editorial review
  pros: string[];
  cons: string[];
  specs: ProductSpec[];
  imageUrl: string;
  category: string;
  merchantName: string; // e.g. Amazon, Digistore24, Keychron
  affiliateNetwork: AffiliateNetwork;
  affiliateUrl: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercent?: number;
  currency: string; // e.g. "USD", "EUR", "GBP"
  isPriceVerified: boolean;
  starRating: number;
  reviewCount: number;
  featured: boolean;
  published: boolean;
  status?: 'published' | 'draft' | 'review';
  badge?: string; // e.g. "Editor's Choice", "Top Value"
  demoNotice?: string;
  seoTitle?: string;
  seoDescription?: string;
  categoryId?: string;
  category_id?: string;
  image_url?: string;
  merchant?: string;
  affiliate_network?: string;
  affiliate_url?: string;
  price?: number;
  created_at?: string;
  updated_at?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags?: string[];
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  scheduledDate?: string;
  readTime: string;
  recommendedProductIds: string[];
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
  status: 'active' | 'unsubscribed';
}

export interface ClickEvent {
  id: string;
  type: 'outbound_click' | 'review_view';
  productId: string;
  productName: string;
  merchant: string;
  affiliateUrl: string;
  timestamp: string;
}

export interface AffiliateSettings {
  amazonTag: string;
  digistoreId: string;
  defaultMerchant: string;
  disclosureText: string;
  linkOpenBehavior: '_blank' | '_self';
  enableClickTracking: boolean;
  amazonApiConnected: boolean;
  digistoreApiConnected: boolean;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  amazonTag: string;
  digistoreId: string;
  defaultMerchant: string;
  linkOpenBehavior: '_blank' | '_self';
  enableClickTracking: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  heroCtaTarget: string;
  heroCtaSecondary: string;
  heroCtaSecondaryTarget: string;
  heroImage: string;
  promoHeadline: string;
  promoSubheadline: string;
  promoCtaText: string;
  promoCtaUrl: string;
  promoImage: string;
  newsletterHeadline: string;
  newsletterSubtext: string;
  footerAbout: string;
  disclosureNotice: string;
  contactEmail: string;
}

export interface AdminAuthSession {
  token: string;
  email: string;
  role: 'admin';
  expiresAt: number;
}

export type ActivePage = 
  | 'home'
  | 'shop'
  | 'categories'
  | 'blog'
  | 'blog-detail'
  | 'about'
  | 'contact'
  | 'disclosure'
  | 'privacy'
  | 'terms';
