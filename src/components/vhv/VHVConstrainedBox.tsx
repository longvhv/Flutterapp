import React from 'react';

interface VHVConstrainedBoxProps {
  children: React.ReactNode;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  className?: string;
}

export const VHVConstrainedBox: React.FC<VHVConstrainedBoxProps> = ({
  children,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  className = '',
}) => {
  const style: React.CSSProperties = {
    minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};
