import React from 'react';
import { motion } from 'motion/react';

export type VHVCardVariant = 'default' | 'outlined' | 'elevated' | 'gradient';

interface VHVCardProps {
  children: React.ReactNode;
  variant?: VHVCardVariant;
  padding?: 'none' | 'small' | 'medium' | 'large';
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const VHVCard: React.FC<VHVCardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  hoverable = false,
  onClick,
  className = '',
  header,
  footer,
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-6',
    large: 'p-8',
  };
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800',
    outlined: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20',
  };
  
  const hoverableClass = hoverable ? 'cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1' : '';
  
  return (
    <motion.div
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverableClass} ${className}`}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      whileTap={hoverable && onClick ? { scale: 0.98 } : {}}
    >
      {header && (
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          {header}
        </div>
      )}
      
      {children}
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </motion.div>
  );
};
