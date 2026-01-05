import React from 'react';
import { motion } from 'motion/react';

export interface VHVSegment {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface VHVSegmentedControlProps {
  segments: VHVSegment[];
  value: string;
  onChange: (id: string) => void;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  className?: string;
}

export const VHVSegmentedControl: React.FC<VHVSegmentedControlProps> = ({
  segments,
  value,
  onChange,
  fullWidth = false,
  size = 'medium',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-purple-600',
  };

  return (
    <div
      className={`
        inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {segments.map((segment) => {
        const isActive = segment.id === value;
        const isDisabled = segment.disabled || false;

        return (
          <button
            key={segment.id}
            onClick={() => !isDisabled && onChange(segment.id)}
            disabled={isDisabled}
            className={`
              relative ${sizeClasses[size]}
              ${fullWidth ? 'flex-1' : ''}
              flex items-center justify-center gap-2
              rounded-lg font-medium transition-colors
              ${isDisabled
                ? 'opacity-50 cursor-not-allowed'
                : isActive
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeSegment"
                className={`absolute inset-0 ${colorClasses[color]} rounded-lg`}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {segment.icon}
              {segment.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
