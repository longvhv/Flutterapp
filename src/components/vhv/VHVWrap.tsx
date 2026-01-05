import React from 'react';

interface VHVWrapProps {
  children: React.ReactNode;
  spacing?: number;
  runSpacing?: number;
  alignment?: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  runAlignment?: 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';
  crossAxisAlignment?: 'start' | 'end' | 'center' | 'stretch';
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export const VHVWrap: React.FC<VHVWrapProps> = ({
  children,
  spacing = 0,
  runSpacing = 0,
  alignment = 'start',
  runAlignment = 'start',
  crossAxisAlignment = 'start',
  direction = 'horizontal',
  className = '',
}) => {
  const alignmentMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
  };

  const crossAlignMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        justifyContent: alignmentMap[alignment],
        alignContent: alignmentMap[runAlignment],
        alignItems: crossAlignMap[crossAxisAlignment],
        gap: `${runSpacing}px ${spacing}px`,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
