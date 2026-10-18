import React from 'react';
import { X, ExternalLink, Heart, Star, CheckCircle2, XCircle, Info, ShieldCheck, Tag, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { Store } from '../lib/store';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const settings = Store.getSettings();
  const hasValidUrl = Store.isValidAffiliateUrl(product.affiliateUrl);
  const affiliateUrl = hasValidUrl ? Store.formatAffiliateUrl(product.affiliateUrl, product.affiliateNetwork) : '';

  const handleOutboundClick = () => {
    if (!hasValidUrl) return;
    Store.recordClick(product.id, product.name, product.merchantName, affiliateUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#FF7417] font-semibold">{product.merchantName} Verified Outlink</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Modal Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Image & Specs */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#071B35] text-white text-xs font-semibold">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Key Specs Table */}
            {product.specs && product.specs.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Technical Specifications
                </h4>
                <dl className="divide-y divide-slate-200/60 text-xs">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="py-2 flex justify-between gap-4">
                      <dt className="text-slate-500">{spec.label}</dt>
                      <dd className="font-semibold text-slate-800 text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Demo Notice Disclaimer if present */}
            {product.demoNotice && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{product.demoNotice}</p>
              </div>
            )}
          </div>

          {/* Right Column: In-Depth Editorial Review & Buy Module */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-slate-900">{product.starRating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-slate-500 tabular-nums">
                  based on {product.reviewCount} customer reviews
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-display leading-tight">
                {product.name}
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Purchase & Pricing Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Current Price at {product.merchantName}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#071B35] font-display tabular-nums">
                      ${product.currentPrice.toFixed(2)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.currentPrice && (
                      <span className="text-sm text-slate-400 line-through tabular-nums">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {product.discountPercent && product.discountPercent > 0 && (
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs">
                      <Tag className="w-3 h-3" />
                      Save {product.discountPercent}%
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {hasValidUrl ? (
                  <a
                    href={affiliateUrl}
                    target={settings.linkOpenBehavior || '_blank'}
                    rel="noopener noreferrer sponsored"
                    onClick={handleOutboundClick}
                    className="flex-1 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#FF7417] hover:bg-[#E6620A] flex items-center justify-center gap-2 shadow-md shadow-[#FF7417]/25 transition-all cursor-pointer"
                  >
                    <span>View Deal on {product.merchantName}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 py-3.5 px-4 rounded-xl font-semibold text-sm text-slate-400 bg-slate-100 border border-slate-200 flex items-center justify-center gap-2 cursor-not-allowed select-none"
                    title="Affiliate destination link pending merchant verification"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span>Affiliate Deal Pending Verification</span>
                  </button>
                )}

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Redirects to merchant checkout. {settings.brandName || 'Maha 00'} may earn a verified affiliate commission.</span>
              </div>
            </div>

            {/* Editorial Long Review */}
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                Editorial Review & Benchmark Verdict
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {product.longReview}
              </p>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  What We Liked
                </h4>
                <ul className="space-y-2 text-xs text-emerald-950">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-100">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Considerations
                </h4>
                <ul className="space-y-2 text-xs text-rose-950">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✗</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
