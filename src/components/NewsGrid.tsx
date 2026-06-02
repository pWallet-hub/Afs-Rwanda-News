import React from 'react';
import ArticleCard from './ArticleCard';

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  time: string;
}

interface NewsGridProps {
  title: string;
  articles: Article[];
}

export default function NewsGrid({ title, articles }: NewsGridProps) {
  return (
    <div className="space-y-4">
      <div className="border-b-2 border-[#032B53] pb-2">
        <h2 className="text-sm uppercase tracking-widest font-black text-[#032B53]">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}