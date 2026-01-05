import React from 'react';

interface VHVStackProps {
  children: React.ReactNode;
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  fit?: 'loose' | 'expand' | 'passthrough';
  className?: string;
}

export const VHVStack: React.FC<VHVStackProps> = ({
  children,
  alignment = 'start',
  fit = 'loose',
  className = '',
}) => {
  const alignmentClasses = {
    start: 'items-start justify-start',
    center: 'items-center justify-center',
    end: 'items-end justify-end',
    stretch: 'items-stretch justify-stretch',
  };

  const fitClasses = {
    loose: '',
    expand: 'w-full h-full',
    passthrough: 'contents',
  };

  return (
    <div
      className={`
        relative
        ${alignmentClasses[alignment]}
        ${fitClasses[fit]}
        ${className}
      `}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={`
            ${index === 0 ? '' : 'absolute inset-0'}
            ${fit === 'expand' ? 'w-full h-full' : ''}
          `}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
