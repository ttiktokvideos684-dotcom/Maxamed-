import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';

interface PromotionalBannerProps {
  settings: SiteSettings;
  onCtaClick: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  settings,
  onCtaClick,
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#071B35] text-white shadow-xl border border-slate-800">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FF7417]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white/10 text-[#FF7417] border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Value Campaign</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display text-balance leading-tight">
                {settings.promoHeadline || 'Upgrade Your Everyday'}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                {settings.promoSubheadline ||
                  'Explore useful gadgets, digital tools, and products selected to fit your lifestyle.'}
              </p>

              <div className="pt-2">
                <button
                  onClick={onCtaClick}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#FF7417] hover:bg-[#E6620A] shadow-lg shadow-[#FF7417]/20 inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{settings.promoCtaText || 'Explore Offers'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Media Image */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full min-h-[300px]">
              <img
                src={settings.promoImage}
                alt="Workspace productivity and tech setup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover lg:absolute lg:inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#071B35] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
