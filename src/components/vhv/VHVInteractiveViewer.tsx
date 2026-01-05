import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface VHVInteractiveViewerProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  boundaryMargin?: number;
  constrained?: boolean;
  panEnabled?: boolean;
  scaleEnabled?: boolean;
  className?: string;
}

export const VHVInteractiveViewer: React.FC<VHVInteractiveViewerProps> = ({
  children,
  minScale = 0.5,
  maxScale = 4,
  boundaryMargin = 0,
  constrained = true,
  panEnabled = true,
  scaleEnabled = true,
  className = '',
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    if (!scaleEnabled) return;
    e.preventDefault();
    
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(minScale, scale + delta), maxScale);
    setScale(newScale);
  };

  return (
    <div 
      className={`overflow-hidden ${className}`}
      onWheel={handleWheel}
    >
      <motion.div
        drag={panEnabled}
        dragConstraints={constrained ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined}
        dragElastic={0.1}
        style={{
          scale,
          x: position.x,
          y: position.y,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
