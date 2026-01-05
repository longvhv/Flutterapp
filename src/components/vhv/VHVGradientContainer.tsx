import React from 'react';

export type VHVGradientVariant = 'blue-purple' | 'purple-pink' | 'blue-teal' | 'orange-red' | 'green-blue';

interface VHVGradientContainerProps {
  children: React.ReactNode;
  variant?: VHVGradientVariant;
  opacity?: number;
  className?: string;
}

export const VHVGradientContainer: React.FC<VHVGradientContainerProps> = ({
  children,
  variant = 'blue-purple',
  opacity = 100,
  className = '',
}) => {
  const gradients = {
    'blue-purple': 'from-blue-600 to-purple-600',
    'purple-pink': 'from-purple-600 to-pink-600',
    'blue-teal': 'from-blue-600 to-teal-600',
    'orange-red': 'from-orange-600 to-red-600',
    'green-blue': 'from-green-600 to-blue-600',
  };
  
  const opacityClass = opacity !== 100 ? `bg-opacity-${opacity}` : '';
  
  return (
    <div className={`bg-gradient-to-br ${gradients[variant]} ${opacityClass} ${className}`}>
      {children}
    </div>
  );
};
