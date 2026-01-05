import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';

interface VHVOTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  type?: 'text' | 'number';
  mask?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: boolean;
  className?: string;
}

export const VHVOTPInput: React.FC<VHVOTPInputProps> = ({
  length = 6,
  value = '',
  onChange,
  onComplete,
  type = 'number',
  mask = false,
  disabled = false,
  autoFocus = false,
  error = false,
  className = '',
}) => {
  const [otp, setOtp] = useState<string[]>(value.split('').slice(0, length));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    // Filter based on type
    const filteredValue = type === 'number' 
      ? inputValue.replace(/[^0-9]/g, '')
      : inputValue;

    if (filteredValue.length > 1) {
      // Handle paste
      const values = filteredValue.split('').slice(0, length);
      const newOtp = [...otp];
      values.forEach((val, i) => {
        if (index + i < length) {
          newOtp[index + i] = val;
        }
      });
      setOtp(newOtp);
      onChange?.(newOtp.join(''));

      // Focus last filled input
      const lastIndex = Math.min(index + values.length - 1, length - 1);
      inputRefs.current[lastIndex]?.focus();

      if (newOtp.join('').length === length) {
        onComplete?.(newOtp.join(''));
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = filteredValue;
    setOtp(newOtp);
    onChange?.(newOtp.join(''));

    // Auto focus next input
    if (filteredValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newOtp.join('').length === length) {
      onComplete?.(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      onChange?.(newOtp.join(''));
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const filteredData = type === 'number'
      ? pastedData.replace(/[^0-9]/g, '')
      : pastedData;

    const values = filteredData.split('').slice(0, length);
    const newOtp = new Array(length).fill('');
    values.forEach((val, i) => {
      newOtp[i] = val;
    });
    setOtp(newOtp);
    onChange?.(newOtp.join(''));

    // Focus last input
    if (values.length > 0) {
      const lastIndex = Math.min(values.length - 1, length - 1);
      inputRefs.current[lastIndex]?.focus();
    }

    if (values.length === length) {
      onComplete?.(newOtp.join(''));
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  return (
    <div className={`flex gap-2 justify-center ${className}`}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type={mask ? 'password' : 'text'}
          inputMode={type === 'number' ? 'numeric' : 'text'}
          value={otp[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          maxLength={1}
          className={`
            w-12 h-14 text-center text-2xl font-semibold
            border-2 rounded-xl
            transition-all duration-200
            ${error
              ? 'border-red-600 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-900/30'
              : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30'
            }
            ${disabled
              ? 'bg-gray-50 dark:bg-gray-800 cursor-not-allowed opacity-50'
              : 'bg-white dark:bg-gray-900'
            }
            text-gray-900 dark:text-white
            outline-none
          `}
        />
      ))}
    </div>
  );
};
