import React from 'react';

interface VHVDecoratedBoxProps {
  children: React.ReactNode;
  decoration: {
    color?: string;
    gradient?: {
      colors: string[];
      begin?: string;
      end?: string;
    };
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
    image?: {
      url: string;
      fit?: 'cover' | 'contain' | 'fill';
      alignment?: string;
      opacity?: number;
    };
  };
  position?: 'background' | 'foreground';
  className?: string;
}

export const VHVDecoratedBox: React.FC<VHVDecoratedBoxProps> = ({
  children,
  decoration,
  position = 'background',
  className = '',
}) => {
  const style: React.CSSProperties = {};

  // Color or Gradient
  if (decoration.gradient) {
    const begin = decoration.gradient.begin || 'to right';
    style.background = `linear-gradient(${begin}, ${decoration.gradient.colors.join(', ')})`;
  } else if (decoration.color) {
    style.backgroundColor = decoration.color;
  }

  // Background Image
  if (decoration.image) {
    style.backgroundImage = `url(${decoration.image.url})`;
    style.backgroundSize = decoration.image.fit || 'cover';
    style.backgroundPosition = decoration.image.alignment || 'center';
    if (decoration.image.opacity !== undefined) {
      style.opacity = decoration.image.opacity;
    }
  }

  // Border Radius
  if (decoration.borderRadius !== undefined) {
    if (typeof decoration.borderRadius === 'number') {
      style.borderRadius = `${decoration.borderRadius}px`;
    } else {
      if (decoration.borderRadius.all !== undefined) {
        style.borderRadius = `${decoration.borderRadius.all}px`;
      } else {
        style.borderTopLeftRadius = decoration.borderRadius.topLeft ? `${decoration.borderRadius.topLeft}px` : undefined;
        style.borderTopRightRadius = decoration.borderRadius.topRight ? `${decoration.borderRadius.topRight}px` : undefined;
        style.borderBottomLeftRadius = decoration.borderRadius.bottomLeft ? `${decoration.borderRadius.bottomLeft}px` : undefined;
        style.borderBottomRightRadius = decoration.borderRadius.bottomRight ? `${decoration.borderRadius.bottomRight}px` : undefined;
      }
    }
  }

  // Border
  if (decoration.border) {
    style.borderWidth = `${decoration.border.width || 1}px`;
    style.borderStyle = decoration.border.style || 'solid';
    style.borderColor = decoration.border.color || '#000000';
  }

  // Box Shadow
  if (decoration.boxShadow) {
    style.boxShadow = decoration.boxShadow;
  }

  return (
    <div style={style} className={`relative ${className}`}>
      {position === 'background' ? (
        <>
          {children}
        </>
      ) : (
        <>
          {children}
        </>
      )}
    </div>
  );
};
