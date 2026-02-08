// components/RecommendationBar.tsx

import React from "react";
import Button from "@/components/ui/Button";

interface RecommendationBarProps {
  recommendation: string | null;
  setActiveCategory: (category: string) => void;
}

export const RecommendationBar: React.FC<RecommendationBarProps> = ({
  recommendation,
  setActiveCategory,
}) => (
  recommendation ? (
    <div className="mb-8 sm:mb-12 glass rounded-3xl p-4 sm:p-6 border border-white/50 shadow-2xl flex flex-col md:flex-row items-center gap-4 sm:gap-6 animate-in zoom-in-95 duration-700 z-20 relative">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h4 className="font-display font-black text-slate-900 text-lg sm:text-xl">Smart Selection</h4>
        <p className="text-slate-600 italic mt-1 leading-relaxed text-sm sm:text-base">"{recommendation}"</p>
      </div>
      <div className="shrink-0 w-full md:w-auto">
        <Button variant="outline" className="w-full md:w-auto rounded-full bg-white/50 py-3" onClick={() => setActiveCategory('All')}>
          View All Options
        </Button>
      </div>
    </div>
  ) : null
);

