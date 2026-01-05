import React, { useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { X } from 'lucide-react';

interface VHVBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showHandle?: boolean;
  showCloseButton?: boolean;
  snapPoints?: number[];
  className?: string;
}

export const VHVBottomSheet: React.FC<VHVBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showHandle = true,
  showCloseButton = true,
  snapPoints = [0.5, 0.9],
  className = '',
}) => {
  const [currentSnap, setCurrentSnap] = React.useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const height = `${snapPoints[currentSnap] * 100}vh`;

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`
              fixed bottom-0 left-0 right-0 z-50
              bg-white dark:bg-gray-900
              rounded-t-3xl shadow-2xl
              flex flex-col
              ${className}
            `}
            style={{ height }}
          >
            {/* Handle */}
            {showHandle && (
              <div className="w-full flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </div>
            )}

            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                {title && (
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ml-auto"
                  >
                    <X size={20} className="text-gray-500 dark:text-gray-400" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
