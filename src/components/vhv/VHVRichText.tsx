import React from 'react';

export interface VHVTextSpan {
  text: string;
  style?: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    fontStyle?: 'normal' | 'italic';
    decoration?: 'none' | 'underline' | 'line-through';
  };
  children?: VHVTextSpan[];
}

interface VHVRichTextProps {
  text: VHVTextSpan;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  maxLines?: number;
  overflow?: 'clip' | 'ellipsis' | 'fade';
  className?: string;
}

export const VHVRichText: React.FC<VHVRichTextProps> = ({
  text,
  textAlign = 'left',
  maxLines,
  overflow = 'clip',
  className = '',
}) => {
  const renderSpan = (span: VHVTextSpan, index: number): React.ReactNode => {
    const style: React.CSSProperties = {
      fontSize: span.style?.fontSize ? `${span.style.fontSize}px` : undefined,
      fontWeight: span.style?.fontWeight,
      color: span.style?.color,
      fontStyle: span.style?.fontStyle,
      textDecoration: span.style?.decoration !== 'none' ? span.style?.decoration : undefined,
    };

    return (
      <span key={index} style={style}>
        {span.text}
        {span.children?.map((child, idx) => renderSpan(child, idx))}
      </span>
    );
  };

  const containerStyle: React.CSSProperties = {
    textAlign,
    overflow: overflow === 'clip' ? 'hidden' : undefined,
    textOverflow: overflow === 'ellipsis' ? 'ellipsis' : undefined,
    display: maxLines ? '-webkit-box' : undefined,
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: maxLines ? 'vertical' : undefined,
  };

  return (
    <div style={containerStyle} className={className}>
      {renderSpan(text, 0)}
    </div>
  );
};
