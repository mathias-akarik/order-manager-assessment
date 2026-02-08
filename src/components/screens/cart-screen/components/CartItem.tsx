// components/CartItem.tsx

import { formatCurrency } from "@/lib/utils";
import { CartItem as Item } from "@/types/order";
import React from "react";

interface CartItemProps {
  item: Item;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, removeFromCart, updateQuantity }) => (
  <div className="group relative flex gap-8 p-6 bg-white rounded-[2.5rem] border border-slate-100 transition-all hover:border-orange-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
    <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-[1.5rem]">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    </div>
    
    <div className="flex-1 flex flex-col py-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-display font-bold text-slate-900 leading-tight">{item.name}</h3>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-black">{item.category}</p>
        </div>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-slate-300 cursor-pointer hover:text-red-500 p-2 transition-colors rounded-full hover:bg-red-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex justify-between items-end mt-auto pt-4">
        <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-10 h-10 flex cursor-pointer items-center justify-center text-slate-400 hover:text-slate-900 bg-white rounded-xl shadow-sm hover:shadow transition-all font-bold"
          >
            -
          </button>
          <span className="w-6 text-center font-black text-slate-900 text-sm">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-10 h-10 flex cursor-pointer items-center justify-center text-slate-400 hover:text-slate-900 bg-white rounded-xl shadow-sm hover:shadow transition-all font-bold"
          >
            +
          </button>
        </div>
        <span className="text-xl font-display font-black text-slate-900 tracking-tight">{formatCurrency(item.price * item.quantity)}</span>
      </div>
    </div>
  </div>
);

