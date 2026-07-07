import React, { useRef, useEffect } from 'react';

interface OTPInputProps {
  value: string;
  onChange: (otp: string) => void;
  error?: string;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const otpArray = value.split('').concat(Array(6).fill('')).slice(0, 6);

  useEffect(() => {
    const firstEmptyIndex = otpArray.findIndex((val) => val === '');
    const indexToFocus = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;
    if (inputsRef.current[indexToFocus] && value.length < 6) {
      inputsRef.current[indexToFocus]?.focus();
    }
  }, [value]);

  const handleChange = (val: string, index: number) => {
    const numericValue = val.replace(/\D/g, '');
    if (!numericValue) return;

    const newOtpArray = [...otpArray];
    newOtpArray[index] = numericValue.substring(numericValue.length - 1);

    const newOtp = newOtpArray.join('');
    onChange(newOtp);

    if (index < 5 && newOtpArray[index] !== '') {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtpArray = [...otpArray];
      if (newOtpArray[index] !== '') {
        newOtpArray[index] = '';
        onChange(newOtpArray.join(''));
      } else if (index > 0) {
        newOtpArray[index - 1] = '';
        onChange(newOtpArray.join(''));
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      onChange(pastedData);
      inputsRef.current[5]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full max-w-sm gap-2">
        {otpArray.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-12 h-14 text-center text-xl font-bold bg-slate-50 border rounded-xl outline-none transition-all duration-150
              ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-red-50/20'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }
              ${digit ? 'border-indigo-500 text-slate-800' : 'text-slate-400'}
            `}
          />
        ))}
      </div>
      {error && (
        <span className="text-xs font-medium text-red-500 animate-fade-in">
          {error}
        </span>
      )}
    </div>
  );
};
export default OTPInput;
