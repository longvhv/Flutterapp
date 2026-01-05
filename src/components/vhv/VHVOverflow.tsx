import React from 'react';

interface VHVOverflowProps {
  children: React.ReactNode;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
  className?: string;
}

export const VHVOverflow: React.FC<VHVOverflowProps> = ({
  children,
  overflow = 'visible',
  className = '',
}) => {
  return (
    <div style={{ overflow }} className={className}>
      {children}
    </div>
  );
};
