import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface VHVDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  elevation?: number;
  semanticLabel?: string;
  showCloseButton?: boolean;
  className?: string;
}

export const VHVDrawer: React.FC<VHVDrawerProps> = ({
  children,
  isOpen,
  onClose,
  position = 'left',
  width = '280px',
  height = '100%',
  backgroundColor = '#FFFFFF',
  elevation = 16,
  semanticLabel,
  showCloseButton = true,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getSlideAnimation = () => {
    switch (position) {
      case 'left':
        return { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } };
      case 'right':
        return { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } };
      case 'top':
        return { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' } };
      case 'bottom':
        return { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } };
    }
  };

  const getPositionStyles = () => {
    const base = { position: 'fixed' as const, zIndex: 1100 };
    switch (position) {
      case 'left':
        return { ...base, left: 0, top: 0, bottom: 0, width };
      case 'right':
        return { ...base, right: 0, top: 0, bottom: 0, width };
      case 'top':
        return { ...base, top: 0, left: 0, right: 0, height };
      case 'bottom':
        return { ...base, bottom: 0, left: 0, right: 0, height };
    }
  };

  const slideAnimation = getSlideAnimation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[1099]"
          />

          {/* Drawer */}
          <motion.div
            {...slideAnimation}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              ...getPositionStyles(),
              backgroundColor,
              boxShadow: `0 ${elevation}px ${elevation * 2}px rgba(0,0,0,0.3)`,
            }}
            className={`overflow-y-auto dark:bg-gray-900 ${className}`}
            role="dialog"
            aria-label={semanticLabel}
          >
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
            )}
            
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
