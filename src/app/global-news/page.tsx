import React from 'react';
import { Globe } from 'lucide-react';

export default function GlobalNewsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
      <div className="inline-block bg-blue-100 text-[#032B53] p-3 rounded-full">
        <Globe className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-black text-[#032B53]">Hello World from Global Science!</h1>
      <p className="text-slate-600 max-w-md mx-auto text-sm">
        International discoveries, cross-border research collaborations, and worldwide biotechnological breakthroughs.
      </p>
    </div>
  );
}