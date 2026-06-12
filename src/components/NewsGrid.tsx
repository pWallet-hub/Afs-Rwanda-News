import React from "react";
import { Article } from "@/context/AppContext";
import ArticleCard from "./ArticleCard";

export default function NewsGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
        <p className="text-gray-400 text-sm">No live articles published in this category yet.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((art) => <ArticleCard key={art.id} article={art} />)}
    </div>
  );
}