"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCartContext } from "@/context/cart-context";
import { fetchMenu } from "@/services/orderService";
import { Hero } from "./components/Hero";
import { RecommendationBar } from "./components/RecommendationBar";
import { MenuGrid } from "./components/MenuGrid";

export const HomeScreen: React.FC = () => {
  const { cart, addToCart, updateQuantity } = useCartContext();
  const [recommendation, setRecommendation] = useState<string | null>("We rcommend");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-6 px-4">
        <div className="relative w-16 h-16 sm:w-24 sm:h-24">
          <div className="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-orange-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-slate-300">
            BF
          </div>
        </div>
        <p className="font-display italic text-slate-500 text-base sm:text-lg text-center">
          Curating the day's fresh arrivals...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-40 px-6">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-4">
          Our kitchen is currently busy
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          We couldn't load the menu right now. Please refresh or try again in a few moments.
        </p>
      </div>
    );

  const categories = ["All", ...new Set(menuItems?.map((item) => item.category))];
  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems?.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen pb-24">
      <Hero />

      <div className="max-w-7xl bg-white mx-auto rounded-tl-3xl rounded-tr-3xl -mt-12 sm:-mt-20 relative z-10">
        {recommendation && (
          <RecommendationBar
            recommendation={recommendation}
            onViewAll={() => setActiveCategory("All")}
          />
        )}

        <div className="flex bg-white flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              The Menu
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-orange-600 mt-2 mx-auto md:mx-0 rounded-full"></div>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-full border border-slate-200 shadow-inner max-w-full overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <MenuGrid
          items={filteredItems}
          cart={cart}
          onAddToCart={addToCart}
          onUpdateQuantity={updateQuantity}
        />
      </div>
    </div>
  );
};
