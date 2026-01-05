import React from 'react';

interface VHVCenterProps {
  children: React.ReactNode;
  widthFactor?: number;
  heightFactor?: number;
  className?: string;
}

export const VHVCenter: React.FC<VHVCenterProps> = ({
  children,
  widthFactor,
  heightFactor,
  className = '',
}) => {
  const style: React.CSSProperties = {
    width: widthFactor !== undefined ? `${widthFactor * 100}%` : undefined,
    height: heightFactor !== undefined ? `${heightFactor * 100}%` : undefined,
  };

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
