import React from 'react';

interface VHVPaddingProps {
  children: React.ReactNode;
  padding?: number | {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    horizontal?: number;
    vertical?: number;
    all?: number;
  };
  className?: string;
}

export const VHVPadding: React.FC<VHVPaddingProps> = ({
  children,
  padding = 0,
  className = '',
}) => {
  let style: React.CSSProperties = {};

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

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};
