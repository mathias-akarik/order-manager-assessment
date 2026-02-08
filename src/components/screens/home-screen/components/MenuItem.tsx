// components/MenuItem.tsx

import React from "react";
import { MenuItem as Item } from "@/types/order";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface MenuItemProps {
  item: Item;
  addToCart: (item: Item) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, addToCart }) => (
  <div className="group flex flex-col h-full bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
    <div className="relative h-56 sm:h-72 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
          {item.category}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-6">
        <p className="text-white text-xs sm:text-sm font-light italic leading-snug">
          {item.description}
        </p>
      </div>
    </div>

    <div className="p-6 sm:p-8 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 leading-tight">{item.name}</h3>
        <span className="text-lg sm:text-xl font-bold text-orange-600">{formatCurrency(item.price)}</span>
      </div>

      <div className="mt-auto pt-4 flex gap-2">
        <Button
          onClick={() => addToCart(item)}
          className="flex-1 cursor-pointer rounded-xl sm:rounded-2xl py-5 sm:py-6 font-bold tracking-widest uppercase text-[10px] sm:text-xs"
          variant="primary"
        >
          Add to Order
        </Button>
      </div>
    </div>
  </div>
);

