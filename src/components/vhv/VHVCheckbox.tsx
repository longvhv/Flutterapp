import React from 'react';
import { motion } from 'motion/react';
import { Check, Minus } from 'lucide-react';

interface VHVCheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium';
  className?: string;
}

export const VHVCheckbox: React.FC<VHVCheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  color = 'primary',
  size = 'medium',
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
  };

  const iconSizes = {
    small: 12,
    medium: 16,
  };

  const colorClasses = {
    primary: checked || indeterminate
      ? 'bg-blue-600 border-blue-600'
      : 'border-gray-300 dark:border-gray-600',
    secondary: checked || indeterminate
      ? 'bg-purple-600 border-purple-600'
      : 'border-gray-300 dark:border-gray-600',
    success: checked || indeterminate
      ? 'bg-green-600 border-green-600'
      : 'border-gray-300 dark:border-gray-600',
  };

  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer hover:border-gray-400 dark:hover:border-gray-500';

  return (
    <label className={`inline-flex items-center gap-2 ${disabledClass} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        
        <div
          className={`
            ${sizeClasses[size]}
            ${colorClasses[color]}
            border-2 rounded transition-all
            flex items-center justify-center
          `}
        >
          <AnimatePresence>
            {(checked || indeterminate) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {indeterminate ? (
                  <Minus size={iconSizes[size]} className="text-white" />
                ) : (
                  <Check size={iconSizes[size]} className="text-white" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {label && (
        <span className="text-sm font-medium text-gray-900 dark:text-white select-none">
          {label}
        </span>
      )}
    </label>
  );
};
