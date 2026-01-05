import React from 'react';

interface VHVIntrinsicHeightProps {
  children: React.ReactNode;
  className?: string;
}

export const VHVIntrinsicHeight: React.FC<VHVIntrinsicHeightProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`h-auto ${className}`}>
      {children}
    </div>
  );
};
