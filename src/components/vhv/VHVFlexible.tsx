import React from 'react';

interface VHVFlexibleProps {
  children: React.ReactNode;
  flex?: number;
  fit?: 'tight' | 'loose';
  className?: string;
}

export const VHVFlexible: React.FC<VHVFlexibleProps> = ({
  children,
  flex = 1,
  fit = 'loose',
  className = '',
}) => {
  return (
    <div
      style={{ flex }}
      className={`${fit === 'tight' ? 'min-w-0 min-h-0' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
