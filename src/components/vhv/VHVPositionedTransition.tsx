import React, { ReactNode } from 'react';

/**
 * VHVPositionedTransition - Positioned transition animation
 * 
 * Tương đương với PositionedTransition trong Flutter
 */

export interface VHVPositionedTransitionProps {
  children: ReactNode;
  show: boolean;
  duration?: number;
  fromTop?: number;
  fromBottom?: number;
  fromLeft?: number;
  fromRight?: number;
  toTop?: number;
  toBottom?: number;
  toLeft?: number;
  toRight?: number;
  curve?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const VHVPositionedTransition: React.FC<VHVPositionedTransitionProps> = ({
  children,
  show,
  duration = 300,
  fromTop,
  fromBottom,
  fromLeft,
  fromRight,
  toTop = 0,
  toBottom,
  toLeft = 0,
  toRight,
  curve = 'ease-out',
  className = '',
  style,
}) => {
  const getPositionStyles = (): React.CSSProperties => {
    if (show) {
      return {
        top: toTop !== undefined ? `${toTop}px` : 'auto',
        bottom: toBottom !== undefined ? `${toBottom}px` : 'auto',
        left: toLeft !== undefined ? `${toLeft}px` : 'auto',
        right: toRight !== undefined ? `${toRight}px` : 'auto',
      };
    } else {
      return {
        top: fromTop !== undefined ? `${fromTop}px` : 'auto',
        bottom: fromBottom !== undefined ? `${fromBottom}px` : 'auto',
        left: fromLeft !== undefined ? `${fromLeft}px` : 'auto',
        right: fromRight !== undefined ? `${fromRight}px` : 'auto',
      };
    }
  };

  return (
    <div
      className={`vhv-positioned-transition ${className}`}
      style={{
        position: 'absolute',
        ...getPositionStyles(),
        opacity: show ? 1 : 0,
        transition: `all ${duration}ms ${curve}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
