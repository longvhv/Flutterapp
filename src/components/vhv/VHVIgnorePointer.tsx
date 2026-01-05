import React from 'react';

interface VHVIgnorePointerProps {
  children: React.ReactNode;
  ignoring?: boolean;
  className?: string;
}

export const VHVIgnorePointer: React.FC<VHVIgnorePointerProps> = ({
  children,
  ignoring = true,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{ pointerEvents: ignoring ? 'none' : 'auto' }}
    >
      {children}
    </div>
  );
};
