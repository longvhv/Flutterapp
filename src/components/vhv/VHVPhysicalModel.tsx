import React, { ReactNode } from 'react';

/**
 * VHVPhysicalModel - Physical model with elevation and shadows
 * 
 * Tương đương với PhysicalModel trong Flutter
 */

export type VHVBoxShape = 'rectangle' | 'circle';

export interface VHVPhysicalModelProps {
  children: ReactNode;
  color?: string;
  shadowColor?: string;
  elevation?: number;
  shape?: VHVBoxShape;
  borderRadius?: number;
  clipBehavior?: 'none' | 'hardEdge' | 'antiAlias';
  className?: string;
  style?: React.CSSProperties;
}

const getElevationShadow = (elevation: number, shadowColor: string): string => {
  if (elevation === 0) return 'none';
  
  const shadows: string[] = [];
  // Umbra (key light shadow)
  shadows.push(`0 ${elevation * 0.5}px ${elevation * 1}px ${shadowColor}33`);
  // Penumbra (ambient shadow)
  shadows.push(`0 ${elevation * 0.25}px ${elevation * 2}px ${shadowColor}24`);
  // Ambient (soft shadow)
  shadows.push(`0 ${elevation * 0.125}px ${elevation * 3}px ${shadowColor}1F`);
  
  return shadows.join(', ');
};

export const VHVPhysicalModel: React.FC<VHVPhysicalModelProps> = ({
  children,
  color = 'white',
  shadowColor = 'black',
  elevation = 0,
  shape = 'rectangle',
  borderRadius = 0,
  clipBehavior = 'none',
  className = '',
  style,
}) => {
  const modelStyles: React.CSSProperties = {
    backgroundColor: color,
    boxShadow: getElevationShadow(elevation, shadowColor),
    borderRadius: shape === 'circle' ? '50%' : `${borderRadius}px`,
    overflow: clipBehavior !== 'none' ? 'hidden' : 'visible',
    position: 'relative',
  };

  return (
    <div
      className={`vhv-physical-model ${className}`}
      style={{
        ...modelStyles,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
