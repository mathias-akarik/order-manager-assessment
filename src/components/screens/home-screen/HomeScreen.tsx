"use client"
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCartContext } from '@/context/cart-context';
import { fetchMenu } from '@/services/orderService';
import Button from '@/components/ui/Button';
import { MenuItem } from '@/types/order';
import { formatCurrency } from '@/lib/utils';

export const HomeScreen: React.FC = () => {
  const { cart, addToCart } = useCartContext();
  const [recommendation, setRecommendation] = useState<string | null>("We rcommend");
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ['menu'],
    queryFn: fetchMenu
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-6 px-4">
      <div className="relative w-16 h-16 sm:w-24 sm:h-24">
        <div className="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-orange-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-slate-300">BF</div>
      </div>
      <p className="font-display italic text-slate-500 text-base sm:text-lg text-center">Curating the day's fresh arrivals...</p>
    </div>
  );

  if (error) return (
    <div className="text-center py-40 px-6">
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-4">Our kitchen is currently busy</h2>
      <p className="text-slate-500 max-w-md mx-auto">We couldn't load the menu right now. Please refresh or try again in a few moments.</p>
    </div>
  );

  const categories = ['All', ...new Set(menuItems?.map(item => item.category))];
  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems?.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950 z-1"> {/* Added z-index here */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Hero Background" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/80"></div>
        
        <div className="relative text-center px-6 max-w-4xl mx-auto space-y-4 sm:space-y-6">
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
        
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
            <div className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl bg-white mx-auto rounded-tl-3xl rounded-tr-3xl -mt-12 sm:-mt-20 relative z-10"> {/* Added z-index here */}
        
        {/* Recommendation Bar */}
        {recommendation && (
          <div className="mb-8 sm:mb-12 glass rounded-3xl p-4 sm:p-6 border border-white/50 shadow-2xl flex flex-col md:flex-row items-center gap-4 sm:gap-6 animate-in zoom-in-95 duration-700">
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
        )}

        <div className="flex bg-white flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 mb-10 sm:mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">The Menu</h2>
            <div className="h-1 w-16 sm:w-20 bg-orange-600 mt-2 mx-auto md:mx-0 rounded-full"></div>
          </div>
          
          <div className="flex p-1 bg-slate-100 rounded-full border border-slate-200 shadow-inner max-w-full overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
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
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {filteredItems?.map((item: MenuItem) => (
            <div key={item.id} className="group flex flex-col h-full bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500">
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
                    className="flex-1 rounded-xl sm:rounded-2xl py-5 sm:py-6 font-bold tracking-widest uppercase text-[10px] sm:text-xs"
                    variant="primary"
                  >
                    Add to Order
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
