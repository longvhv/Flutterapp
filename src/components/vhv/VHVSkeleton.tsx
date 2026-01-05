import React from 'react';
import { motion } from 'motion/react';

export type VHVSkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

interface VHVSkeletonProps {
  variant?: VHVSkeletonVariant;
  width?: string;
  height?: string;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

export const VHVSkeleton: React.FC<VHVSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className = '',
}) => {
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const baseClass = 'bg-gray-200 dark:bg-gray-700';

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: '',
    none: '',
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'circular' ? '40px' : variant === 'text' ? '1rem' : '200px'),
  };

  if (animation === 'wave') {
    return (
      <div
        className={`${baseClass} ${variantClasses[variant]} ${className} relative overflow-hidden`}
        style={style}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`${baseClass} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

// Pre-built skeleton templates
export const VHVSkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-6 ${className}`}>
    <VHVSkeleton variant="circular" width="48px" height="48px" className="mb-4" />
    <VHVSkeleton variant="text" className="mb-2" width="60%" />
    <VHVSkeleton variant="text" className="mb-4" width="80%" />
    <VHVSkeleton variant="rectangular" height="120px" className="mb-4" />
    <div className="flex gap-2">
      <VHVSkeleton variant="rounded" width="80px" height="36px" />
      <VHVSkeleton variant="rounded" width="80px" height="36px" />
    </div>
  </div>
);

export const VHVSkeletonList: React.FC<{ items?: number; className?: string }> = ({
  items = 3,
  className = '',
}) => (
  <div className={className}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
        <VHVSkeleton variant="circular" width="40px" height="40px" />
        <div className="flex-1">
          <VHVSkeleton variant="text" className="mb-2" width="40%" />
          <VHVSkeleton variant="text" width="60%" />
        </div>
      </div>
    ))}
  </div>
);
