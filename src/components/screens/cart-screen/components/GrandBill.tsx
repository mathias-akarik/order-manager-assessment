// components/GrandBill.tsx

import React from "react";
import { formatCurrency } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";

interface GrandBillProps {
  totalPrice: number;
}

export const GrandBill: React.FC<GrandBillProps> = ({ totalPrice }) => (
  <div className="w-full lg:w-[420px]">
    <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl sticky top-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full translate-x-10 -translate-y-10 blur-3xl"></div>
      
      <h3 className="text-2xl font-display font-bold mb-10 pb-4 border-b border-white/10 tracking-tight">Grand Bill</h3>
      
      <div className="space-y-6 mb-12">
        <div className="flex justify-between text-slate-400 font-medium">
          <span className="uppercase tracking-widest text-[10px] font-black">Subtotal</span>
          <span className="font-mono">{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-slate-400 font-medium">
          <span className="uppercase tracking-widest text-[10px] font-black">Sommelier Choice (Fee)</span>
          <span className="font-mono">$5.00</span>
        </div>
        <div className="pt-8 border-t border-white/10 flex justify-between items-baseline">
          <span className="text-sm font-light text-slate-500 uppercase tracking-[0.3em]">Total</span>
          <span className="text-5xl font-display font-black text-orange-500 tracking-tighter">
            {formatCurrency(totalPrice + 5.00)}
          </span>
        </div>
      </div>
      
      <Link href="/checkout">
        <Button variant='secondary' className="w-full cursor-pointer py-6 text-sm font-black uppercase tracking-[0.2em] bg-orange-500  text-slate-900  hover:text-black rounded-3xl" size="lg">
          Complete Order
        </Button>
      </Link>
      
      <p className="text-center text-[10px] text-slate-500 mt-6 font-medium tracking-widest uppercase">
        Secure payments powered by BistroFlow
      </p>
    </div>
  </div>
);

