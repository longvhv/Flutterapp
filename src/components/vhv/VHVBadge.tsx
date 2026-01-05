import React from 'react';

export type VHVBadgeColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type VHVBadgeVariant = 'filled' | 'outlined' | 'dot';

interface VHVBadgeProps {
  children?: React.ReactNode;
  content?: string | number;
  color?: VHVBadgeColor;
  variant?: VHVBadgeVariant;
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
}

export const VHVBadge: React.FC<VHVBadgeProps> = ({
  children,
  content,
  color = 'error',
  variant = 'filled',
  max = 99,
  showZero = false,
  invisible = false,
  position = 'top-right',
  className = '',
}) => {
  const colorClasses = {
    filled: {
      default: 'bg-gray-500 text-white',
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-purple-600 text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-600 text-white',
      error: 'bg-red-600 text-white',
    },
    outlined: {
      default: 'bg-white dark:bg-gray-900 border-2 border-gray-500 text-gray-500',
      primary: 'bg-white dark:bg-gray-900 border-2 border-blue-600 text-blue-600',
      secondary: 'bg-white dark:bg-gray-900 border-2 border-purple-600 text-purple-600',
      success: 'bg-white dark:bg-gray-900 border-2 border-green-600 text-green-600',
      warning: 'bg-white dark:bg-gray-900 border-2 border-yellow-600 text-yellow-600',
      error: 'bg-white dark:bg-gray-900 border-2 border-red-600 text-red-600',
    },
    dot: {
      default: 'bg-gray-500',
      primary: 'bg-blue-600',
      secondary: 'bg-purple-600',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      error: 'bg-red-600',
    },
  };
  
  const positionClasses = {
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  };
  
  const displayContent = typeof content === 'number' && content > max ? `${max}+` : content;
  const showBadge = !invisible && (showZero || content !== 0);
  
  if (!children) {
    // Standalone badge
    if (variant === 'dot') {
      return (
        <span className={`inline-block w-2 h-2 rounded-full ${colorClasses.dot[color]} ${className}`} />
      );
    }
    
    return (
      <span className={`
        inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full
        ${colorClasses[variant][color]}
        ${className}
      `}>
        {displayContent}
      </span>
    );
  }
  
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      {showBadge && (
        <span className={`
          absolute ${positionClasses[position]}
          ${variant === 'dot' 
            ? `w-2 h-2 rounded-full ${colorClasses.dot[color]}` 
            : `flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full ${colorClasses[variant][color]}`
          }
        `}>
          {variant !== 'dot' && displayContent}
        </span>
      )}
    </div>
  );
};
