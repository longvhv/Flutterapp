import React from 'react';
import { motion } from 'motion/react';

interface VHVLinearProgressIndicatorProps {
  value?: number;
  backgroundColor?: string;
  color?: string;
  minHeight?: number;
  semanticsLabel?: string;
  semanticsValue?: string;
  className?: string;
}

export const VHVLinearProgressIndicator: React.FC<VHVLinearProgressIndicatorProps> = ({
  value,
  backgroundColor = '#E5E7EB',
  color = '#3B82F6',
  minHeight = 4,
  semanticsLabel,
  semanticsValue,
  className = '',
}) => {
  const isIndeterminate = value === undefined;

  return (
    <div
      role="progressbar"
      aria-label={semanticsLabel}
      aria-valuenow={value ? value * 100 : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={semanticsValue}
      style={{
        backgroundColor,
        height: `${minHeight}px`,
        overflow: 'hidden',
      }}
      className={`relative rounded-full ${className}`}
    >
      {isIndeterminate ? (
        <motion.div
          animate={{ x: ['0%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundColor: color }}
          className="absolute inset-y-0 w-1/3"
        />
      ) : (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          style={{ backgroundColor: color }}
          className="absolute inset-y-0 left-0"
        />
      )}
    </div>
  );
};
