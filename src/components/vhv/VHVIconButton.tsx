import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface VHVIconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  badge?: number;
  className?: string;
}

export const VHVIconButton: React.FC<VHVIconButtonProps> = ({
  icon: Icon,
  onClick,
  variant = 'default',
  size = 'medium',
  disabled = false,
  badge,
  className = '',
}) => {
  const sizeClasses = {
    small: 'p-2',
    medium: 'p-3',
    large: 'p-4',
  };
  
  const iconSizes = {
    small: 18,
    medium: 20,
    large: 24,
  };
  
  const variantClasses = {
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700',
    outlined: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20',
    text: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
  };
  
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        relative rounded-xl transition-all duration-200
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${disabledClass}
        ${className}
      `}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      <Icon size={iconSizes[size]} />
      
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </motion.button>
  );
};
