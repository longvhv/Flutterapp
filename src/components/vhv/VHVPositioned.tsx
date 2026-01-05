import React from 'react';

interface VHVPositionedProps {
  children: React.ReactNode;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const VHVPositioned: React.FC<VHVPositionedProps> = ({
  children,
  top,
  bottom,
  left,
  right,
  width,
  height,
  className = '',
}) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: typeof top === 'number' ? `${top}px` : top,
    bottom: typeof bottom === 'number' ? `${bottom}px` : bottom,
    left: typeof left === 'number' ? `${left}px` : left,
    right: typeof right === 'number' ? `${right}px` : right,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

// VHVPositioned.fill - shorthand for filling parent
export const VHVPositionedFill: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <VHVPositioned top={0} bottom={0} left={0} right={0} className={className}>
    {children}
  </VHVPositioned>
);
