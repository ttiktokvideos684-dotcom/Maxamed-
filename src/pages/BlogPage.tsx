import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { BlogPost } from '../types';

interface BlogPageProps {
  posts: BlogPost[];
  onReadPost: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts, onReadPost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Technology and Gadgets', 'AI Tools and Software', 'Computers and Laptops', 'Digital Products', 'Home and Lifestyle', 'Online Courses'];

  const filteredPosts = posts
    .filter((p) => p.published)
    .filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#FF7417] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial & Buying Guides</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            The Nexora Picks Journal
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Tested advice, product comparisons, and affiliate guides crafted by engineers, hardware testers, and software analysts.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, product, or guide..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7417]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none py-1 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1 hidden sm:inline" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#071B35] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
            <p className="font-semibold text-base">No articles found matching "{searchQuery}"</p>
            <p className="text-xs text-slate-400 mt-1">Try another search keyword or clear your category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onReadPost={onReadPost}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
