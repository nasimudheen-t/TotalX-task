import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoaderProps {
  fullScreen?: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  fullScreen = true,
  message = 'Please wait...',
}) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-md animate-fade-in'
    : 'flex flex-col items-center justify-center p-8 w-full h-full';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center p-6 bg-white/90 rounded-2xl shadow-2xl border border-slate-100/50 max-w-xs text-center">
        <LoadingSpinner size="lg" className="text-indigo-600 mb-4" />
        {message && (
          <p className="text-sm font-semibold text-slate-700 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
