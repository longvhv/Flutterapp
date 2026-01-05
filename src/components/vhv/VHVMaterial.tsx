import React from 'react';

interface VHVMaterialProps {
  children: React.ReactNode;
  elevation?: number;
  color?: string;
  borderRadius?: number;
  shadowColor?: string;
  type?: 'card' | 'canvas' | 'circle' | 'transparency';
  className?: string;
}

export const VHVMaterial: React.FC<VHVMaterialProps> = ({
  children,
  elevation = 1,
  color = '#FFFFFF',
  borderRadius = 4,
  shadowColor = 'rgba(0, 0, 0, 0.2)',
  type = 'card',
  className = '',
}) => {
  const getShadow = () => {
    const shadows = [
      'none',
      '0 1px 3px rgba(0,0,0,0.12)',
      '0 2px 6px rgba(0,0,0,0.16)',
      '0 3px 8px rgba(0,0,0,0.18)',
      '0 4px 12px rgba(0,0,0,0.20)',
      '0 6px 16px rgba(0,0,0,0.22)',
      '0 8px 20px rgba(0,0,0,0.24)',
      '0 10px 24px rgba(0,0,0,0.26)',
      '0 12px 28px rgba(0,0,0,0.28)',
    ];
    return shadows[Math.min(elevation, 8)];
  };

  const typeStyles = {
    card: borderRadius,
    canvas: 0,
    circle: 9999,
    transparency: borderRadius,
  };

  return (
    <div
      style={{
        backgroundColor: type === 'transparency' ? 'transparent' : color,
        borderRadius: `${typeStyles[type]}px`,
        boxShadow: getShadow(),
      }}
      className={`dark:bg-gray-800 ${className}`}
    >
      {children}
    </div>
  );
};
