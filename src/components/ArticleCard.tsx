import React from "react";
import { Article } from "@/context/AppContext";

export default function ArticleCard({ article }: { article: Article }) {
  const colors: Record<string, string> = {
    "Draft": "bg-gray-100 text-gray-800 border-gray-300",
    "Pending Review": "bg-amber-100 text-amber-800 border-amber-300",
    "Approved": "bg-blue-100 text-blue-800 border-blue-300",
    "Published": "bg-emerald-100 text-emerald-800 border-emerald-300",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      <div className="relative h-48 w-full bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
        <span className="absolute top-3 right-3 text-[10px] uppercase font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded">
          {article.category.replace("-", " ")}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-mono">{article.createdAt}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colors[article.status]}`}>
              {article.status}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2">{article.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{article.content}</p>
        </div>
        <div className="border-t border-gray-100 pt-3 text-xs text-gray-500 font-medium">
          Author: <span className="text-slate-800 font-semibold">{article.author}</span>
        </div>
      </div>
    </div>
  );
}