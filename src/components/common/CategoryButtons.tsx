// components/CategoryButtons.tsx

import React from "react";

interface CategoryButtonsProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => (
  <div className="flex p-1 bg-slate-100 rounded-full border border-slate-200 shadow-inner max-w-full overflow-x-auto scrollbar-hide">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setActiveCategory(cat)}
        className={`px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
          activeCategory === cat
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        {cat.toUpperCase()}
      </button>
    ))}
  </div>
);

