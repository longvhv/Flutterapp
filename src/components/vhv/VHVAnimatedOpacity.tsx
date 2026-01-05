import React from 'react';
import { motion } from 'motion/react';

interface VHVAnimatedOpacityProps {
  children: React.ReactNode;
  opacity: number;
  duration?: number;
  curve?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  onEnd?: () => void;
  className?: string;
}

export const VHVAnimatedOpacity: React.FC<VHVAnimatedOpacityProps> = ({
  children,
  opacity,
  duration = 0.2,
  curve = 'linear',
  onEnd,
  className = '',
}) => {
  const easeMap = {
    linear: [0, 0, 1, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
  };

  return (
    <motion.div
      animate={{ opacity }}
      transition={{ duration, ease: easeMap[curve] }}
      onAnimationComplete={onEnd}
      className={className}
    >
      {children}
    </motion.div>
  );
};
