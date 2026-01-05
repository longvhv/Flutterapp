import React from 'react';

interface VHVAspectRatioProps {
  children: React.ReactNode;
  aspectRatio: number; // width / height (e.g., 16/9, 4/3, 1)
  className?: string;
}

export const VHVAspectRatio: React.FC<VHVAspectRatioProps> = ({
  children,
  aspectRatio,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: aspectRatio.toString() }}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};
