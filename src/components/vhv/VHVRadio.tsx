import React from 'react';
import { motion } from 'motion/react';

interface VHVRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface VHVRadioProps {
  options: VHVRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  color?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const VHVRadio: React.FC<VHVRadioProps> = ({
  options,
  value,
  onChange,
  name,
  color = 'primary',
  size = 'medium',
  orientation = 'vertical',
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
  };

  const dotSizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-2.5 h-2.5',
  };

  const colorClasses = {
    primary: 'border-blue-600',
    secondary: 'border-purple-600',
    success: 'border-green-600',
  };

  const dotColorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-purple-600',
    success: 'bg-green-600',
  };

  const orientationClass = orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col';

  return (
    <div className={`flex ${orientationClass} gap-3 ${className}`}>
      {options.map((option) => {
        const isChecked = value === option.value;
        const isDisabled = option.disabled || false;

        return (
          <label
            key={option.value}
            className={`
              inline-flex items-center gap-2
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={(e) => !isDisabled && onChange?.(e.target.value)}
                disabled={isDisabled}
                className="sr-only"
              />
              
              <div
                className={`
                  ${sizeClasses[size]}
                  rounded-full border-2 transition-all
                  flex items-center justify-center
                  ${isChecked ? colorClasses[color] : 'border-gray-300 dark:border-gray-600'}
                  ${!isDisabled && !isChecked ? 'hover:border-gray-400 dark:hover:border-gray-500' : ''}
                `}
              >
                {isChecked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`${dotSizeClasses[size]} ${dotColorClasses[color]} rounded-full`}
                  />
                )}
              </div>
            </div>
            
            <span className="text-sm font-medium text-gray-900 dark:text-white select-none">
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};
