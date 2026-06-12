"use client";
import React from "react";
import { useApp } from "@/context/AppContext";
import NewsGrid from "@/components/NewsGrid";

export default function ClimateChangePage() {
  const { articles } = useApp();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6 w-full">
      <h1 className="text-2xl font-bold border-b pb-2 uppercase text-slate-900">Climate Change</h1>
      <NewsGrid articles={articles.filter(a => a.category === "climate-change" && a.status === "Published")} />
    </div>
  );
}