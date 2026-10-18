import React, { useState, useMemo, useEffect } from 'react';
import { Search, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product, Category } from '../types';

interface ShopPageProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string | 'All';
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onReadReview: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  categories,
  initialCategory = 'All',
  wishlistIds,
  onToggleWishlist,
  onReadReview,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>(initialCategory);
  const [selectedMerchant, setSelectedMerchant] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-low' | 'price-high'>('featured');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Available merchants
  const merchants = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.merchantName)));
    return ['All', ...list];
  }, [products]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.published)
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        // Merchant filter
        if (selectedMerchant !== 'All' && p.merchantName !== selectedMerchant) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.merchantName.toLowerCase().includes(q);
          if (!matches) return false;
        }
        // Verified only
        if (verifiedOnly && !p.isPriceVerified) return false;
        // Price cap
        if (p.currentPrice > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.starRating - a.starRating;
        if (sortBy === 'price-low') return a.currentPrice - b.currentPrice;
        if (sortBy === 'price-high') return b.currentPrice - a.currentPrice;
        // featured default
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedMerchant, searchQuery, sortBy, verifiedOnly, maxPrice]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedMerchant('All');
    setSearchQuery('');
    setSortBy('featured');
    setVerifiedOnly(false);
    setMaxPrice(2000);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedMerchant !== 'All' ||
    searchQuery !== '' ||
    verifiedOnly ||
    maxPrice < 2000;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[#FF7417] uppercase tracking-wider">
            Affiliate Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Curated Products & Verified Deals
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Filter our database of evaluated gear and software. Every item contains direct affiliate outlinks to authorized merchants with up-to-date pricing.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          {/* Search + Sort Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, specs, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7417] focus:border-transparent"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedMerchant}
                onChange={(e) => setSelectedMerchant(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF7417]"
              >
                <option value="All">All Merchants</option>
                {merchants.filter((m) => m !== 'All').map((m) => (
                  <option key={m} value={m}>
                    Merchant: {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF7417]"
              >
                <option value="featured">Sort by: Featured Picks</option>
                <option value="rating">Sort by: Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Chips & Price Filter */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            {/* Category horizontal buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-[#071B35] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.name
                      ? 'bg-[#071B35] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Price & Verified Toggles */}
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#FF7417] focus:ring-[#FF7417]"
                />
                <span className="font-medium">Verified Price Only</span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-[#FF7417] hover:text-[#E6620A] font-semibold cursor-pointer ml-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Metadata & Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900 font-bold tabular-nums">{filteredProducts.length}</strong> verified affiliate products
          </span>
          <span className="text-[11px] text-slate-400">
            Outlinks open direct merchant pages in new tab
          </span>
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching products found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find any products matching your specific combination of filters. Try broadening your search or resetting all filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#071B35] text-white hover:bg-[#0D2445] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onReadReview={onReadReview}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
