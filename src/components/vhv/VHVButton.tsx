import React from 'react';
import { motion } from 'motion/react';

export type VHVButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'gradient';
export type VHVButtonSize = 'small' | 'medium' | 'large';

interface VHVButtonProps {
  children: React.ReactNode;
  variant?: VHVButtonVariant;
  size?: VHVButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const VHVButton: React.FC<VHVButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 font-medium';
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/30',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 shadow-lg shadow-purple-500/30',
    outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100',
    text: 'bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <motion.button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : leftIcon}
      
      <span>{children}</span>
      
      {!loading && rightIcon}
    </motion.button>
  );
};
