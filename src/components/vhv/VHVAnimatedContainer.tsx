import React from 'react';
import { motion } from 'motion/react';

interface VHVAnimatedContainerProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  margin?: number | string;
  backgroundColor?: string;
  borderRadius?: number | string;
  opacity?: number;
  scale?: number;
  rotate?: number;
  duration?: number;
  curve?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'spring';
  onAnimationComplete?: () => void;
  className?: string;
}

export const VHVAnimatedContainer: React.FC<VHVAnimatedContainerProps> = ({
  children,
  width,
  height,
  padding,
  margin,
  backgroundColor,
  borderRadius,
  opacity = 1,
  scale = 1,
  rotate = 0,
  duration = 0.3,
  curve = 'easeInOut',
  onAnimationComplete,
  className = '',
}) => {
  const easeMap = {
    linear: [0, 0, 1, 1],
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
    spring: undefined, // Will use spring animation
  };

  const transition = curve === 'spring'
    ? { type: 'spring', stiffness: 300, damping: 30 }
    : { duration, ease: easeMap[curve] };

  return (
    <motion.div
      animate={{
        width,
        height,
        padding,
        margin,
        backgroundColor,
        borderRadius,
        opacity,
        scale,
        rotate,
      }}
      transition={transition}
      onAnimationComplete={onAnimationComplete}
      className={className}
    >
      {children}
    </motion.div>
  );
};
