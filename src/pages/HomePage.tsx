import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { CategoryBar } from '../components/CategoryBar';
import { ProductCard } from '../components/ProductCard';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { BenefitsSection } from '../components/BenefitsSection';
import { BlogCard } from '../components/BlogCard';
import { NewsletterSection } from '../components/NewsletterSection';
import { Product, Category, BlogPost, SiteSettings, ActivePage } from '../types';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';

interface HomePageProps {
  settings: SiteSettings;
  products: Product[];
  categories: Category[];
  posts: BlogPost[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onReadReview: (product: Product) => void;
  onReadPost: (post: BlogPost) => void;
  setActivePage: (page: ActivePage) => void;
  onSelectCategoryFilter: (category: string | 'All') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  products,
  categories,
  posts,
  wishlistIds,
  onToggleWishlist,
  onReadReview,
  onReadPost,
  setActivePage,
  onSelectCategoryFilter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | 'All'>('All');

  // Filter products for homepage featured section (8 selected products on homepage)
  const publishedProducts = products.filter((p) => p.published);

  const featuredProducts = React.useMemo(() => {
    if (selectedFilter === 'All') {
      const featured = publishedProducts.filter((p) => p.featured);
      const others = publishedProducts.filter((p) => !p.featured);
      return [...featured, ...others];
    }
    return publishedProducts.filter((p) => p.category === selectedFilter);
  }, [publishedProducts, selectedFilter]);

  const latestPosts = posts.filter((p) => p.published).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Hero Section */}
      <Hero
        settings={settings}
        onExploreClick={() => setActivePage('shop')}
        onReviewsClick={() => setActivePage('blog')}
      />

      {/* 2. Product Categories Strip */}
      <CategoryBar
        categories={categories}
        selectedCategory={selectedFilter}
        onSelectCategory={(cat) => {
          setSelectedFilter(cat);
          if (cat !== 'All') {
            onSelectCategoryFilter(cat);
          }
        }}
        onViewAllClick={() => setActivePage('categories')}
      />

      {/* 3. Featured Affiliate Products Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF7417] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tested & Curated Picks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Featured Affiliate Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Each recommendation features verified specs, honest trade-offs, and verified merchant links from Amazon and Digistore24.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('shop')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7417] hover:text-[#E6620A] transition-colors cursor-pointer"
            >
              <span>View All Products ({publishedProducts.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs - Interactive segmented control */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none text-xs font-medium text-slate-600">
          <span className="text-slate-400 flex items-center gap-1 shrink-0 text-xs mr-2">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          {[
            'All',
            'Technology and Gadgets',
            'Audio Accessories',
            'Computers and Laptops',
            'AI Tools and Software',
            'Digital Products',
            'Home and Lifestyle',
            'Luxury Products',
            'Online Courses and E-books',
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#071B35] text-white font-semibold shadow-xs'
                  : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid - 8 Selected Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onReadReview={onReadReview}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

        {/* View All Products CTA Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setActivePage('shop')}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#071B35] hover:bg-[#0D2445] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>View All Products in Shop ({publishedProducts.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#FF7417]" />
          </button>
        </div>
      </section>

      {/* 4. Promotional Banner */}
      <PromotionalBanner
        settings={settings}
        onCtaClick={() => setActivePage('shop')}
      />

      {/* 5. Editorial Standards & Benefits */}
      <BenefitsSection />

      {/* 6. Latest Blog Articles */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold text-[#FF7417] uppercase tracking-wider">
              Editorial Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Latest Buying Guides & Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              In-depth analysis to guide your technology and software decisions without marketing hype.
            </p>
          </div>
          <button
            onClick={() => setActivePage('blog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7417] hover:text-[#E6620A] transition-colors cursor-pointer"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onReadPost={onReadPost}
            />
          ))}
        </div>
      </section>

      {/* 7. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};
