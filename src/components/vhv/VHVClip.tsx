import React from 'react';

interface VHVClipProps {
  children: React.ReactNode;
  borderRadius?: number | string;
  clipBehavior?: 'antiAlias' | 'hardEdge';
  className?: string;
}

export const VHVClipRRect: React.FC<VHVClipProps> = ({
  children,
  borderRadius = 8,
  clipBehavior = 'antiAlias',
  className = '',
}) => {
  const style: React.CSSProperties = {
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    overflow: 'hidden',
  };

  return (
    <div
      style={style}
      className={`${clipBehavior === 'antiAlias' ? 'antialiased' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const VHVClipOval: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const VHVClipRect: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
