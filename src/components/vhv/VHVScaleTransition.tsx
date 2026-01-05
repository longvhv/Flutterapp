import React, { ReactNode } from 'react';

/**
 * VHVScaleTransition - Scale animation transition
 * 
 * Tương đương với ScaleTransition trong Flutter
 */

export interface VHVScaleTransitionProps {
  children: ReactNode;
  show: boolean;
  duration?: number;
  scale?: number;
  curve?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const VHVScaleTransition: React.FC<VHVScaleTransitionProps> = ({
  children,
  show,
  duration = 300,
  scale = 0,
  curve = 'ease-out',
  className = '',
  style,
}) => {
  return (
    <div
      className={`vhv-scale-transition ${className}`}
      style={{
        transform: show ? 'scale(1)' : `scale(${scale})`,
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
