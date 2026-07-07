import React from 'react';

interface FormFieldProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
  required = false,
  className = '',
}) => {
  return (
    <div className={`w-full flex flex-col space-y-1.5 text-left ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}
      <div className="w-full">{children}</div>
      {error && (
        <span className="text-xs font-medium text-red-500 pl-1 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
};
export default FormField;
