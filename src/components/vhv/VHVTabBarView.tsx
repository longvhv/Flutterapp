import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VHVTabBarViewProps {
  children: React.ReactNode[];
  currentIndex: number;
  physics?: 'bouncing' | 'clamping' | 'never';
  className?: string;
}

export const VHVTabBarView: React.FC<VHVTabBarViewProps> = ({
  children,
  currentIndex,
  physics = 'bouncing',
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
