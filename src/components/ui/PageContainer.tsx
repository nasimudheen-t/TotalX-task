import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  centered = true,
  className = '',
}) => {
  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-tr from-slate-50 via-indigo-50/20 to-violet-50/20 flex flex-col transition-all duration-300 ${
        centered ? 'items-center justify-center p-4 sm:p-6 md:p-8' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
export default PageContainer;
