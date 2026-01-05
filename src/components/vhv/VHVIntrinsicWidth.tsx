import React from 'react';

interface VHVIntrinsicWidthProps {
  children: React.ReactNode;
  className?: string;
}

export const VHVIntrinsicWidth: React.FC<VHVIntrinsicWidthProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`w-auto ${className}`}>
      {children}
    </div>
  );
};
