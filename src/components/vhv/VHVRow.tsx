import React from 'react';

interface VHVRowProps {
  children: React.ReactNode;
  mainAxisAlignment?: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  crossAxisAlignment?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  mainAxisSize?: 'min' | 'max';
  className?: string;
}

export const VHVRow: React.FC<VHVRowProps> = ({
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

  const sizeClass = mainAxisSize === 'min' ? 'w-min' : 'w-full';

  return (
    <div
      className={`
        flex flex-row
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
