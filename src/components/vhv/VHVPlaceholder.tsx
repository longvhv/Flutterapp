import React from 'react';

interface VHVPlaceholderProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  fallbackWidth?: number;
  fallbackHeight?: number;
  className?: string;
}

export const VHVPlaceholder: React.FC<VHVPlaceholderProps> = ({
  width = '100%',
  height = 200,
  color = '#E5E7EB',
  fallbackWidth = 300,
  fallbackHeight = 200,
  className = '',
}) => {
  return (
    <div
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: color,
      }}
      className={`animate-pulse dark:bg-gray-700 ${className}`}
    />
  );
};
