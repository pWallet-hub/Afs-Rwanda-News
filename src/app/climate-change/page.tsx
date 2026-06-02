import React from 'react';
import { CloudLightning } from 'lucide-react';

export default function ClimateChangePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
      <div className="inline-block bg-amber-100 text-amber-700 p-3 rounded-full">
        <CloudLightning className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-black text-[#032B53]">Hello World from Climate Change Tracker!</h1>
      <p className="text-slate-600 max-w-md mx-auto text-sm">
        Providing direct data reports on weather pattern fluctuations, emissions adjustments, and ecological strategies.
      </p>
    </div>
  );
}