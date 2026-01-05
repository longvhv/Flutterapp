import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, LucideIcon } from 'lucide-react';

interface FABAction {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface VHVFABProps {
  icon?: LucideIcon;
  onClick?: () => void;
  actions?: FABAction[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success';
  extended?: boolean;
  label?: string;
  className?: string;
}

export const VHVFAB: React.FC<VHVFABProps> = ({
  icon: Icon = Plus,
  onClick,
  actions,
  position = 'bottom-right',
  size = 'large',
  color = 'primary',
  extended = false,
  label,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-14 h-14',
    large: 'w-16 h-16',
  };

  const iconSizes = {
    small: 20,
    medium: 24,
    large: 28,
  };

  const colorClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const handleClick = () => {
    if (actions && actions.length > 0) {
      setIsOpen(!isOpen);
    } else {
      onClick?.();
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 ${className}`}>
      {/* Speed Dial Actions */}
      <AnimatePresence>
        {isOpen && actions && actions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 flex flex-col gap-3 items-end"
          >
            {actions.map((action, index) => {
              const ActionIcon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className="group flex items-center gap-3"
                >
                  <span className="bg-gray-900 dark:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {action.label}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <ActionIcon size={20} className="text-gray-700 dark:text-gray-300" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={handleClick}
        className={`
          ${extended ? 'px-6 rounded-full' : sizeClasses[size] + ' rounded-full'}
          ${colorClasses[color]}
          shadow-2xl flex items-center justify-center gap-2
          transition-all duration-200
          hover:shadow-3xl
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen && actions ? (
            <X size={iconSizes[size]} />
          ) : (
            <Icon size={iconSizes[size]} />
          )}
        </motion.div>
        {extended && label && (
          <span className="font-medium">{label}</span>
        )}
      </motion.button>
    </div>
  );
};
