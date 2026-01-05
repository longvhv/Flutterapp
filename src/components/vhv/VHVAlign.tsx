import React from 'react';

interface VHVAlignProps {
  children: React.ReactNode;
  alignment?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  widthFactor?: number;
  heightFactor?: number;
  className?: string;
}

export const VHVAlign: React.FC<VHVAlignProps> = ({
  children,
  alignment = 'center',
  widthFactor,
  heightFactor,
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
    width: widthFactor !== undefined ? `${widthFactor * 100}%` : undefined,
    height: heightFactor !== undefined ? `${heightFactor * 100}%` : undefined,
  };

  return (
    <div
      className={`flex ${alignmentMap[alignment]} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
