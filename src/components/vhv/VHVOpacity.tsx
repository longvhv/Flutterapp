import React from 'react';

interface VHVOpacityProps {
  children: React.ReactNode;
  opacity: number; // 0.0 to 1.0
  alwaysIncludeSemantics?: boolean;
  className?: string;
}

export const VHVOpacity: React.FC<VHVOpacityProps> = ({
  children,
  opacity,
  alwaysIncludeSemantics = false,
  className = '',
}) => {
  const style: React.CSSProperties = {
    opacity: Math.max(0, Math.min(1, opacity)),
  };

  return (
    <div
      style={style}
      className={className}
      aria-hidden={!alwaysIncludeSemantics && opacity === 0}
    >
      {children}
    </div>
  );
};
