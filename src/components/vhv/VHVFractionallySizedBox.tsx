import React from 'react';

interface VHVFractionallySizedBoxProps {
  children: React.ReactNode;
  widthFactor?: number; // 0.0 to 1.0+
  heightFactor?: number; // 0.0 to 1.0+
  alignment?: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  className?: string;
}

export const VHVFractionallySizedBox: React.FC<VHVFractionallySizedBoxProps> = ({
  children,
  widthFactor,
  heightFactor,
  alignment = 'center',
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

  return (
    <div className={`flex ${alignmentMap[alignment]} w-full h-full ${className}`}>
      <div
        style={{
          width: widthFactor !== undefined ? `${widthFactor * 100}%` : undefined,
          height: heightFactor !== undefined ? `${heightFactor * 100}%` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};
