import React from 'react';

interface VHVSpacerProps {
  size?: number | 'flex';
  horizontal?: boolean;
  className?: string;
}

export const VHVSpacer: React.FC<VHVSpacerProps> = ({
  size = 'flex',
  horizontal = false,
  className = '',
}) => {
  if (size === 'flex') {
    return <div className={`flex-1 ${className}`} />;
  }

  const style = horizontal
    ? { width: `${size}px` }
    : { height: `${size}px` };

  return <div style={style} className={className} />;
};
