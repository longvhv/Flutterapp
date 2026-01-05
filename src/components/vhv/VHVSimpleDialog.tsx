import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface VHVSimpleDialogProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  backgroundColor?: string;
  elevation?: number;
  shape?: string;
  titlePadding?: string;
  contentPadding?: string;
  className?: string;
}

export const VHVSimpleDialog: React.FC<VHVSimpleDialogProps> = ({
  title,
  children,
  isOpen,
  onClose,
  backgroundColor = '#FFFFFF',
  elevation = 24,
  shape = '12px',
  titlePadding = '24px 24px 16px',
  contentPadding = '0 24px 24px',
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
            className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              backgroundColor,
              borderRadius: shape,
              boxShadow: `0 ${elevation}px ${elevation * 2}px rgba(0,0,0,0.3)`,
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className={`z-[1001] max-w-md w-full mx-4 dark:bg-gray-800 ${className}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Title */}
            {title && (
              <div
                style={{ padding: titlePadding }}
                className="text-xl font-semibold dark:text-white"
              >
                {title}
              </div>
            )}

            {/* Content */}
            <div style={{ padding: contentPadding }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};