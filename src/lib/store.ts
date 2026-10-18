import {
  Product,
  BlogPost,
  Category,
  SiteSettings,
  Subscriber,
  ClickEvent,
  AdminAuthSession,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BLOG_POSTS,
  INITIAL_SITE_SETTINGS,
} from './seedData';

const STORAGE_KEYS = {
  PRODUCTS: 'maha00_products_v3_20items',
  CATEGORIES: 'maha00_categories_v3_20items',
  POSTS: 'maha00_posts_v3',
  SETTINGS: 'maha00_settings_v3',
  SUBSCRIBERS: 'maha00_subscribers_v3',
  WISHLIST: 'maha00_wishlist_v3',
  ADMIN_SESSION: 'maha00_admin_session_v3',
  ANALYTICS: 'maha00_analytics_clicks_v3',
  SUPABASE_CONFIG: 'maha00_supabase_config_v3',
};

// Internal database configuration

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
}

export const Store = {
  // ================= PRODUCTS =================
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (data) {
        const parsed: Product[] = JSON.parse(data);
        if (parsed.length >= 20 || parsed.some((p) => p.id === 'prod-01-iphone-15-pro')) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    // Seed initial products if none exist or outdated
    this.saveProducts(INITIAL_PRODUCTS);
    this.recalculateCategoryCounts();
    return INITIAL_PRODUCTS;
  },

  saveProducts(products: Product[]) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event('maha00_products_updated'));
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  },

  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find((p) => p.slug === slug);
  },

  addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    this.recalculateCategoryCounts();
    return newProduct;
  },

  updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveProducts(products);
    this.recalculateCategoryCounts();
    return products[index];
  },

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length !== products.length) {
      this.saveProducts(filtered);
      this.recalculateCategoryCounts();
      return true;
    }
    return false;
  },

  toggleProductPublished(id: string): boolean {
    const p = this.getProductById(id);
    if (p) {
      this.updateProduct(id, { published: !p.published });
      return !p.published;
    }
    return false;
  },

  toggleProductFeatured(id: string): boolean {
    const p = this.getProductById(id);
    if (p) {
      this.updateProduct(id, { featured: !p.featured });
      return !p.featured;
    }
    return false;
  },

  // ================= CATEGORIES =================
  getCategories(): Category[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (data) {
        const parsed: Category[] = JSON.parse(data);
        return parsed.sort((a, b) => a.displayOrder - b.displayOrder);
      }
    } catch {
      // fallback
    }
    this.saveCategories(INITIAL_CATEGORIES);
    return INITIAL_CATEGORIES;
  },

  saveCategories(categories: Category[]) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    window.dispatchEvent(new Event('maha00_categories_updated'));
  },

  addCategory(category: Omit<Category, 'id' | 'itemCount'>): Category {
    const categories = this.getCategories();
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
      displayOrder: categories.length + 1,
      itemCount: 0,
    };
    categories.push(newCategory);
    this.saveCategories(categories);
    this.recalculateCategoryCounts();
    return newCategory;
  },

  updateCategory(id: string, updates: Partial<Category>): Category | undefined {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    categories[index] = {
      ...categories[index],
      ...updates,
    };
    this.saveCategories(categories);
    return categories[index];
  },

  deleteCategory(id: string): boolean {
    const categories = this.getCategories();
    const filtered = categories.filter((c) => c.id !== id);
    if (filtered.length !== categories.length) {
      this.saveCategories(filtered);
      return true;
    }
    return false;
  },

  reorderCategory(id: string, direction: 'up' | 'down') {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) return;
    if (direction === 'up' && index > 0) {
      const temp = categories[index].displayOrder;
      categories[index].displayOrder = categories[index - 1].displayOrder;
      categories[index - 1].displayOrder = temp;
    } else if (direction === 'down' && index < categories.length - 1) {
      const temp = categories[index].displayOrder;
      categories[index].displayOrder = categories[index + 1].displayOrder;
      categories[index + 1].displayOrder = temp;
    }
    this.saveCategories(categories);
  },

  recalculateCategoryCounts() {
    const products = this.getProducts().filter((p) => p.published);
    const categories = this.getCategories();
    const updated = categories.map((cat) => {
      const count = products.filter((p) => p.category === cat.name).length;
      return { ...cat, itemCount: count };
    });
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    window.dispatchEvent(new Event('maha00_categories_updated'));
  },

  // ================= BLOG CMS =================
  getPosts(): BlogPost[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.POSTS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.savePosts(INITIAL_BLOG_POSTS);
    return INITIAL_BLOG_POSTS;
  },

  savePosts(posts: BlogPost[]) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    window.dispatchEvent(new Event('maha00_posts_updated'));
  },

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.getPosts().find((p) => p.slug === slug);
  },

  addPost(post: Omit<BlogPost, 'id'>): BlogPost {
    const posts = this.getPosts();
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
    };
    posts.unshift(newPost);
    this.savePosts(posts);
    return newPost;
  },

  updatePost(id: string, updates: Partial<BlogPost>): BlogPost | undefined {
    const posts = this.getPosts();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    posts[index] = {
      ...posts[index],
      ...updates,
    };
    this.savePosts(posts);
    return posts[index];
  },

  deletePost(id: string): boolean {
    const posts = this.getPosts();
    const filtered = posts.filter((p) => p.id !== id);
    if (filtered.length !== posts.length) {
      this.savePosts(filtered);
      return true;
    }
    return false;
  },

  // ================= SETTINGS =================
  getSettings(): SiteSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return INITIAL_SITE_SETTINGS;
  },

  updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    window.dispatchEvent(new Event('maha00_settings_updated'));
    return updated;
  },

  // ================= SUBSCRIBERS =================
  getSubscribers(): Subscriber[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    const initial: Subscriber[] = [
      { id: 'sub-1', email: 'tech.curator@example.com', subscribedAt: '2026-03-01T12:00:00Z', source: 'Home Footer', status: 'active' },
      { id: 'sub-2', email: 'digital.creator@example.com', subscribedAt: '2026-03-08T15:20:00Z', source: 'Blog Newsletter', status: 'active' },
      { id: 'sub-3', email: 'workspace.gear@example.com', subscribedAt: '2026-03-14T09:40:00Z', source: 'Shop Banner', status: 'active' },
    ];
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(initial));
    return initial;
  },

  addSubscriber(email: string, source = 'Website Newsletter'): boolean {
    const subscribers = this.getSubscribers();
    if (subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase() && s.status === 'active')) {
      return false; // already actively subscribed
    }
    subscribers.unshift({
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString(),
      source,
      status: 'active',
    });
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subscribers));
    window.dispatchEvent(new Event('maha00_subscribers_updated'));
    return true;
  },

  removeSubscriber(id: string): boolean {
    const subs = this.getSubscribers();
    const filtered = subs.filter((s) => s.id !== id);
    if (filtered.length !== subs.length) {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(filtered));
      window.dispatchEvent(new Event('maha00_subscribers_updated'));
      return true;
    }
    return false;
  },

  toggleSubscriberStatus(id: string): boolean {
    const subs = this.getSubscribers();
    const index = subs.findIndex((s) => s.id === id);
    if (index === -1) return false;
    subs[index].status = subs[index].status === 'active' ? 'unsubscribed' : 'active';
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subs));
    window.dispatchEvent(new Event('maha00_subscribers_updated'));
    return true;
  },

  // ================= WISHLIST =================
  getWishlist(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [];
  },

  toggleWishlist(productId: string): boolean {
    const list = this.getWishlist();
    const index = list.indexOf(productId);
    let isIn = false;
    if (index > -1) {
      list.splice(index, 1);
      isIn = false;
    } else {
      list.push(productId);
      isIn = true;
    }
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    window.dispatchEvent(new Event('maha00_wishlist_updated'));
    return isIn;
  },

  // ================= ANALYTICS & CLICK TRACKING =================
  getClickEvents(): ClickEvent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    // Return sample seeded events for realistic initial dashboard view
    const initialClicks: ClickEvent[] = [
      { id: 'clk-1', type: 'outbound_click', productId: 'prod-01', productName: 'AudioVeil Studio Wireless ANC Headphones', merchant: 'Amazon', affiliateUrl: 'https://www.amazon.com/dp/B08ZQC78M9?tag=maha00-20', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
      { id: 'clk-2', type: 'outbound_click', productId: 'prod-02', productName: 'AuraBook Pro 14 M-Series Ultrabook', merchant: 'Amazon', affiliateUrl: 'https://www.amazon.com/dp/B0CX23V6PT?tag=maha00-20', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
      { id: 'clk-3', type: 'outbound_click', productId: 'prod-03', productName: 'SynthFlow AI Content & Research Copilot', merchant: 'Digistore24', affiliateUrl: 'https://www.digistore24.com/redir/512984/maha00', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
      { id: 'clk-4', type: 'outbound_click', productId: 'prod-04', productName: 'Zenith Apex Minimalist Mechanical Keyboard', merchant: 'Amazon', affiliateUrl: 'https://www.amazon.com/dp/B0BRK8SXYZ?tag=maha00-20', timestamp: new Date(Date.now() - 3600000 * 12).toISOString() },
      { id: 'clk-5', type: 'review_view', productId: 'prod-01', productName: 'AudioVeil Studio Wireless ANC Headphones', merchant: 'Amazon', affiliateUrl: '', timestamp: new Date(Date.now() - 3600000 * 1).toISOString() },
    ];
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(initialClicks));
    return initialClicks;
  },

  recordClick(productId: string, productName: string, merchant: string, affiliateUrl: string) {
    const settings = this.getSettings();
    if (!settings.enableClickTracking) return;
    const events = this.getClickEvents();
    events.unshift({
      id: `clk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: 'outbound_click',
      productId,
      productName,
      merchant,
      affiliateUrl,
      timestamp: new Date().toISOString(),
    });
    // keep at most 500 events
    if (events.length > 500) events.length = 500;
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(events));
    window.dispatchEvent(new Event('maha00_analytics_updated'));
  },

  recordReviewView(productId: string, productName: string) {
    const events = this.getClickEvents();
    events.unshift({
      id: `view-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: 'review_view',
      productId,
      productName,
      merchant: '',
      affiliateUrl: '',
      timestamp: new Date().toISOString(),
    });
    if (events.length > 500) events.length = 500;
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(events));
  },

  getAnalyticsSummary() {
    const events = this.getClickEvents();
    const outboundClicks = events.filter((e) => e.type === 'outbound_click');
    const reviewViews = events.filter((e) => e.type === 'review_view');

    // Group by merchant
    const merchantCounts: Record<string, number> = {};
    // Group by product
    const productCounts: Record<string, { count: number; name: string; merchant: string }> = {};

    outboundClicks.forEach((e) => {
      merchantCounts[e.merchant] = (merchantCounts[e.merchant] || 0) + 1;
      if (!productCounts[e.productId]) {
        productCounts[e.productId] = { count: 0, name: e.productName, merchant: e.merchant };
      }
      productCounts[e.productId].count += 1;
    });

    const topProducts = Object.entries(productCounts)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count);

    return {
      totalOutboundClicks: outboundClicks.length,
      totalReviewViews: reviewViews.length,
      merchantCounts,
      topProducts,
      recentEvents: events.slice(0, 15),
    };
  },

  clearAnalytics() {
    localStorage.removeItem(STORAGE_KEYS.ANALYTICS);
    window.dispatchEvent(new Event('maha00_analytics_updated'));
  },

  // ================= AUTHENTICATION =================
  getAdminSession(): AdminAuthSession | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (!data) return null;
      const session: AdminAuthSession = JSON.parse(data);
      if (Date.now() > session.expiresAt) {
        this.logoutAdmin();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return false;
  },


  // ================= URL VALIDATION & FORMATTING =================
  isValidAffiliateUrl(url: string | undefined | null): boolean {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim();
    if (!trimmed || trimmed === '#' || trimmed === 'pending' || trimmed.toLowerCase().includes('placeholder')) {
      return false;
    }
    try {
      const parsed = new URL(trimmed);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  },

  formatAffiliateUrl(url: string | undefined | null, network: string): string {
    const settings = this.getSettings();
    if (!url || !this.isValidAffiliateUrl(url)) return '';

    // If Amazon Associates
    if (network === 'Amazon Associates' && settings.amazonTag) {
      try {
        const parsed = new URL(url);
        parsed.searchParams.set('tag', settings.amazonTag);
        return parsed.toString();
      } catch {
        return url;
      }
    }

    // If Digistore24
    if (network === 'Digistore24' && settings.digistoreId) {
      const parts = url.split('/');
      if (parts.length >= 5 && parts[2]?.includes('digistore24.com') && parts[3] === 'redir') {
        parts[5] = settings.digistoreId;
        return parts.join('/');
      }
    }

    return url;
  },

  // ================= SUPABASE =================
  getSupabaseConfig(): SupabaseConfig {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return {
      url: import.meta.env.VITE_SUPABASE_URL || '',
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
      isConnected: Boolean(import.meta.env.VITE_SUPABASE_URL),
    };
  },

  saveSupabaseConfig(config: SupabaseConfig) {
    localStorage.setItem(STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify(config));
    window.dispatchEvent(new Event('maha00_supabase_updated'));
  },

  // ================= RESET =================
  resetDefaults() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_BLOG_POSTS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SITE_SETTINGS));
    this.recalculateCategoryCounts();
    window.dispatchEvent(new Event('maha00_products_updated'));
    window.dispatchEvent(new Event('maha00_categories_updated'));
    window.dispatchEvent(new Event('maha00_posts_updated'));
    window.dispatchEvent(new Event('maha00_settings_updated'));
  },
};
