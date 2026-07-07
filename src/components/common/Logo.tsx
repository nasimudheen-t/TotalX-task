import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
}) => {
  const dimensions = {
    sm: { svg: 'w-6 h-6', text: 'text-lg', spacing: 'space-x-1.5' },
    md: { svg: 'w-9 h-9', text: 'text-2xl', spacing: 'space-x-2.5' },
    lg: { svg: 'w-12 h-12', text: 'text-3xl', spacing: 'space-x-3.5' },
  };

  const current = dimensions[size];

  return (
    <div className={`flex items-center justify-center select-none font-bold tracking-tight text-slate-800 ${current.spacing}`}>
      {/* SVG Icon */}
      <div className={`relative flex-shrink-0 transition-transform duration-300 hover:scale-105 ${current.svg}`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo 600 */}
              <stop offset="100%" stopColor="#8B5CF6" /> {/* Violet 500 */}
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill="url(#logo-grad)" />
          <path
            d="M12 28L20 12L28 28H12Z"
            fill="white"
            fillOpacity="0.15"
          />
          <path
            d="M20 12L28 28H23L20 22L17 28H12L20 12Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Brand Name Text */}
      {showText && (
        <span className={`bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent ${current.text}`}>
          Top<span className="text-slate-800">X</span>
        </span>
      )}
    </div>
  );
};
export default Logo;
