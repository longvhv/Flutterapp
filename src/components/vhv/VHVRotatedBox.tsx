import React from 'react';

interface VHVRotatedBoxProps {
  children: React.ReactNode;
  quarterTurns: number; // Number of 90-degree turns clockwise
  className?: string;
}

export const VHVRotatedBox: React.FC<VHVRotatedBoxProps> = ({
  children,
  quarterTurns,
  className = '',
}) => {
  const rotation = (quarterTurns * 90) % 360;

  const style: React.CSSProperties = {
    transform: `rotate(${rotation}deg)`,
    transformOrigin: 'center',
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};
