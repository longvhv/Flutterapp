import React, { useEffect, useState } from 'react';

interface VHVSafeAreaProps {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  minimum?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  className?: string;
}

export const VHVSafeArea: React.FC<VHVSafeAreaProps> = ({
  children,
  top = true,
  bottom = true,
  left = true,
  right = true,
  minimum,
  className = '',
}) => {
  const [safeInsets, setSafeInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    // Get safe area insets from CSS environment variables
    const getInset = (side: string) => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(`env(safe-area-inset-${side})`)
        .trim();
      return value ? parseInt(value) : 0;
    };

    setSafeInsets({
      top: getInset('top'),
      bottom: getInset('bottom'),
      left: getInset('left'),
      right: getInset('right'),
    });
  }, []);

  const style: React.CSSProperties = {
    paddingTop: top ? Math.max(safeInsets.top, minimum?.top || 0) : minimum?.top || 0,
    paddingBottom: bottom ? Math.max(safeInsets.bottom, minimum?.bottom || 0) : minimum?.bottom || 0,
    paddingLeft: left ? Math.max(safeInsets.left, minimum?.left || 0) : minimum?.left || 0,
    paddingRight: right ? Math.max(safeInsets.right, minimum?.right || 0) : minimum?.right || 0,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};
