import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full flex flex-col space-y-1.5 align-left text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 border transition-all duration-200 text-slate-800 placeholder-slate-400 font-medium text-sm
              ${leftIcon ? 'pl-11' : ''} 
              ${rightIcon ? 'pr-11' : ''} 
              ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                  : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              } 
              outline-none ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-slate-400 cursor-pointer">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs font-medium text-red-500 pl-1 animate-fade-in">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
