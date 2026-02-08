// components/Error.tsx

import React from "react";

interface ErrorProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorProps> = ({ message }) => (
  <div className="text-center py-40 px-6">
    <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-4">
      Our kitchen is currently busy
    </h2>
    <p className="text-slate-500 max-w-md mx-auto">{message}</p>
  </div>
);

