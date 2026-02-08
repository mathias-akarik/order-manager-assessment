// components/EmptyCart.tsx

import React from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const EmptyCart: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 py-40 text-center animate-in fade-in zoom-in-95 duration-700">
    <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
      <svg viewBox="0 0 24 24" className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </div>
    <h2 className="text-5xl font-display font-black text-slate-900 mb-6 tracking-tight">Your table is empty.</h2>
    <p className="text-slate-500 mb-12 text-lg font-light max-w-sm mx-auto italic">“One cannot think well, love well, sleep well, if one has not dined well.”</p>
    <Link href="/">
      <Button variant="primary" size="lg" className="rounded-full cursor-pointer shadow-2xl">
        Discover Our Menu
      </Button>
    </Link>
  </div>
);

