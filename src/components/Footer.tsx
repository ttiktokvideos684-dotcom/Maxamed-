import React from 'react';
import { ActivePage, SiteSettings } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, settings }) => {
  const navigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#051427] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FF7417] flex items-center justify-center text-white font-bold text-base">
                M
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                {settings.brandName || 'Maha 00'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {settings.footerAbout ||
                `${settings.brandName || 'Maha 00'} is an independent editorial product recommendation platform. We test, benchmark, and curate top technology, AI software, and everyday essentials to help you make smarter purchasing decisions.`}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                Amazon Associates
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                Digistore24 Partner
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Featured Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Buying Guides & Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Editorial */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Our Curation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('disclosure')}
                  className="hover:text-white transition-colors cursor-pointer text-[#FF7417]"
                >
                  Affiliate Disclosure (FTC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC Mandatory Affiliate Disclosure Box */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-[11px] leading-relaxed space-y-2">
          <p className="font-semibold text-slate-300">
            Mandatory FTC & Merchant Affiliate Disclosure:
          </p>
          <p>
            {settings.disclosureNotice}
          </p>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 {settings.brandName || 'Maha 00'} Media. All rights reserved.</p>
          <p>{settings.tagline || 'Better Products. Smarter Choices.'}</p>
        </div>
      </div>
    </footer>
  );
};
