import React from 'react';
import { Radio } from 'lucide-react';

export default function LivePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
      <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
        <Radio className="w-3.5 h-3.5" /> LIVE STREAM ACTIVE
      </div>
      <h1 className="text-3xl font-black text-[#032B53]">Hello World from Live Updates Channel!</h1>
      <p className="text-slate-600 max-w-md mx-auto text-sm">
        Real-time tracking of ongoing environmental policies and scientific briefings in Rwanda as they unfold.
      </p>
    </div>
  );
}