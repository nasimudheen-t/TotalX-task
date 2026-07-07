import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string | null;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = '',
}) => {
  if (!message) return null;

  return (
    <div
      className={`flex items-start space-x-2.5 p-3.5 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold select-none animate-shake ${className}`}
      role="alert"
    >
      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-left leading-normal">{message}</div>
    </div>
  );
};
export default ErrorMessage;
