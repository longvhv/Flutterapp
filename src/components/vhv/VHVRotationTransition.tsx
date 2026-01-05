import React, { ReactNode } from 'react';

/**
 * VHVRotationTransition - Rotation animation transition
 * 
 * Tương đương với RotationTransition trong Flutter
 */

export interface VHVRotationTransitionProps {
  children: ReactNode;
  show: boolean;
  duration?: number;
  turns?: number;
  curve?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const VHVRotationTransition: React.FC<VHVRotationTransitionProps> = ({
  children,
  show,
  duration = 300,
  turns = 0.25,
  curve = 'ease-in-out',
  className = '',
  style,
}) => {
  return (
    <div
      className={`vhv-rotation-transition ${className}`}
      style={{
        transform: show ? 'rotate(0deg)' : `rotate(${turns * 360}deg)`,
        opacity: show ? 1 : 0,
        transition: `all ${duration}ms ${curve}`,
        transformOrigin: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
