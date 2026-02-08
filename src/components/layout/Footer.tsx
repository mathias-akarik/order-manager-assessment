
"use client"
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
               </div>
               <span className="font-display font-black text-3xl tracking-tighter text-slate-900 uppercase">Raftlabs<span className="text-orange-600">Flow</span></span>
            </div>
            <p className="text-slate-500 text-xl font-light leading-relaxed max-w-md">
              A symphony of flavors, curated by technology, delivered with uncompromising precision. Join the future of dining.
            </p>
            <div className="flex gap-4">
               {['Instagram', 'Twitter', 'Facebook'].map(social => (
                 <a key={social} href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                 </a>
               ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Experience</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Our Menu</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Private Dining</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Catering</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Locations</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-slate-900 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Press</a></li>
              </ul>
            </div>
            <div className="space-y-6 col-span-2 sm:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Contact</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                123 Culinary Way<br/>Gastronomy District<br/>SF, CA 94103
              </p>
              <a href="mailto:hello@bistroflow.com" className="block text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">hello@bistroflow.com</a>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between gap-6 items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <span>&copy; {new Date().getFullYear()} BistroFlow Culinary Labs</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

