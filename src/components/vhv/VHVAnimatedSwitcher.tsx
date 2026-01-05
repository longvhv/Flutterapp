import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VHVAnimatedSwitcherProps {
  children: React.ReactNode;
  childKey?: string | number;
  duration?: number;
  transitionType?: 'fade' | 'slide' | 'scale' | 'slideVertical';
  className?: string;
}

export const VHVAnimatedSwitcher: React.FC<VHVAnimatedSwitcherProps> = ({
  children,
  childKey,
  duration = 0.3,
  transitionType = 'fade',
  className = '',
}) => {
  const transitions = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    slideVertical: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={childKey}
        {...transitions[transitionType]}
        transition={{ duration }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
