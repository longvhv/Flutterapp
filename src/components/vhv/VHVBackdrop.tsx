import React from 'react';

interface VHVBackdropProps {
  children: React.ReactNode;
  filter?: 'blur' | 'brightness' | 'contrast' | 'saturate';
  intensity?: number;
  className?: string;
}

export const VHVBackdrop: React.FC<VHVBackdropProps> = ({
  children,
  filter = 'blur',
  intensity = 10,
  className = '',
}) => {
  const getFilterStyle = () => {
    switch (filter) {
      case 'blur':
        return `blur(${intensity}px)`;
      case 'brightness':
        return `brightness(${intensity}%)`;
      case 'contrast':
        return `contrast(${intensity}%)`;
      case 'saturate':
        return `saturate(${intensity}%)`;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: getFilterStyle(),
          WebkitBackdropFilter: getFilterStyle(),
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
