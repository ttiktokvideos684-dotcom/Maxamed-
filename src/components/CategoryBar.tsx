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
  ChevronRight,
} from 'lucide-react';
import { Category } from '../types';

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string | 'All';
  onSelectCategory: (category: string | 'All') => void;
  onViewAllClick?: () => void;
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

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onViewAllClick,
}) => {
  const visibleCategories = categories.filter((c) => c.published !== false);

  return (
    <section className="py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Curated Product Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select a vertical to inspect thoroughly vetted gear, software, and tools
            </p>
          </div>
          {onViewAllClick && (
            <button
              onClick={onViewAllClick}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#FF7417] hover:text-[#E6620A] cursor-pointer"
            >
              <span>View Directory</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Horizontal Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {visibleCategories.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || Sparkles;
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'All' : cat.name)}
                className={`group flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#071B35] text-white border-[#071B35] shadow-md shadow-[#071B35]/15'
                    : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200/80 hover:border-[#FF7417]/40 hover:shadow-2xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 transition-transform group-hover:scale-105 ${
                    isSelected
                      ? 'bg-[#FF7417] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 shadow-2xs group-hover:text-[#FF7417]'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold tracking-tight leading-tight line-clamp-2">
                  {cat.name}
                </span>
                <span
                  className={`text-[10px] mt-1 tabular-nums ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {cat.itemCount} Picks
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
