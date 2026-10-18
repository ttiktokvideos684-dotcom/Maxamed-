/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductDetailModal } from './components/ProductDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AffiliateDisclosurePage } from './pages/AffiliateDisclosurePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

import { ActivePage, Product, BlogPost, Category, SiteSettings } from './types';
import { Store } from './lib/store';
import { Info, X } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedProductReview, setSelectedProductReview] = useState<Product | null>(null);

  // Modals / Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [showTransparencyNotice, setShowTransparencyNotice] = useState(true);

  // Core Data (Preserved in full)
  const [products, setProducts] = useState<Product[]>(Store.getProducts());
  const [categories, setCategories] = useState<Category[]>(Store.getCategories());
  const [posts, setPosts] = useState<BlogPost[]>(Store.getPosts());
  const [settings, setSettings] = useState<SiteSettings>(Store.getSettings());
  const [wishlistIds, setWishlistIds] = useState<string[]>(Store.getWishlist());

  // URL route bootstrap
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/shop') {
      setActivePage('shop');
    } else if (path === '/categories') {
      setActivePage('categories');
    } else if (path === '/blog') {
      setActivePage('blog');
    } else if (path === '/about') {
      setActivePage('about');
    } else if (path === '/contact') {
      setActivePage('contact');
    } else if (path === '/disclosure') {
      setActivePage('disclosure');
    } else if (path === '/privacy') {
      setActivePage('privacy');
    } else if (path === '/terms') {
      setActivePage('terms');
    } else if (path.startsWith('/admin')) {
      // Redirect any leftover admin URLs cleanly to home
      window.history.replaceState(null, '', '/');
      setActivePage('home');
    }
  }, []);

  // Handle URL change
  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/shop') setActivePage('shop');
      else if (path === '/categories') setActivePage('categories');
      else if (path === '/blog') setActivePage('blog');
      else if (path === '/about') setActivePage('about');
      else if (path === '/contact') setActivePage('contact');
      else if (path === '/disclosure') setActivePage('disclosure');
      else if (path === '/privacy') setActivePage('privacy');
      else if (path === '/terms') setActivePage('terms');
      else setActivePage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Store Event Listeners
  useEffect(() => {
    const handleProductsUpdated = () => setProducts([...Store.getProducts()]);
    const handleCategoriesUpdated = () => setCategories([...Store.getCategories()]);
    const handlePostsUpdated = () => setPosts([...Store.getPosts()]);
    const handleSettingsUpdated = () => setSettings({ ...Store.getSettings() });
    const handleWishlistUpdated = () => setWishlistIds([...Store.getWishlist()]);

    window.addEventListener('maha00_products_updated', handleProductsUpdated);
    window.addEventListener('maha00_categories_updated', handleCategoriesUpdated);
    window.addEventListener('maha00_posts_updated', handlePostsUpdated);
    window.addEventListener('maha00_settings_updated', handleSettingsUpdated);
    window.addEventListener('maha00_wishlist_updated', handleWishlistUpdated);

    // Global keyboard listener for search '/'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('maha00_products_updated', handleProductsUpdated);
      window.removeEventListener('maha00_categories_updated', handleCategoriesUpdated);
      window.removeEventListener('maha00_posts_updated', handlePostsUpdated);
      window.removeEventListener('maha00_settings_updated', handleSettingsUpdated);
      window.removeEventListener('maha00_wishlist_updated', handleWishlistUpdated);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleWishlist = (productId: string) => {
    Store.toggleWishlist(productId);
  };

  const handleReadReview = (product: Product) => {
    Store.recordReviewView(product.id, product.name);
    setSelectedProductReview(product);
  };

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
    navigateTo('blog-detail');
  };

  const handleSelectCategoryFromDir = (catName: string) => {
    setSelectedCategoryFilter(catName);
    navigateTo('shop');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 antialiased selection:bg-[#FF7417] selection:text-white">
      {/* Top Affiliate Transparency Notice (Dismissible) */}
      {showTransparencyNotice && (
        <div className="bg-[#071B35] text-slate-300 text-xs py-2 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-center sm:text-left flex-1 justify-center sm:justify-start">
            <Info className="w-3.5 h-3.5 text-[#FF7417] shrink-0" />
            <span>
              <strong>Editorial Transparency:</strong> {settings.brandName || 'Maha 00'} is a curated affiliate recommendation platform. Outlinks redirect to Amazon and Digistore24 with transparent merchant tracking.
            </span>
          </div>
          <button
            onClick={() => setShowTransparencyNotice(false)}
            className="p-1 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sticky Header Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlistIds.length}
        settings={settings}
      />

      {/* Main Public Page Rendering */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            settings={settings}
            products={products}
            categories={categories}
            posts={posts}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onReadReview={handleReadReview}
            onReadPost={handleReadPost}
            setActivePage={navigateTo}
            onSelectCategoryFilter={(cat) => {
              setSelectedCategoryFilter(cat);
              navigateTo('shop');
            }}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            products={products}
            categories={categories}
            initialCategory={selectedCategoryFilter}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onReadReview={handleReadReview}
          />
        )}

        {activePage === 'categories' && (
          <CategoriesPage
            categories={categories}
            products={products}
            onSelectCategory={handleSelectCategoryFromDir}
          />
        )}

        {activePage === 'blog' && (
          <BlogPage
            posts={posts}
            onReadPost={handleReadPost}
          />
        )}

        {activePage === 'blog-detail' && selectedPost && (
          <BlogDetailPage
            post={selectedPost}
            onBack={() => navigateTo('blog')}
            products={products}
            onSelectProduct={handleReadReview}
          />
        )}

        {activePage === 'about' && (
          <AboutPage setActivePage={navigateTo} />
        )}

        {activePage === 'contact' && (
          <ContactPage settings={settings} />
        )}

        {activePage === 'disclosure' && (
          <AffiliateDisclosurePage settings={settings} />
        )}

        {activePage === 'privacy' && (
          <PrivacyPolicyPage />
        )}

        {activePage === 'terms' && (
          <TermsPage />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={navigateTo} settings={settings} />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProductReview}
        onClose={() => setSelectedProductReview(null)}
        isWishlisted={selectedProductReview ? wishlistIds.includes(selectedProductReview.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={products}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={(p) => {
          setSelectedProductReview(p);
          setIsWishlistOpen(false);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        posts={posts}
        onSelectProduct={(p) => {
          setSelectedProductReview(p);
        }}
        onSelectPost={(post) => {
          setSelectedPost(post);
          navigateTo('blog-detail');
        }}
      />
    </div>
  );
}
