import React from 'react';

interface VHVOverflowBoxProps {
  children: React.ReactNode;
  alignment?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  className?: string;
}

export const VHVOverflowBox: React.FC<VHVOverflowBoxProps> = ({
  children,
  alignment = 'center',
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  className = '',
}) => {
  const alignmentMap = {
    topLeft: 'items-start justify-start',
    topCenter: 'items-start justify-center',
    topRight: 'items-start justify-end',
    centerLeft: 'items-center justify-start',
    center: 'items-center justify-center',
    centerRight: 'items-center justify-end',
    bottomLeft: 'items-end justify-start',
    bottomCenter: 'items-end justify-center',
    bottomRight: 'items-end justify-end',
  };

  const style: React.CSSProperties = {
    minWidth: minWidth ? `${minWidth}px` : undefined,
    maxWidth: maxWidth ? `${maxWidth}px` : undefined,
    minHeight: minHeight ? `${minHeight}px` : undefined,
    maxHeight: maxHeight ? `${maxHeight}px` : undefined,
    overflow: 'visible',
  };

  return (
    <div
      style={style}
      className={`flex ${alignmentMap[alignment]} ${className}`}
    >
      {children}
    </div>
  );
};
