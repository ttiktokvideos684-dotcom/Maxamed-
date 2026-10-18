import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag, BookOpen, ExternalLink } from 'lucide-react';
import { Product, BlogPost } from '../types';
import { Store } from '../lib/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  posts: BlogPost[];
  onSelectProduct: (product: Product) => void;
  onSelectPost: (post: BlogPost) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  posts,
  onSelectProduct,
  onSelectPost,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredProducts = normalizedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery) ||
          p.merchantName.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const filteredPosts = normalizedQuery
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(normalizedQuery) ||
          post.excerpt.toLowerCase().includes(normalizedQuery) ||
          post.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories, reviews, or merchants..."
            className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-200/60 hover:bg-slate-200 rounded-md font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!normalizedQuery ? (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <p className="text-xs">Type keywords like "laptop", "headphones", "Amazon", "AI", or "Masterclass"</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['AudioVeil', 'Laptop', 'SynthFlow', 'Keyboard', 'Course'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 && filteredPosts.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p className="text-sm font-semibold text-slate-600">No matches found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try another keyword or browse by category</p>
            </div>
          ) : (
            <>
              {/* Product Matches */}
              {filteredProducts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    <Tag className="w-3.5 h-3.5 text-[#FF7417]" />
                    <span>Affiliate Products ({filteredProducts.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredProducts.map((p) => {
                      const hasValidUrl = Store.isValidAffiliateUrl(p.affiliateUrl);
                      const affiliateUrl = hasValidUrl ? Store.formatAffiliateUrl(p.affiliateUrl, p.affiliateNetwork) : '';
                      return (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl border border-slate-200 hover:border-[#FF7417]/50 hover:bg-slate-50 transition-all flex items-center justify-between gap-3 group"
                        >
                          <div
                            onClick={() => {
                              onSelectProduct(p);
                              onClose();
                            }}
                            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                          >
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 object-cover rounded-lg bg-slate-100 shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                                {p.category} · Via {p.merchantName}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#FF7417] truncate">
                                {p.name}
                              </h4>
                              <span className="text-xs font-bold text-slate-900 tabular-nums">
                                ${p.currentPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                onSelectProduct(p);
                                onClose();
                              }}
                              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1 bg-slate-100 rounded cursor-pointer"
                            >
                              Review
                            </button>
                            {hasValidUrl ? (
                              <a
                                href={affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="p-1.5 rounded bg-[#FF7417] text-white hover:bg-[#E6620A]"
                                title="Go to merchant deal"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <span
                                className="text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded"
                                title="Affiliate destination pending verification"
                              >
                                Link Pending
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Blog Matches */}
              {filteredPosts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Editorial Guides & Reviews ({filteredPosts.length})</span>
                  </div>
                  <div className="space-y-2">
                    {filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          onSelectPost(post);
                          onClose();
                        }}
                        className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-slate-500 uppercase">
                            {post.category} · {post.readTime}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 truncate">
                            {post.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {post.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
