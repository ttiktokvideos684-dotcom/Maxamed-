import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  onReadPost: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onReadPost }) => {
  return (
    <article
      onClick={() => onReadPost(post)}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Featured Media */}
      <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#071B35]/85 text-white text-[11px] font-semibold tracking-wide backdrop-blur-2xs">
          {post.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata - unboxed with middle dot */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{post.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{post.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>By {post.author.name}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF7417] transition-colors line-clamp-2 font-display leading-snug">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#FF7417] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            <span>Read Complete Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] text-slate-400">Independent Review</span>
        </div>
      </div>
    </article>
  );
};
