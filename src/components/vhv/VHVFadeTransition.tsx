import React, { ReactNode } from 'react';

/**
 * VHVFadeTransition - Fade animation transition
 * 
 * Tương đương với FadeTransition trong Flutter
 */

export interface VHVFadeTransitionProps {
  children: ReactNode;
  show: boolean;
  duration?: number;
  curve?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const VHVFadeTransition: React.FC<VHVFadeTransitionProps> = ({
  children,
  show,
  duration = 300,
  curve = 'ease-in-out',
  className = '',
  style,
}) => {
  return (
    <div
      className={`vhv-fade-transition ${className}`}
      style={{
        opacity: show ? 1 : 0,
        transition: `opacity ${duration}ms ${curve}`,
        pointerEvents: show ? 'auto' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
