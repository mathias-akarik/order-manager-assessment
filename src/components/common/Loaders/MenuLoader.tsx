// components/Loader.tsx

import React from "react";

export const MenuLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-6 px-4">
    <div className="relative w-16 h-16 sm:w-24 sm:h-24">
      <div className="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-t-orange-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-slate-300">BF</div>
    </div>
    <p className="font-display italic text-slate-500 text-base sm:text-lg text-center">
      Curating the day's fresh arrivals...
    </p>
  </div>
);

