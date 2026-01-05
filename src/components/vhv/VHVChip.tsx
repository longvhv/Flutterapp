import React from 'react';
import { X } from 'lucide-react';

export type VHVChipVariant = 'filled' | 'outlined' | 'light';
export type VHVChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

interface VHVChipProps {
  label: string;
  variant?: VHVChipVariant;
  color?: VHVChipColor;
  size?: 'small' | 'medium';
  icon?: React.ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
}

export const VHVChip: React.FC<VHVChipProps> = ({
  label,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  icon,
  onDelete,
  onClick,
  className = '',
}) => {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
  };
  
  const colorVariants = {
    filled: {
      default: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white',
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-purple-600 text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-600 text-white',
      error: 'bg-red-600 text-white',
    },
    outlined: {
      default: 'bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white',
      primary: 'bg-transparent border-2 border-blue-600 text-blue-600',
      secondary: 'bg-transparent border-2 border-purple-600 text-purple-600',
      success: 'bg-transparent border-2 border-green-600 text-green-600',
      warning: 'bg-transparent border-2 border-yellow-600 text-yellow-600',
      error: 'bg-transparent border-2 border-red-600 text-red-600',
    },
    light: {
      default: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
      primary: 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400',
      secondary: 'bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400',
      success: 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400',
      warning: 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400',
      error: 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400',
    },
  };
  
  const clickableClass = onClick ? 'cursor-pointer hover:opacity-80' : '';
  
  return (
    <div
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 rounded-full transition-all
        ${sizeClasses[size]}
        ${colorVariants[variant][color]}
        ${clickableClass}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="font-medium">{label}</span>
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-shrink-0 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
        >
          <X size={size === 'small' ? 12 : 14} />
        </button>
      )}
    </div>
  );
};
