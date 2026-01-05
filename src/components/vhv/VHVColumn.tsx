import React from 'react';

interface VHVColumnProps {
  children: React.ReactNode;
  mainAxisAlignment?: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  crossAxisAlignment?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  mainAxisSize?: 'min' | 'max';
  className?: string;
}

export const VHVColumn: React.FC<VHVColumnProps> = ({
  children,
  mainAxisAlignment = 'start',
  crossAxisAlignment = 'center',
  mainAxisSize = 'max',
  className = '',
}) => {
  const mainAxisMap = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    spaceBetween: 'justify-between',
    spaceAround: 'justify-around',
    spaceEvenly: 'justify-evenly',
  };

  const crossAxisMap = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const sizeClass = mainAxisSize === 'min' ? 'h-min' : 'h-full';

  return (
    <div
      className={`
        flex flex-col
        ${mainAxisMap[mainAxisAlignment]}
        ${crossAxisMap[crossAxisAlignment]}
        ${sizeClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
