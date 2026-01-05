import React, { useState } from 'react';
import { motion } from 'motion/react';

interface VHVRefreshControlProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

export const VHVRefreshControl: React.FC<VHVRefreshControlProps> = ({
  onRefresh,
  children,
  color = '#3B82F6',
  backgroundColor,
  className = '',
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;
    
    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance, 80));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > 50 && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative ${className}`}
    >
      {(isRefreshing || pullDistance > 0) && (
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-center"
          style={{
            height: isRefreshing ? '60px' : `${pullDistance}px`,
            backgroundColor,
          }}
        >
          <motion.div
            animate={isRefreshing ? { rotate: 360 } : {}}
            transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="2"
                fill="none"
                strokeDasharray="60"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
      )}
      <div style={{ marginTop: isRefreshing ? '60px' : '0px' }}>
        {children}
      </div>
    </div>
  );
};
