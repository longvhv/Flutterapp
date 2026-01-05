import React from 'react';

interface VHVRepaintBoundaryProps {
  children: React.ReactNode;
  className?: string;
}

export const VHVRepaintBoundary: React.FC<VHVRepaintBoundaryProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        contain: 'layout style paint',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
