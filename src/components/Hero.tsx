import React from 'react';
import { ArrowRight, CheckCircle2, Star, Shield, BookOpen } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
  onExploreClick: () => void;
  onReviewsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onExploreClick,
  onReviewsClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#071B35] text-white pt-8 pb-16 lg:py-20 border-b border-[#0D2445]">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF7417]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="text-[#FF7417] font-semibold">Nexora Editorial Curation</span>
              <span aria-hidden="true">·</span>
              <span>2026 Buying Guides</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Independent Testing</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white font-display leading-[1.15] text-balance">
              {settings.heroHeadline || 'Discover Products Worth Your Money'}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {settings.heroSubheadline ||
                'Explore carefully selected technology, digital tools, and lifestyle products to make smarter buying decisions.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#FF7417] hover:bg-[#E6620A] rounded-xl shadow-lg shadow-[#FF7417]/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{settings.heroCtaText || 'Explore Products'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onReviewsClick}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#FF7417]" />
                <span>{settings.heroCtaSecondary || 'Read Our Reviews'}</span>
              </button>
            </div>

            {/* Trust Proof Points */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF7417] shrink-0" />
                <span>Verified Merchant Deals</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
                <span>Unbiased Pros & Cons</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>FTC Compliant Outlinks</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Product Frame Container with refined border */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 p-2 shadow-2xl border border-white/15">
                <img
                  src={settings.heroImage}
                  alt="High-end noise canceling headphones and ultrabook tech showcase"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover rounded-xl transition-transform duration-500 hover:scale-[1.02]"
                />

                {/* Overlaid Highlight Cards */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#071B35]/90 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#FF7417] font-semibold tracking-wider uppercase block">
                      Featured Tech Spotlight
                    </span>
                    <span className="text-sm font-semibold text-white">
                      AudioVeil Studio & AuraBook Pro
                    </span>
                    <div className="text-[11px] text-slate-400">
                      4.9 Rating · 4,000+ Verified User Reviews
                    </div>
                  </div>
                  <button
                    onClick={onExploreClick}
                    className="p-2.5 rounded-lg bg-[#FF7417] hover:bg-[#E6620A] text-white transition-colors cursor-pointer"
                    aria-label="View spotlight product"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
