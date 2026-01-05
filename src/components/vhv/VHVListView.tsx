import React, { useRef, useEffect } from 'react';

interface VHVListViewProps {
  children: React.ReactNode[];
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  padding?: number | {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    horizontal?: number;
    vertical?: number;
  };
  itemExtent?: number;
  separator?: React.ReactNode;
  shrinkWrap?: boolean;
  physics?: 'always' | 'never' | 'auto';
  className?: string;
}

export const VHVListView: React.FC<VHVListViewProps> = ({
  children,
  direction = 'vertical',
  reverse = false,
  padding,
  itemExtent,
  separator,
  shrinkWrap = false,
  physics = 'auto',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const paddingStyle: React.CSSProperties = {};
  if (padding) {
    if (typeof padding === 'number') {
      paddingStyle.padding = `${padding}px`;
    } else {
      const top = padding.top ?? padding.vertical ?? 0;
      const bottom = padding.bottom ?? padding.vertical ?? 0;
      const left = padding.left ?? padding.horizontal ?? 0;
      const right = padding.right ?? padding.horizontal ?? 0;
      paddingStyle.paddingTop = `${top}px`;
      paddingStyle.paddingBottom = `${bottom}px`;
      paddingStyle.paddingLeft = `${left}px`;
      paddingStyle.paddingRight = `${right}px`;
    }
  }

  const containerClass = `
    ${direction === 'vertical' ? 'flex-col' : 'flex-row'}
    ${reverse ? (direction === 'vertical' ? 'flex-col-reverse' : 'flex-row-reverse') : ''}
    ${shrinkWrap ? '' : direction === 'vertical' ? 'h-full' : 'w-full'}
    ${physics === 'never' ? 'overflow-hidden' : physics === 'always' ? 'overflow-auto' : 'overflow-auto'}
  `;

  const items = React.Children.toArray(children);
  const content = separator
    ? items.flatMap((item, index) => 
        index < items.length - 1 ? [item, <div key={`sep-${index}`}>{separator}</div>] : [item]
      )
    : items;

  return (
    <div 
      ref={containerRef}
      className={`flex ${containerClass} ${className}`}
      style={paddingStyle}
    >
      {content.map((item, index) => (
        <div
          key={index}
          style={itemExtent ? { 
            height: direction === 'vertical' ? `${itemExtent}px` : undefined,
            width: direction === 'horizontal' ? `${itemExtent}px` : undefined 
          } : undefined}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

// VHVListView.builder
interface VHVListViewBuilderProps<T> {
  itemCount: number;
  itemBuilder: (index: number) => React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  padding?: number;
  separator?: React.ReactNode;
  className?: string;
}

export function VHVListViewBuilder<T>({
  itemCount,
  itemBuilder,
  direction = 'vertical',
  padding,
  separator,
  className = '',
}: VHVListViewBuilderProps<T>) {
  const items = Array.from({ length: itemCount }, (_, index) => itemBuilder(index));

  return (
    <VHVListView
      direction={direction}
      padding={padding}
      separator={separator}
      className={className}
    >
      {items}
    </VHVListView>
  );
}

// VHVListView.separated
interface VHVListViewSeparatedProps {
  itemCount: number;
  itemBuilder: (index: number) => React.ReactNode;
  separatorBuilder: (index: number) => React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  padding?: number;
  className?: string;
}

export const VHVListViewSeparated: React.FC<VHVListViewSeparatedProps> = ({
  itemCount,
  itemBuilder,
  separatorBuilder,
  direction = 'vertical',
  padding,
  className = '',
}) => {
  const content: React.ReactNode[] = [];
  
  for (let i = 0; i < itemCount; i++) {
    content.push(itemBuilder(i));
    if (i < itemCount - 1) {
      content.push(separatorBuilder(i));
    }
  }

  return (
    <VHVListView direction={direction} padding={padding} className={className}>
      {content}
    </VHVListView>
  );
};