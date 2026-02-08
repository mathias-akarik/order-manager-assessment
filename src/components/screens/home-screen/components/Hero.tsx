// components/HeroSection.tsx

import React from "react";

export const Hero: React.FC = () => (
  <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950 z-0">
    <div className="absolute inset-0 opacity-40">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000"
        className="w-full h-full object-cover"
        alt="Hero Background"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/80"></div>

    <div className="relative text-center px-6 max-w-4xl mx-auto space-y-4 sm:space-y-6 z-0">
      <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-orange-600/20 text-orange-400 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-orange-500/20">
        Est. 2024 • Fine Dining
      </span>
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-tight sm:leading-none animate-in fade-in slide-in-from-top-10 duration-1000">
        Culinary Art <br className="hidden sm:block" /> Delivered.
      </h1>
      <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
        Bespoke ingredients meet modern tech. Experience the finest dishes from our kitchen, delivered with care.
      </p>
    </div>
  </section>
);

