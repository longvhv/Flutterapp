import React from 'react';

interface VHVSizedBoxProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const VHVSizedBox: React.FC<VHVSizedBoxProps> = ({
  children,
  width,
  height,
  className = '',
}) => {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

// VHVSizedBox.expand - shorthand for full size
export const VHVSizedBoxExpand: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <VHVSizedBox width="100%" height="100%" className={className}>
    {children}
  </VHVSizedBox>
);

// VHVSizedBox.shrink - shorthand for zero size
export const VHVSizedBoxShrink: React.FC<{ className?: string }> = ({ className = '' }) => (
  <VHVSizedBox width={0} height={0} className={className} />
);

// VHVSizedBox.square - shorthand for square
export const VHVSizedBoxSquare: React.FC<{ 
  children?: React.ReactNode; 
  dimension: number | string;
  className?: string;
}> = ({ children, dimension, className = '' }) => (
  <VHVSizedBox width={dimension} height={dimension} className={className}>
    {children}
  </VHVSizedBox>
);
