import React, { ReactNode } from 'react';

/**
 * VHVAnimatedPhysicalModel - Animated physical model with elevation
 * 
 * Tương đương với AnimatedPhysicalModel trong Flutter
 */

export type VHVBoxShape = 'rectangle' | 'circle';

export interface VHVAnimatedPhysicalModelProps {
  children: ReactNode;
  color?: string;
  shadowColor?: string;
  elevation?: number;
  shape?: VHVBoxShape;
  borderRadius?: number;
  duration?: number;
  curve?: string;
  className?: string;
  style?: React.CSSProperties;
}

const getElevationShadow = (elevation: number, shadowColor: string): string => {
  if (elevation === 0) return 'none';
  
  const shadows: string[] = [];
  shadows.push(`0 ${elevation * 0.5}px ${elevation * 1}px ${shadowColor}33`);
  shadows.push(`0 ${elevation * 0.25}px ${elevation * 2}px ${shadowColor}24`);
  shadows.push(`0 ${elevation * 0.125}px ${elevation * 3}px ${shadowColor}1F`);
  
  return shadows.join(', ');
};

export const VHVAnimatedPhysicalModel: React.FC<VHVAnimatedPhysicalModelProps> = ({
  children,
  color = 'white',
  shadowColor = 'black',
  elevation = 0,
  shape = 'rectangle',
  borderRadius = 0,
  duration = 200,
  curve = 'ease-out',
  className = '',
  style,
}) => {
  const modelStyles: React.CSSProperties = {
    backgroundColor: color,
    boxShadow: getElevationShadow(elevation, shadowColor),
    borderRadius: shape === 'circle' ? '50%' : `${borderRadius}px`,
    transition: `all ${duration}ms ${curve}`,
    overflow: 'hidden',
    position: 'relative',
  };

  return (
    <div
      className={`vhv-animated-physical-model ${className}`}
      style={{
        ...modelStyles,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
