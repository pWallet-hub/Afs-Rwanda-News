import React from 'react';
import { Wheat } from 'lucide-react';

export default function FoodSecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
      <div className="inline-block bg-emerald-100 text-[#70C113] p-3 rounded-full">
        <Wheat className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-black text-[#032B53]">Hello World from Food Security Hub!</h1>
      <p className="text-slate-600 max-w-md mx-auto text-sm">
        Tracking agricultural technologies, harvest data metrics, and crop resilience systems in sub-Saharan systems.
      </p>
    </div>
  );
}