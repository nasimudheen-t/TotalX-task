import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white/95 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-100/70 w-full transition-all duration-300 hover:shadow-indigo-500/5 animate-fade-in-up ${className}`}
    >
      {children}
    </div>
  );
};
export default Card;
