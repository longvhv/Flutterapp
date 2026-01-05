import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export type VHVTextFieldVariant = 'outlined' | 'filled' | 'underlined';

interface VHVTextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  variant?: VHVTextFieldVariant;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rows?: number;
  maxLength?: number;
  className?: string;
}

export const VHVTextField: React.FC<VHVTextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  variant = 'outlined',
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  rows,
  maxLength,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  
  const isPassword = type === 'password';
  const isMultiline = rows !== undefined && rows > 1;
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  const variantClasses = {
    outlined: `border-2 rounded-xl px-4 py-3 ${
      error 
        ? 'border-red-500 focus:border-red-600' 
        : focused 
        ? 'border-blue-600' 
        : 'border-gray-300 dark:border-gray-600'
    } bg-white dark:bg-gray-800`,
    filled: `rounded-xl px-4 py-3 ${
      error 
        ? 'bg-red-50 dark:bg-red-950/20 focus:bg-red-100 dark:focus:bg-red-950/30' 
        : 'bg-gray-100 dark:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-600'
    }`,
    underlined: `border-b-2 px-2 py-3 ${
      error 
        ? 'border-red-500 focus:border-red-600' 
        : focused 
        ? 'border-blue-600' 
        : 'border-gray-300 dark:border-gray-600'
    } bg-transparent`,
  };
  
  const baseClasses = 'w-full outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const InputComponent = isMultiline ? 'textarea' : 'input';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <InputComponent
          type={inputType}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            ${baseClasses} 
            ${variantClasses[variant]} 
            ${disabledClass}
            ${leftIcon ? 'pl-12' : ''}
            ${rightIcon || isPassword ? 'pr-12' : ''}
          `}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        
        {!isPassword && rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {error || helperText}
        </p>
      )}
      
      {maxLength && value && (
        <p className="mt-1 text-xs text-gray-400 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};
