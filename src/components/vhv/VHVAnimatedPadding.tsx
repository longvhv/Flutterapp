import React from 'react';
import { motion } from 'motion/react';

interface VHVAnimatedPaddingProps {
  children: React.ReactNode;
  padding: number | {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  duration?: number;
  curve?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  className?: string;
}

export const VHVAnimatedPadding: React.FC<VHVAnimatedPaddingProps> = ({
  children,
  padding,
  duration = 0.2,
  curve = 'linear',
  className = '',
}) => {
  let paddingStyle = {};
  if (typeof padding === 'number') {
    paddingStyle = { padding: `${padding}px` };
  } else {
    paddingStyle = {
      paddingTop: `${padding.top || 0}px`,
      paddingBottom: `${padding.bottom || 0}px`,
      paddingLeft: `${padding.left || 0}px`,
      paddingRight: `${padding.right || 0}px`,
    };
  }

  return (
    <motion.div
      animate={paddingStyle}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
