import React from 'react';
import { motion } from 'motion/react';

interface VHVProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  striped?: boolean;
  animated?: boolean;
  className?: string;
}

export const VHVProgressBar: React.FC<VHVProgressBarProps> = ({
  value,
  max = 100,
  showLabel = false,
  color = 'primary',
  size = 'medium',
  striped = false,
  animated = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
  };

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-purple-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`
            h-full ${colorClasses[color]} rounded-full
            ${striped ? 'bg-striped' : ''}
            ${animated ? 'animate-progress' : ''}
          `}
          style={{
            backgroundImage: striped
              ? 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)'
              : undefined,
            backgroundSize: striped ? '1rem 1rem' : undefined,
          }}
        />
      </div>
    </div>
  );
};

// Circular progress
interface VHVCircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  className?: string;
}

export const VHVCircularProgress: React.FC<VHVCircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  showLabel = true,
  color = 'primary',
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    primary: 'stroke-blue-600',
    secondary: 'stroke-purple-600',
    success: 'stroke-green-600',
    warning: 'stroke-yellow-600',
    error: 'stroke-red-600',
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className={colorClasses[color]}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};
