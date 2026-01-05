import React from 'react';

interface VHVFittedBoxProps {
  children: React.ReactNode;
  fit?: 'contain' | 'cover' | 'fill' | 'fitHeight' | 'fitWidth' | 'none' | 'scaleDown';
  alignment?: 'center' | 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  className?: string;
}

export const VHVFittedBox: React.FC<VHVFittedBoxProps> = ({
  children,
  fit = 'contain',
  alignment = 'center',
  className = '',
}) => {
  const fitMap = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    fitHeight: 'object-cover h-full',
    fitWidth: 'object-cover w-full',
    none: 'object-none',
    scaleDown: 'object-scale-down',
  };

  const alignmentMap = {
    center: 'object-center',
    topLeft: 'object-left-top',
    topCenter: 'object-top',
    topRight: 'object-right-top',
    centerLeft: 'object-left',
    centerRight: 'object-right',
    bottomLeft: 'object-left-bottom',
    bottomCenter: 'object-bottom',
    bottomRight: 'object-right-bottom',
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div className={`w-full h-full ${fitMap[fit]} ${alignmentMap[alignment]}`}>
        {children}
      </div>
    </div>
  );
};
