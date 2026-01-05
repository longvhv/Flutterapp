import React from 'react';

interface VHVCircleAvatarProps {
  child?: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  radius?: number;
  minRadius?: number;
  maxRadius?: number;
  className?: string;
}

export const VHVCircleAvatar: React.FC<VHVCircleAvatarProps> = ({
  child,
  backgroundImage,
  backgroundColor = '#E5E7EB',
  foregroundColor = '#FFFFFF',
  radius = 20,
  minRadius,
  maxRadius,
  className = '',
}) => {
  const size = maxRadius 
    ? Math.min(radius, maxRadius) 
    : minRadius 
    ? Math.max(radius, minRadius) 
    : radius;

  const style: React.CSSProperties = {
    width: `${size * 2}px`,
    height: `${size * 2}px`,
    backgroundColor,
    color: foregroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div
      style={style}
      className={`rounded-full flex items-center justify-center overflow-hidden ${className}`}
    >
      {child}
    </div>
  );
};
