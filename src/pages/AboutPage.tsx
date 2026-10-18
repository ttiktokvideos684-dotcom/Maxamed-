import React from 'react';
import { ShieldCheck, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { ActivePage } from '../types';

interface AboutPageProps {
  setActivePage: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActivePage }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#FF7417]/10 text-[#FF7417]">
            <Target className="w-3.5 h-3.5" />
            <span>Editorial Integrity</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            Better Products. Smarter Choices.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Nexora Picks was founded on a simple realization: the internet is flooded with sponsored content and fake reviews designed to maximize affiliate clicks rather than buyer satisfaction.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-[#071B35] text-white p-8 sm:p-12 rounded-3xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7417]/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Our Purpose & Curation Philosophy
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We are an independent affiliate recommendation store and digital review publication. Our team evaluates tech hardware, SaaS tools, productivity setups, and lifestyle products through rigorous hands-on testing, thermal measurements, acoustic analysis, and workflow benchmarking.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF7417] shrink-0" />
              <span>We never accept paid merchant placements</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF7417] shrink-0" />
              <span>Full FTC disclosure on all affiliate links</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF7417] shrink-0" />
              <span>Verified price checks against historical records</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF7417] shrink-0" />
              <span>Zero fake urgency countdown timers</span>
            </div>
          </div>
        </div>

        {/* How We Make Money */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF7417] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Monetization Model</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            How Nexora Picks Operates
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Nexora Picks is reader-supported. When you click through our links to authorized merchants—such as Amazon Associates or Digistore24—and make a purchase, the merchant pays us a small affiliate referral fee.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            This comes at <strong>zero extra cost to you</strong>. In fact, we actively monitor coupons and discount codes to ensure you get the most advantageous verified price available. If a product fails our benchmark standards or develops common failure points, we refuse to recommend it, regardless of commission rates.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setActivePage('disclosure')}
              className="text-xs font-bold text-[#FF7417] hover:text-[#E6620A] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Read Full FTC Affiliate Disclosure Statement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
