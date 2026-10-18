import React from 'react';
import {
  Smartphone,
  Laptop,
  Headphones,
  Cpu,
  Home,
  Download,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Category, Product } from '../types';

interface CategoriesPageProps {
  categories: Category[];
  products: Product[];
  onSelectCategory: (category: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Smartphone,
  Laptop,
  Headphones,
  Cpu,
  Home,
  Download,
  GraduationCap,
  Sparkles,
};

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  categories,
  products,
  onSelectCategory,
}) => {
  const visibleCategories = categories.filter((c) => c.published !== false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-[#FF7417] uppercase tracking-wider">
            Directory & Taxonomy
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Explore All Product Categories
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Our editorial staff benchmarks products across core verticals. Select any category below to inspect our highest-rated recommendations and affiliate outlinks.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCategories.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Sparkles;
            const categoryProducts = products.filter((p) => p.category === cat.name && p.published);

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-lg hover:border-[#FF7417]/50 transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#071B35] text-[#FF7417] group-hover:bg-[#FF7417] group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 tabular-nums bg-slate-100 px-2.5 py-1 rounded-md">
                      {categoryProducts.length} Picks
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-[#FF7417] transition-colors mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#FF7417] flex items-center gap-1">
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <ShieldCheck className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
