import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ArticleProps {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  time: string;
}

export default function ArticleCard({ id, category, title, excerpt, time }: ArticleProps) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col h-full group">
      <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#70C113] block mb-1">
            {category}
          </span>
          <h3 className="text-lg font-bold text-[#032B53] leading-tight group-hover:text-[#70C113] transition">
            <Link href={`/items/${id}`}>{title}</Link>
          </h3>
          <p className="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </div>
        
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[11px]">
          <span className="text-slate-400">{time}</span>
          <Link href={`/items/${id}`} className="inline-flex items-center font-bold uppercase text-[#032B53] hover:text-[#70C113] transition gap-0.5">
            View Report <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}