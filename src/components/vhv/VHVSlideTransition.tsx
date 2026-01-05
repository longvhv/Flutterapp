import React, { ReactNode } from 'react';

/**
 * VHVSlideTransition - Slide animation transition
 * 
 * Tương đương với SlideTransition trong Flutter
 */

export type VHVSlideDirection = 'up' | 'down' | 'left' | 'right';

export interface VHVSlideTransitionProps {
  children: ReactNode;
  show: boolean;
  direction?: VHVSlideDirection;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const getTransformValue = (direction: VHVSlideDirection, show: boolean): string => {
  if (show) return 'translate(0, 0)';
  
  switch (direction) {
    case 'up':
      return 'translateY(100%)';
    case 'down':
      return 'translateY(-100%)';
    case 'left':
      return 'translateX(100%)';
    case 'right':
      return 'translateX(-100%)';
    default:
      return 'translateY(100%)';
  }
};

export const VHVSlideTransition: React.FC<VHVSlideTransitionProps> = ({
  children,
  show,
  direction = 'up',
  duration = 300,
  className = '',
  style,
}) => {
  return (
    <div
      className={`vhv-slide-transition ${className}`}
      style={{
        transform: getTransformValue(direction, show),
        opacity: show ? 1 : 0,
        transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
