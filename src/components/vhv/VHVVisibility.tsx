import React from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface VHVVisibilityProps {
  children: React.ReactNode;
  visible: boolean;
  maintainState?: boolean;
  maintainAnimation?: boolean;
  maintainSize?: boolean;
  replacement?: React.ReactNode;
  animationType?: 'fade' | 'slide' | 'scale' | 'none';
  className?: string;
}

export const VHVVisibility: React.FC<VHVVisibilityProps> = ({
  children,
  visible,
  maintainState = false,
  maintainAnimation = true,
  maintainSize = false,
  replacement,
  animationType = 'fade',
  className = '',
}) => {
  // If maintainState is false and not visible, don't render at all
  if (!maintainState && !visible) {
    return replacement ? <>{replacement}</> : null;
  }

  // If maintainSize is true, keep the space but hide content
  if (maintainSize && !visible) {
    return (
      <div className={`invisible ${className}`}>
        {children}
      </div>
    );
  }

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  };

  // Without animation
  if (!maintainAnimation || animationType === 'none') {
    return visible ? <div className={className}>{children}</div> : (replacement ? <>{replacement}</> : null);
  }

  // With animation
  return (
    <AnimatePresence mode="wait">
      {visible ? (
        <motion.div
          {...animations[animationType]}
          transition={{ duration: 0.2 }}
          className={className}
        >
          {children}
        </motion.div>
      ) : (
        replacement && (
          <motion.div
            {...animations[animationType]}
            transition={{ duration: 0.2 }}
          >
            {replacement}
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};
