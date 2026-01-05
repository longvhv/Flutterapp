import React from 'react';

export type VHVTextAlign = 'left' | 'center' | 'right' | 'justify';
export type VHVTextOverflow = 'clip' | 'ellipsis' | 'fade';
export type VHVFontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type VHVFontStyle = 'normal' | 'italic';

interface VHVTextProps {
  children: React.ReactNode;
  style?: {
    fontSize?: number;
    fontWeight?: VHVFontWeight;
    fontStyle?: VHVFontStyle;
    color?: string;
    letterSpacing?: number;
    wordSpacing?: number;
    height?: number; // line height
    decoration?: 'none' | 'underline' | 'overline' | 'line-through';
    decorationColor?: string;
    decorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
  };
  textAlign?: VHVTextAlign;
  overflow?: VHVTextOverflow;
  maxLines?: number;
  softWrap?: boolean;
  className?: string;
}

export const VHVText: React.FC<VHVTextProps> = ({
  children,
  style,
  textAlign = 'left',
  overflow = 'clip',
  maxLines,
  softWrap = true,
  className = '',
}) => {
  const textStyle: React.CSSProperties = {
    fontSize: style?.fontSize ? `${style.fontSize}px` : undefined,
    fontWeight: style?.fontWeight,
    fontStyle: style?.fontStyle,
    color: style?.color,
    letterSpacing: style?.letterSpacing ? `${style.letterSpacing}px` : undefined,
    wordSpacing: style?.wordSpacing ? `${style.wordSpacing}px` : undefined,
    lineHeight: style?.height,
    textDecoration: style?.decoration !== 'none' ? style?.decoration : undefined,
    textDecorationColor: style?.decorationColor,
    textDecorationStyle: style?.decorationStyle,
    textAlign,
    whiteSpace: softWrap ? 'normal' : 'nowrap',
  };

  // Handle overflow
  if (overflow === 'ellipsis') {
    textStyle.overflow = 'hidden';
    textStyle.textOverflow = 'ellipsis';
    if (!maxLines || maxLines === 1) {
      textStyle.whiteSpace = 'nowrap';
    } else {
      textStyle.display = '-webkit-box';
      textStyle.WebkitLineClamp = maxLines;
      textStyle.WebkitBoxOrient = 'vertical';
    }
  } else if (overflow === 'clip') {
    textStyle.overflow = 'hidden';
  } else if (overflow === 'fade') {
    textStyle.overflow = 'hidden';
    textStyle.maskImage = 'linear-gradient(to right, black 80%, transparent 100%)';
  }

  return (
    <span style={textStyle} className={className}>
      {children}
    </span>
  );
};
