import React from 'react';

interface VHVExpandedProps {
  children: React.ReactNode;
  flex?: number;
  className?: string;
}

export const VHVExpanded: React.FC<VHVExpandedProps> = ({
  children,
  flex = 1,
  className = '',
}) => {
  return (
    <div style={{ flex }} className={`min-w-0 min-h-0 ${className}`}>
      {children}
    </div>
  );
};
