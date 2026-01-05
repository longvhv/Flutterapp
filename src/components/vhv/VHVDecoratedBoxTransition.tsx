import React, { ReactNode } from 'react';

/**
 * VHVDecoratedBoxTransition - Decorated box transition animation
 * 
 * Tương đương với DecoratedBoxTransition trong Flutter
 */

export interface VHVDecorationConfig {
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  boxShadow?: string;
  opacity?: number;
}

export interface VHVDecoratedBoxTransitionProps {
  children: ReactNode;
  show: boolean;
  duration?: number;
  fromDecoration?: VHVDecorationConfig;
  toDecoration?: VHVDecorationConfig;
  curve?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const VHVDecoratedBoxTransition: React.FC<VHVDecoratedBoxTransitionProps> = ({
  children,
  show,
  duration = 300,
  fromDecoration = {},
  toDecoration = {},
  curve = 'ease-in-out',
  className = '',
  style,
}) => {
  const currentDecoration = show ? toDecoration : fromDecoration;

  const decorationStyles: React.CSSProperties = {
    backgroundColor: currentDecoration.backgroundColor || 'transparent',
    borderRadius: `${currentDecoration.borderRadius || 0}px`,
    border: currentDecoration.borderWidth
      ? `${currentDecoration.borderWidth}px solid ${currentDecoration.borderColor || 'transparent'}`
      : 'none',
    boxShadow: currentDecoration.boxShadow || 'none',
    opacity: currentDecoration.opacity !== undefined ? currentDecoration.opacity : 1,
  };

  return (
    <div
      className={`vhv-decorated-box-transition ${className}`}
      style={{
        ...decorationStyles,
        transition: `all ${duration}ms ${curve}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
