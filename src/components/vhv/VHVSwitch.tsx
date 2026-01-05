import React from 'react';
import { motion } from 'motion/react';

interface VHVSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  color?: 'primary' | 'secondary' | 'success';
  className?: string;
}

export const VHVSwitch: React.FC<VHVSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  color = 'primary',
  className = '',
}) => {
  const colorClasses = {
    primary: checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600',
    secondary: checked ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600',
    success: checked ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600',
  };
  
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <label className={`inline-flex items-center gap-3 ${disabledClass} ${className}`}>
      <div
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative w-12 h-6 rounded-full transition-colors duration-200
          ${colorClasses[color]}
          ${disabledClass}
        `}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      {label && (
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </span>
      )}
    </label>
  );
};
