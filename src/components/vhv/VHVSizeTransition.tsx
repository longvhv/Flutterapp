import React, { ReactNode, useRef, useEffect, useState } from 'react';

/**
 * VHVSizeTransition - Size transition animation
 * 
 * Tương đương với SizeTransition trong Flutter
 */

export type VHVSizeTransitionAxis = 'horizontal' | 'vertical' | 'both';

export interface VHVSizeTransitionProps {
  children: ReactNode;
  show: boolean;
  duration?: number;
  axis?: VHVSizeTransitionAxis;
  curve?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const VHVSizeTransition: React.FC<VHVSizeTransitionProps> = ({
  children,
  show,
  duration = 300,
  axis = 'vertical',
  curve = 'ease-out',
  className = '',
  style,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (contentRef.current && show) {
      const { offsetWidth, offsetHeight } = contentRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [show, children]);

  const getTransitionStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      overflow: 'hidden',
      transition: `all ${duration}ms ${curve}`,
    };

    if (!show) {
      if (axis === 'horizontal') {
        return { ...baseStyles, width: 0 };
      } else if (axis === 'vertical') {
        return { ...baseStyles, height: 0 };
      } else {
        return { ...baseStyles, width: 0, height: 0 };
      }
    }

    if (axis === 'horizontal') {
      return { ...baseStyles, width: `${dimensions.width}px` };
    } else if (axis === 'vertical') {
      return { ...baseStyles, height: `${dimensions.height}px` };
    } else {
      return {
        ...baseStyles,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      };
    }
  };

  return (
    <div
      className={`vhv-size-transition ${className}`}
      style={{
        ...getTransitionStyles(),
        ...style,
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
