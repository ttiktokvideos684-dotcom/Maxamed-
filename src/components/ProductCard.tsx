import React, { useState } from 'react';
import { Heart, Star, ExternalLink, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { Store } from '../lib/store';

interface ProductCardProps {
  product: Product;
  onReadReview: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onReadReview,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imgError, setImgError] = useState(false);
  const hasValidUrl = Store.isValidAffiliateUrl(product.affiliateUrl);
  const affiliateUrl = hasValidUrl ? Store.formatAffiliateUrl(product.affiliateUrl, product.affiliateNetwork) : '';
  const settings = Store.getSettings();

  const handleOutlinkClick = () => {
    if (!hasValidUrl) return;
    Store.recordClick(product.id, product.name, product.merchantName, affiliateUrl);
  };

  const handleReviewClick = () => {
    Store.recordReviewView(product.id, product.name);
    onReadReview(product);
  };

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-200 overflow-hidden relative">
      {/* Top Media Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        {/* Badge or Editorial Status */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-[#071B35]/90 text-white backdrop-blur-xs border border-white/10 shadow-2xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500 shadow-2xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Product Image with Fallback */}
        {!imgError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-sm font-medium text-slate-700 text-center mt-1">
              {product.name}
            </span>
          </div>
        )}

        {/* Merchant indicator tag */}
        <div className="absolute bottom-2.5 left-3 text-[11px] font-medium px-2 py-0.5 rounded bg-white/90 text-slate-700 shadow-2xs border border-slate-200/60">
          Via {product.merchantName}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Category & Rating Row - Unboxed text metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium tracking-tight text-slate-600 truncate mr-2">{product.category}</span>
          <div className="flex items-center gap-1 text-slate-700 font-semibold shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="tabular-nums">{product.starRating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal tabular-nums">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={handleReviewClick}
          className="text-base font-bold text-slate-900 group-hover:text-[#FF7417] transition-colors line-clamp-2 cursor-pointer font-display leading-snug"
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Pricing Area */}
        <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 font-display tabular-nums">
              ${product.currentPrice.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.currentPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
              Save {product.discountPercent}%
            </span>
          )}
        </div>

        {/* Price Verification Indicator */}
        {product.isPriceVerified && (
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>Verified merchant price</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={handleReviewClick}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Read Review</span>
          </button>

          {hasValidUrl ? (
            <a
              href={affiliateUrl}
              target={settings.linkOpenBehavior || '_blank'}
              rel="noopener noreferrer sponsored"
              onClick={handleOutlinkClick}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#FF7417] hover:bg-[#E6620A] rounded-lg transition-colors shadow-2xs cursor-pointer"
            >
              <span>View Deal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              disabled
              title="Affiliate destination link pending merchant verification"
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 bg-slate-100 border border-slate-200/80 rounded-lg cursor-not-allowed select-none"
            >
              <span>Deal Pending</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
