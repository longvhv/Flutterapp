import React, { ReactNode } from 'react';

/**
 * VHVAlignTransition - Align transition animation
 * 
 * Tương đương với AlignTransition trong Flutter
 */

export type VHVAlignment =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'centerLeft'
  | 'center'
  | 'centerRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

export interface VHVAlignTransitionProps {
  children: ReactNode;
  show: boolean;
  duration?: number;
  fromAlignment?: VHVAlignment;
  toAlignment?: VHVAlignment;
  curve?: string;
  className?: string;
  style?: React.CSSProperties;
}

const getAlignmentStyles = (alignment: VHVAlignment): React.CSSProperties => {
  const alignmentMap: Record<VHVAlignment, React.CSSProperties> = {
    topLeft: { justifyContent: 'flex-start', alignItems: 'flex-start' },
    topCenter: { justifyContent: 'center', alignItems: 'flex-start' },
    topRight: { justifyContent: 'flex-end', alignItems: 'flex-start' },
    centerLeft: { justifyContent: 'flex-start', alignItems: 'center' },
    center: { justifyContent: 'center', alignItems: 'center' },
    centerRight: { justifyContent: 'flex-end', alignItems: 'center' },
    bottomLeft: { justifyContent: 'flex-start', alignItems: 'flex-end' },
    bottomCenter: { justifyContent: 'center', alignItems: 'flex-end' },
    bottomRight: { justifyContent: 'flex-end', alignItems: 'flex-end' },
  };
  return alignmentMap[alignment];
};

export const VHVAlignTransition: React.FC<VHVAlignTransitionProps> = ({
  children,
  show,
  duration = 300,
  fromAlignment = 'topLeft',
  toAlignment = 'center',
  curve = 'ease-out',
  className = '',
  style,
}) => {
  const currentAlignment = show ? toAlignment : fromAlignment;

  return (
    <div
      className={`vhv-align-transition ${className}`}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        ...getAlignmentStyles(currentAlignment),
        transition: `all ${duration}ms ${curve}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
