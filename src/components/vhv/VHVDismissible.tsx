import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Trash2 } from 'lucide-react';

interface VHVDismissibleProps {
  child: React.ReactNode;
  onDismissed?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  confirmDismiss?: (direction: 'left' | 'right' | 'up' | 'down') => Promise<boolean>;
  background?: React.ReactNode;
  secondaryBackground?: React.ReactNode;
  direction?: 'horizontal' | 'vertical' | 'endToStart' | 'startToEnd' | 'up' | 'down';
  dismissThresholds?: { left?: number; right?: number; up?: number; down?: number };
  movementDuration?: number;
  crossAxisEndOffset?: number;
  dragStartBehavior?: 'down' | 'start';
  resizeDuration?: number;
  className?: string;
}

export const VHVDismissible: React.FC<VHVDismissibleProps> = ({
  child,
  onDismissed,
  confirmDismiss,
  background,
  secondaryBackground,
  direction = 'horizontal',
  dismissThresholds = { left: 0.4, right: 0.4 },
  movementDuration = 200,
  crossAxisEndOffset = 0,
  dragStartBehavior = 'down',
  resizeDuration = 300,
  className = '',
}) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = async (event: any, info: any) => {
    if (!containerRef.current) return;

    const { offset, velocity } = info;
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    let shouldDismiss = false;
    let dismissDirection: 'left' | 'right' | 'up' | 'down' = 'right';

    if (direction === 'horizontal' || direction === 'endToStart' || direction === 'startToEnd') {
      const threshold = offset.x > 0 ? dismissThresholds.right || 0.4 : dismissThresholds.left || 0.4;
      shouldDismiss = Math.abs(offset.x) > width * threshold || Math.abs(velocity.x) > 500;
      dismissDirection = offset.x > 0 ? 'right' : 'left';
    } else if (direction === 'vertical' || direction === 'up' || direction === 'down') {
      const threshold = offset.y > 0 ? dismissThresholds.down || 0.4 : dismissThresholds.up || 0.4;
      shouldDismiss = Math.abs(offset.y) > height * threshold || Math.abs(velocity.y) > 500;
      dismissDirection = offset.y > 0 ? 'down' : 'up';
    }

    if (shouldDismiss) {
      if (confirmDismiss) {
        const confirmed = await confirmDismiss(dismissDirection);
        if (!confirmed) return;
      }
      
      setIsDismissed(true);
      setTimeout(() => {
        onDismissed?.(dismissDirection);
      }, movementDuration);
    }
  };

  if (isDismissed) {
    return null;
  }

  const defaultBackground = (
    <div className="absolute inset-0 bg-red-500 flex items-center justify-end px-4">
      <Trash2 className="text-white" size={24} />
    </div>
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        {background || defaultBackground}
      </div>
      
      <motion.div
        drag={direction === 'horizontal' ? 'x' : direction === 'vertical' ? 'y' : true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="relative bg-white dark:bg-gray-900 cursor-grab active:cursor-grabbing"
      >
        {child}
      </motion.div>
    </div>
  );
};
