import React, { useState, useEffect } from 'react';
import { Search, Heart, Menu, X, ArrowUpRight } from 'lucide-react';
import { ActivePage, SiteSettings } from '../types';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenSearch,
  onOpenWishlist,
  wishlistCount,
  settings,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Categories', page: 'categories' },
    { label: 'Blog', page: 'blog' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#071B35]/95 backdrop-blur-md shadow-md border-b border-[#0D2445]'
            : 'bg-[#071B35] border-b border-[#0D2445]'
        }`}
      >
        {/* Top Mini Bar for Affiliate Transparency */}
        <div className="bg-[#051427] text-slate-300 text-[11px] px-4 py-1.5 border-b border-white/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF7417]" />
              <span className="text-slate-300 font-medium">
                {settings.brandName || 'Maha 00'} · Transparent Affiliate Recommendations · Amazon Associates & Digistore24
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleNavClick('disclosure')}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Affiliate Disclosure
              </button>
            </div>
          </div>
        </div>

        {/* Strict 3-zone Header Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title / Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF7417] to-[#E6620A] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-display leading-tight">
                  {settings.brandName || 'Maha 00'}
                </span>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium">
                  {settings.tagline || 'Better Products · Smarter Choices'}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Single-Line, clean text) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF7417] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors cursor-pointer"
              aria-label="Search products and reviews"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Search picks...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/10 rounded text-slate-400 font-mono">
                /
              </kbd>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors cursor-pointer"
              aria-label="View wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#FF7417] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('shop')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#FF7417] hover:bg-[#E6620A] rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Explore Deals</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white bg-white/5 rounded-lg border border-white/10 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#071B35]/98 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF7417] flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="font-bold text-lg text-white font-display">
                {settings.brandName || 'Maha 00'}
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-300 hover:text-white bg-white/5 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <div className="space-y-1">
              {navLinks.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    activePage === item.page
                      ? 'bg-[#FF7417] text-white font-semibold'
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => handleNavClick('shop')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#FF7417] text-white font-semibold rounded-lg text-sm"
              >
                <span>Browse All Products</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenWishlist();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 text-slate-200 rounded-lg text-sm border border-white/10"
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
