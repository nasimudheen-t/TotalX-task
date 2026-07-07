import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center',
  };

  return (
    <div className={`flex flex-col space-y-2 mb-6 ${alignment[align]} ${className}`}>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm font-medium text-slate-500 max-w-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
};
export default SectionTitle;
