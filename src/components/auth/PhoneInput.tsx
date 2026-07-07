import React from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  disabled?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error,
  label = 'Phone Number',
  disabled = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, '');
    if (digitsOnly.length <= 10) {
      onChange(digitsOnly);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-1.5 align-left text-left">
      {label && (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">
          {label}
        </label>
      )}
      <div className="relative flex items-stretch rounded-xl overflow-hidden">
        <div className="flex items-center space-x-1.5 px-3.5 bg-slate-100 border-y border-l border-slate-200 text-slate-700 text-sm font-semibold select-none rounded-l-xl">
          <span className="text-base">🇮🇳</span>
          <span>+91</span>
          <svg
            className="w-3 h-3 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <input
          type="tel"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder="Enter 10-digit number"
          className={`w-full px-4 py-3 bg-slate-50 border transition-all duration-200 text-slate-800 placeholder-slate-400 font-medium text-sm rounded-r-xl outline-none
            ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                : 'border-slate-200 border-l-transparent hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            }
          `}
          aria-label="10-digit Phone Number"
        />
      </div>
      {error && (
        <span className="text-xs font-medium text-red-500 pl-1 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
};
export default PhoneInput;
