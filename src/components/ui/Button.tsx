
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.95]";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-orange-600 hover:shadow-[0_10px_20px_rgba(234,88,12,0.3)] focus:ring-slate-400 shadow-xl",
    secondary: "bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-300 border border-slate-200 shadow-sm",
    outline: "border-2 border-slate-900 bg-transparent hover:bg-slate-900 hover:text-white text-slate-900 focus:ring-slate-200",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-900",
    danger: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-xl",
    md: "px-6 py-3 text-sm rounded-2xl",
    lg: "px-10 py-4 text-base rounded-[1.5rem]",
    icon: "h-12 w-12 p-2 rounded-full",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
