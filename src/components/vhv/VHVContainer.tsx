import React from 'react';

interface VHVContainerProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  padding?: number | {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    horizontal?: number;
    vertical?: number;
    all?: number;
  };
  margin?: number | {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    horizontal?: number;
    vertical?: number;
    all?: number;
  };
  color?: string;
  borderRadius?: number | {
    topLeft?: number;
    topRight?: number;
    bottomLeft?: number;
    bottomRight?: number;
    all?: number;
  };
  border?: {
    color?: string;
    width?: number;
    style?: 'solid' | 'dashed' | 'dotted';
  };
  boxShadow?: string;
  gradient?: {
    colors: string[];
    begin?: string;
    end?: string;
  };
  alignment?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  className?: string;
}

export const VHVContainer: React.FC<VHVContainerProps> = ({
  children,
  width,
  height,
  padding,
  margin,
  color,
  borderRadius,
  border,
  boxShadow,
  gradient,
  alignment = 'center',
  className = '',
}) => {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  // Padding
  if (padding !== undefined) {
    if (typeof padding === 'number') {
      style.padding = `${padding}px`;
    } else {
      if (padding.all !== undefined) {
        style.padding = `${padding.all}px`;
      } else {
        const top = padding.top ?? padding.vertical ?? 0;
        const bottom = padding.bottom ?? padding.vertical ?? 0;
        const left = padding.left ?? padding.horizontal ?? 0;
        const right = padding.right ?? padding.horizontal ?? 0;
        style.paddingTop = `${top}px`;
        style.paddingBottom = `${bottom}px`;
        style.paddingLeft = `${left}px`;
        style.paddingRight = `${right}px`;
      }
    }
  }

  // Margin
  if (margin !== undefined) {
    if (typeof margin === 'number') {
      style.margin = `${margin}px`;
    } else {
      if (margin.all !== undefined) {
        style.margin = `${margin.all}px`;
      } else {
        const top = margin.top ?? margin.vertical ?? 0;
        const bottom = margin.bottom ?? margin.vertical ?? 0;
        const left = margin.left ?? margin.horizontal ?? 0;
        const right = margin.right ?? margin.horizontal ?? 0;
        style.marginTop = `${top}px`;
        style.marginBottom = `${bottom}px`;
        style.marginLeft = `${left}px`;
        style.marginRight = `${right}px`;
      }
    }
  }

  // Color or Gradient
  if (gradient) {
    const begin = gradient.begin || 'to right';
    style.background = `linear-gradient(${begin}, ${gradient.colors.join(', ')})`;
  } else if (color) {
    style.backgroundColor = color;
  }

  // Border Radius
  if (borderRadius !== undefined) {
    if (typeof borderRadius === 'number') {
      style.borderRadius = `${borderRadius}px`;
    } else {
      if (borderRadius.all !== undefined) {
        style.borderRadius = `${borderRadius.all}px`;
      } else {
        style.borderTopLeftRadius = borderRadius.topLeft ? `${borderRadius.topLeft}px` : undefined;
        style.borderTopRightRadius = borderRadius.topRight ? `${borderRadius.topRight}px` : undefined;
        style.borderBottomLeftRadius = borderRadius.bottomLeft ? `${borderRadius.bottomLeft}px` : undefined;
        style.borderBottomRightRadius = borderRadius.bottomRight ? `${borderRadius.bottomRight}px` : undefined;
      }
    }
  }

  // Border
  if (border) {
    style.borderWidth = `${border.width || 1}px`;
    style.borderStyle = border.style || 'solid';
    style.borderColor = border.color || '#000000';
  }

  // Box Shadow
  if (boxShadow) {
    style.boxShadow = boxShadow;
  }

  const alignmentMap = {
    topLeft: 'items-start justify-start',
    topCenter: 'items-start justify-center',
    topRight: 'items-start justify-end',
    centerLeft: 'items-center justify-start',
    center: 'items-center justify-center',
    centerRight: 'items-center justify-end',
    bottomLeft: 'items-end justify-start',
    bottomCenter: 'items-end justify-center',
    bottomRight: 'items-end justify-end',
  };

  return (
    <div
      style={style}
      className={`flex ${alignmentMap[alignment]} ${className}`}
    >
      {children}
    </div>
  );
};
