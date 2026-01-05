import React from 'react';

interface VHVGridViewProps {
  children: React.ReactNode[];
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number;
  aspectRatio?: number;
  className?: string;
}

export const VHVGridView: React.FC<VHVGridViewProps> = ({
  children,
  columns = 3,
  gap = 4,
  aspectRatio,
  className = '',
}) => {
  const getGridColumns = () => {
    if (typeof columns === 'number') {
      return `grid-cols-${columns}`;
    }
    
    const responsive = [];
    if (columns.sm) responsive.push(`sm:grid-cols-${columns.sm}`);
    if (columns.md) responsive.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) responsive.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) responsive.push(`xl:grid-cols-${columns.xl}`);
    
    return responsive.join(' ');
  };

  return (
    <div
      className={`grid gap-${gap} ${getGridColumns()} ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={aspectRatio ? 'relative' : ''}
          style={aspectRatio ? { aspectRatio: `${aspectRatio}` } : {}}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
