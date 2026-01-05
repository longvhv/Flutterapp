import React from 'react';

interface VHVAbsorbPointerProps {
  children: React.ReactNode;
  absorbing?: boolean;
  className?: string;
}

export const VHVAbsorbPointer: React.FC<VHVAbsorbPointerProps> = ({
  children,
  absorbing = true,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{ pointerEvents: absorbing ? 'none' : 'auto' }}
    >
      {children}
    </div>
  );
};
