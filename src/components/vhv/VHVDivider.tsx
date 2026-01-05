import React from 'react';

interface VHVDividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'dashed' | 'dotted';
  spacing?: 'none' | 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

export const VHVDivider: React.FC<VHVDividerProps> = ({
  orientation = 'horizontal',
  variant = 'default',
  spacing = 'medium',
  text,
  className = '',
}) => {
  const variantClasses = {
    default: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };
  
  const spacingClasses = {
    horizontal: {
      none: '',
      small: 'my-2',
      medium: 'my-4',
      large: 'my-8',
    },
    vertical: {
      none: '',
      small: 'mx-2',
      medium: 'mx-4',
      large: 'mx-8',
    },
  };
  
  if (text && orientation === 'horizontal') {
    return (
      <div className={`flex items-center gap-4 ${spacingClasses[orientation][spacing]} ${className}`}>
        <div className={`flex-1 border-t border-gray-300 dark:border-gray-700 ${variantClasses[variant]}`} />
        <span className="text-sm text-gray-500 dark:text-gray-400">{text}</span>
        <div className={`flex-1 border-t border-gray-300 dark:border-gray-700 ${variantClasses[variant]}`} />
      </div>
    );
  }
  
  if (orientation === 'vertical') {
    return (
      <div 
        className={`
          inline-block h-full border-l border-gray-300 dark:border-gray-700
          ${variantClasses[variant]}
          ${spacingClasses[orientation][spacing]}
          ${className}
        `}
      />
    );
  }
  
  return (
    <div 
      className={`
        border-t border-gray-300 dark:border-gray-700
        ${variantClasses[variant]}
        ${spacingClasses[orientation][spacing]}
        ${className}
      `}
    />
  );
};
