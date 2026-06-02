import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Params {
  params: Promise<{ id: string }>;
}

export default async function SingleArticleView({ params }: Params) {
  const resolvedParams = await params;
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <Link href="/" className="inline-flex items-center text-xs font-bold text-[#032B53] hover:text-[#70C113] gap-1">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard Overview
      </Link>
      
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#70C113]">Report ID: {resolvedParams.id}</span>
        <h1 className="text-3xl md:text-4xl font-black text-[#032B53] leading-tight">
          Hello World from the Full Dynamic Report Layout Panel!
        </h1>
        <p className="text-xs text-slate-400">Published June 2, 2026 • Verified Document Analysis</p>
      </div>

      <div className="text-slate-700 text-base leading-relaxed space-y-4">
        <p className="font-semibold text-slate-900">
          This single dynamic segment captures and renders standard data models based on string requests.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed erat varius, commodo purus vitae, scelerisque magna. In vulputate diam nec nulla rhoncus, non volutpat ante luctus. Proin feugiat elit ut lectus eleifend volutpat.
        </p>
      </div>
    </div>
  );
}