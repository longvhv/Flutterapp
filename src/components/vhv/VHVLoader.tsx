import React from 'react';
import { motion } from 'motion/react';

export type VHVLoaderVariant = 'spinner' | 'dots' | 'pulse' | 'bars';
export type VHVLoaderSize = 'small' | 'medium' | 'large';

interface VHVLoaderProps {
  variant?: VHVLoaderVariant;
  size?: VHVLoaderSize;
  color?: string;
  fullscreen?: boolean;
  text?: string;
  className?: string;
}

export const VHVLoader: React.FC<VHVLoaderProps> = ({
  variant = 'spinner',
  size = 'medium',
  color = 'text-blue-600',
  fullscreen = false,
  text,
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const dotSizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4',
  };

  const barSizeClasses = {
    small: 'w-1 h-6',
    medium: 'w-1.5 h-12',
    large: 'w-2 h-16',
  };

  const SpinnerLoader = () => (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const DotsLoader = () => (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${dotSizeClasses[size]} ${color.replace('text-', 'bg-')} rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );

  const PulseLoader = () => (
    <motion.div
      className={`${sizeClasses[size]} ${color.replace('text-', 'bg-')} rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
  );

  const BarsLoader = () => (
    <div className="flex items-end gap-1">
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className={`${barSizeClasses[size]} ${color.replace('text-', 'bg-')} rounded-sm`}
          animate={{
            scaleY: [1, 1.5, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );

  const loaders = {
    spinner: <SpinnerLoader />,
    dots: <DotsLoader />,
    pulse: <PulseLoader />,
    bars: <BarsLoader />,
  };

  const content = (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      {loaders[variant]}
      {text && (
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};
