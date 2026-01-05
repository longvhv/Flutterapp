import React from 'react';

interface VHVFlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'rowReverse' | 'columnReverse';
  mainAxisAlignment?: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  crossAxisAlignment?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  mainAxisSize?: 'min' | 'max';
  className?: string;
}

export const VHVFlex: React.FC<VHVFlexProps> = ({
  children,
  direction = 'row',
  mainAxisAlignment = 'start',
  crossAxisAlignment = 'center',
  mainAxisSize = 'max',
  className = '',
}) => {
  const directionMap = {
    row: 'flex-row',
    column: 'flex-col',
    rowReverse: 'flex-row-reverse',
    columnReverse: 'flex-col-reverse',
  };

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

  const sizeClass = mainAxisSize === 'min' 
    ? (direction.includes('row') ? 'w-min' : 'h-min')
    : (direction.includes('row') ? 'w-full' : 'h-full');

  return (
    <div
      className={`
        flex
        ${directionMap[direction]}
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
