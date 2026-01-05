import React, { useState, useEffect, useRef } from 'react';

interface VHVMasonryProps {
  children: React.ReactNode[];
  columns?: number;
  gap?: number;
  className?: string;
}

export const VHVMasonry: React.FC<VHVMasonryProps> = ({
  children,
  columns = 3,
  gap = 16,
  className = '',
}) => {
  const [columnHeights, setColumnHeights] = useState<number[]>(Array(columns).fill(0));
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate which column each item should go into
  const getColumnForItem = (index: number): number => {
    // Simple strategy: put item in shortest column
    return columnHeights.indexOf(Math.min(...columnHeights));
  };

  // Organize items into columns
  const organizeItems = () => {
    const cols: React.ReactNode[][] = Array(columns).fill(null).map(() => []);
    
    React.Children.forEach(children, (child, index) => {
      const columnIndex = index % columns; // Simple distribution
      cols[columnIndex].push(child);
    });

    return cols;
  };

  const columnItems = organizeItems();

  return (
    <div
      ref={containerRef}
      className={`flex ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {columnItems.map((items, columnIndex) => (
        <div
          key={columnIndex}
          className="flex-1 flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {items}
        </div>
      ))}
    </div>
  );
};
