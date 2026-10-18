import React from 'react';
import { ArrowLeft, Clock, User, ShieldCheck, ExternalLink, Eye, Share2, Check } from 'lucide-react';
import { BlogPost, Product } from '../types';
import { Store } from '../lib/store';

interface BlogDetailPageProps {
  post: BlogPost;
  onBack: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  post,
  onBack,
  products,
  onSelectProduct,
}) => {
  const recommendedProducts = products.filter((p) =>
    post.recommendedProductIds.includes(p.id)
  );

  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#071B35] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Buying Guides</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="text-[#FF7417] font-semibold">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>Published {post.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display leading-[1.15] text-balance">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Box */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-[#071B35] text-white flex items-center justify-center font-bold text-sm">
              <User className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
              <div className="text-xs text-slate-500">{post.author.role} · Independent Hardware Reviewer</div>
            </div>
          </div>
        </header>

        {/* Prominent FTC Affiliate Disclosure Notice */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Affiliate Disclosure:</span> Nexora Picks is reader-supported. This guide contains curated affiliate links to Amazon Associates and Digistore24. If you purchase through our links, we may receive a commission at zero additional cost to you. Our testing and rankings remain strictly independent.
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
          <img
            src={post.featuredImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Article Prose Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-2xs space-y-6">
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700">
            {post.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-8 mb-3">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="text-lg font-bold text-slate-900 font-display mt-6 mb-2">
                    {trimmed.replace('#### ', '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
                return (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 my-4 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {trimmed}
                  </div>
                );
              }

              return (
                <p key={idx} className="mb-4">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>

        {/* Embedded Affiliate Recommendations */}
        {recommendedProducts.length > 0 && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#FF7417] uppercase tracking-wider">
                Vetted Gear in This Guide
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
                Featured Products Mentioned
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Direct merchant outlinks with verified pricing and buyer guarantees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedProducts.map((p) => {
                const affiliateUrl = Store.formatAffiliateUrl(p.affiliateUrl, p.affiliateNetwork);
                return (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-[#FF7417]/50 bg-slate-50/50 flex flex-col justify-between gap-4 transition-all"
                  >
                    <div className="flex gap-4">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 object-cover rounded-lg bg-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                          {p.category} · Via {p.merchantName}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 truncate">
                          {p.name}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                          {p.description}
                        </p>
                        <div className="text-sm font-extrabold text-[#071B35] mt-1 tabular-nums">
                          ${p.currentPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                      <button
                        onClick={() => onSelectProduct(p)}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Read Review</span>
                      </button>

                      <a
                        href={affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold rounded-lg bg-[#FF7417] text-white hover:bg-[#E6620A] transition-colors shadow-2xs cursor-pointer"
                      >
                        <span>Check Price</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
