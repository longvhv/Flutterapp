import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VHVAnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey: (item: T) => string | number;
  initialAnimation?: 'fade' | 'slide' | 'scale';
  removeAnimation?: 'fade' | 'slide' | 'scale';
  staggerDelay?: number;
  className?: string;
}

export function VHVAnimatedList<T>({
  items,
  renderItem,
  getKey,
  initialAnimation = 'slide',
  removeAnimation = 'slide',
  staggerDelay = 0.05,
  className = '',
}: VHVAnimatedListProps<T>) {
  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
  };

  return (
    <div className={className}>
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={getKey(item)}
            {...animations[initialAnimation]}
            exit={animations[removeAnimation].exit}
            transition={{
              duration: 0.3,
              delay: index * staggerDelay,
            }}
            layout
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
