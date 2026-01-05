import React from 'react';

interface VHVLimitedBoxProps {
  children: React.ReactNode;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
}

export const VHVLimitedBox: React.FC<VHVLimitedBoxProps> = ({
  children,
  maxWidth = 400,
  maxHeight = 400,
  className = '',
}) => {
  const style: React.CSSProperties = {
    maxWidth: `${maxWidth}px`,
    maxHeight: `${maxHeight}px`,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};
