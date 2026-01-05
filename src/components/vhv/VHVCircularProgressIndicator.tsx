import React from 'react';
import { motion } from 'motion/react';

interface VHVCircularProgressIndicatorProps {
  value?: number;
  backgroundColor?: string;
  color?: string;
  strokeWidth?: number;
  semanticsLabel?: string;
  semanticsValue?: string;
  className?: string;
}

export const VHVCircularProgressIndicator: React.FC<VHVCircularProgressIndicatorProps> = ({
  value,
  backgroundColor,
  color = '#3B82F6',
  strokeWidth = 4,
  semanticsLabel,
  semanticsValue,
  className = '',
}) => {
  const size = 40;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const isIndeterminate = value === undefined;

  return (
    <div
      role="progressbar"
      aria-label={semanticsLabel}
      aria-valuenow={value ? value * 100 : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={semanticsValue}
      className={className}
    >
      <svg width={size} height={size}>
        {backgroundColor && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        )}
        {isIndeterminate ? (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference * 0.75 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: 'center' }}
          />
        ) : (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - (value || 0))}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        )}
      </svg>
    </div>
  );
};
