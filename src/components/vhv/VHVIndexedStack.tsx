import React from 'react';

interface VHVIndexedStackProps {
  children: React.ReactNode[];
  index: number;
  alignment?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  sizing?: 'expand' | 'loose' | 'passthrough';
  className?: string;
}

export const VHVIndexedStack: React.FC<VHVIndexedStackProps> = ({
  children,
  index,
  alignment = 'center',
  sizing = 'loose',
  className = '',
}) => {
  const alignmentMap = {
    topLeft: 'items-start justify-start',
    topCenter: 'items-start justify-center',
    topRight: 'items-start justify-end',
    centerLeft: 'items-center justify-start',
    center: 'items-center justify-center',
    centerRight: 'items-center justify-end',
    bottomLeft: 'items-end justify-start',
    bottomCenter: 'items-end justify-center',
    bottomRight: 'items-end justify-end',
  };

  const sizingClass = sizing === 'expand' ? 'w-full h-full' : sizing === 'passthrough' ? 'w-auto h-auto' : '';

  return (
    <div className={`relative flex ${alignmentMap[alignment]} ${sizingClass} ${className}`}>
      {children.map((child, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 ${idx === index ? 'block' : 'hidden'}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
