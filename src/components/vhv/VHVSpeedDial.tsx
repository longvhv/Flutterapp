import React, { useState } from 'react';
import { Plus, X, LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface VHVSpeedDialAction {
  id: string;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

interface VHVSpeedDialProps {
  actions: VHVSpeedDialAction[];
  icon?: LucideIcon;
  direction?: 'up' | 'down' | 'left' | 'right';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  tooltipPosition?: 'left' | 'right' | 'top' | 'bottom';
  persistent?: boolean;
  className?: string;
}

export const VHVSpeedDial: React.FC<VHVSpeedDialProps> = ({
  actions,
  icon: MainIcon = Plus,
  direction = 'up',
  position = 'bottom-right',
  tooltipPosition = 'left',
  persistent = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-purple-600 hover:bg-purple-700',
    success: 'bg-green-600 hover:bg-green-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    error: 'bg-red-600 hover:bg-red-700',
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const directionClasses = {
    up: 'flex-col-reverse',
    down: 'flex-col',
    left: 'flex-row-reverse',
    right: 'flex-row',
  };

  const getActionPosition = (index: number) => {
    const distance = (index + 1) * 64;
    switch (direction) {
      case 'up':
        return { bottom: distance };
      case 'down':
        return { top: distance };
      case 'left':
        return { right: distance };
      case 'right':
        return { left: distance };
    }
  };

  const handleActionClick = (action: VHVSpeedDialAction) => {
    action.onClick();
    if (!persistent) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl flex items-center justify-center transition-colors relative z-10"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <MainIcon size={24} />}
        </motion.div>
      </motion.button>

      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <>
            {actions.map((action, index) => {
              const ActionIcon = action.icon;
              const actionColor = action.color || 'primary';

              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="absolute"
                  style={getActionPosition(index)}
                >
                  <div className="relative group">
                    {/* Action Button */}
                    <motion.button
                      onClick={() => handleActionClick(action)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`
                        w-12 h-12 rounded-full ${colorClasses[actionColor]}
                        text-white shadow-lg flex items-center justify-center
                        transition-colors
                      `}
                    >
                      <ActionIcon size={20} />
                    </motion.button>

                    {/* Tooltip */}
                    <div
                      className={`
                        absolute whitespace-nowrap
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-200 pointer-events-none
                        ${tooltipPosition === 'left' ? 'right-14 top-1/2 -translate-y-1/2' : ''}
                        ${tooltipPosition === 'right' ? 'left-14 top-1/2 -translate-y-1/2' : ''}
                        ${tooltipPosition === 'top' ? 'bottom-14 left-1/2 -translate-x-1/2' : ''}
                        ${tooltipPosition === 'bottom' ? 'top-14 left-1/2 -translate-x-1/2' : ''}
                      `}
                    >
                      <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">
                        {action.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
