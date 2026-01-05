import React, { useState, useEffect, useRef } from 'react';

interface VHVBoxConstraints {
  maxWidth: number;
  maxHeight: number;
  minWidth: number;
  minHeight: number;
}

interface VHVLayoutBuilderProps {
  builder: (constraints: VHVBoxConstraints) => React.ReactNode;
  className?: string;
}

export const VHVLayoutBuilder: React.FC<VHVLayoutBuilderProps> = ({
  builder,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState<VHVBoxConstraints>({
    maxWidth: 0,
    maxHeight: 0,
    minWidth: 0,
    minHeight: 0,
  });

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setConstraints({
          maxWidth: rect.width,
          maxHeight: rect.height,
          minWidth: 0,
          minHeight: 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {constraints.maxWidth > 0 && builder(constraints)}
    </div>
  );
};
