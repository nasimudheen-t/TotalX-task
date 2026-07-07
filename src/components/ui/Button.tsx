import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/25 focus:ring-indigo-500 border border-transparent',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-500 border border-transparent',
    outline:
      'bg-transparent hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-indigo-500',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-indigo-500',
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25 focus:ring-red-500 border border-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  const isBtnDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isBtnDisabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="flex items-center space-x-2">
          <LoadingSpinner size="sm" />
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
