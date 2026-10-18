import React from 'react';
import { X, Trash2, ExternalLink, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { Store } from '../lib/store';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Your Saved Wishlist ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-700">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Tap the heart icon on any product or review to bookmark items for price tracking.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => {
                const hasValidUrl = Store.isValidAffiliateUrl(product.affiliateUrl);
                const affiliateUrl = hasValidUrl
                  ? Store.formatAffiliateUrl(product.affiliateUrl, product.affiliateNetwork)
                  : '';

                return (
                  <div
                    key={product.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex gap-4 items-center justify-between group"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover rounded-lg bg-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                        {product.merchantName}
                      </span>
                      <h4
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="text-xs font-bold text-slate-900 truncate hover:text-[#FF7417] cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-bold text-slate-900 tabular-nums">
                          ${product.currentPrice.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through tabular-nums">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      {hasValidUrl ? (
                        <a
                          href={affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="p-2 rounded-lg bg-[#FF7417] text-white hover:bg-[#E6620A] transition-colors cursor-pointer"
                          title="View deal on merchant site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                          }}
                          className="p-2 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer"
                          title="View product details (deal link pending)"
                        >
                          <ExternalLink className="w-4 h-4 opacity-50" />
                        </button>
                      )}
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="text-[11px] text-slate-500 text-center">
                Wishlist stored locally in your browser. Prices updated based on merchant verification.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
