import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';

interface VHVRefreshIndicatorProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success';
  className?: string;
}

export const VHVRefreshIndicator: React.FC<VHVRefreshIndicatorProps> = ({
  children,
  onRefresh,
  threshold = 80,
  disabled = false,
  color = 'primary',
  className = '',
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-purple-600',
    success: 'text-green-600',
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || isRefreshing || startY === 0) return;

    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - startY);
    
    // Only allow pull down when scrolled to top
    const element = e.currentTarget;
    if (element.scrollTop === 0) {
      setPullDistance(Math.min(distance, threshold * 1.5));
    }
  };

  const handleTouchEnd = async () => {
    if (disabled || isRefreshing) return;

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
    setStartY(0);
  };

  const progress = Math.min(pullDistance / threshold, 1);
  const showIndicator = pullDistance > 0 || isRefreshing;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative overflow-auto ${className}`}
    >
      {/* Pull Indicator */}
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-0 left-0 right-0 flex justify-center z-10"
          style={{ transform: `translateY(${Math.min(pullDistance - 40, 0)}px)` }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3 mt-4">
            <motion.div
              animate={{ rotate: isRefreshing ? 360 : progress * 360 }}
              transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
            >
              <RefreshCw size={24} className={colorClasses[color]} />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div style={{ paddingTop: isRefreshing ? '60px' : '0px', transition: 'padding 0.3s' }}>
        {children}
      </div>
    </div>
  );
};
