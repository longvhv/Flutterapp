import React from 'react';

interface VHVTransformProps {
  children: React.ReactNode;
  translate?: { x?: number; y?: number; z?: number };
  rotate?: number; // degrees
  scale?: number | { x?: number; y?: number };
  skew?: { x?: number; y?: number }; // degrees
  origin?: string; // e.g., 'center', 'top left', '50% 50%'
  className?: string;
}

export const VHVTransform: React.FC<VHVTransformProps> = ({
  children,
  translate,
  rotate,
  scale,
  skew,
  origin = 'center',
  className = '',
}) => {
  const transforms: string[] = [];

  if (translate) {
    const { x = 0, y = 0, z = 0 } = translate;
    if (z !== 0) {
      transforms.push(`translate3d(${x}px, ${y}px, ${z}px)`);
    } else {
      transforms.push(`translate(${x}px, ${y}px)`);
    }
  }

  if (rotate !== undefined) {
    transforms.push(`rotate(${rotate}deg)`);
  }

  if (scale !== undefined) {
    if (typeof scale === 'number') {
      transforms.push(`scale(${scale})`);
    } else {
      const { x = 1, y = 1 } = scale;
      transforms.push(`scale(${x}, ${y})`);
    }
  }

  if (skew) {
    const { x = 0, y = 0 } = skew;
    transforms.push(`skew(${x}deg, ${y}deg)`);
  }

  const style: React.CSSProperties = {
    transform: transforms.join(' '),
    transformOrigin: origin,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

// VHVTransform.rotate - shorthand for rotation
export const VHVTransformRotate: React.FC<{
  children: React.ReactNode;
  angle: number;
  origin?: string;
  className?: string;
}> = ({ children, angle, origin, className }) => (
  <VHVTransform rotate={angle} origin={origin} className={className}>
    {children}
  </VHVTransform>
);

// VHVTransform.scale - shorthand for scaling
export const VHVTransformScale: React.FC<{
  children: React.ReactNode;
  scale: number | { x?: number; y?: number };
  origin?: string;
  className?: string;
}> = ({ children, scale, origin, className }) => (
  <VHVTransform scale={scale} origin={origin} className={className}>
    {children}
  </VHVTransform>
);

// VHVTransform.translate - shorthand for translation
export const VHVTransformTranslate: React.FC<{
  children: React.ReactNode;
  x?: number;
  y?: number;
  z?: number;
  className?: string;
}> = ({ children, x, y, z, className }) => (
  <VHVTransform translate={{ x, y, z }} className={className}>
    {children}
  </VHVTransform>
);
