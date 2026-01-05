import React from 'react';
import { motion } from 'motion/react';

interface VHVCupertinoActivityIndicatorProps {
  animating?: boolean;
  radius?: number;
  color?: string;
  className?: string;
}

export const VHVCupertinoActivityIndicator: React.FC<VHVCupertinoActivityIndicatorProps> = ({
  animating = true,
  radius = 10,
  color = '#8E8E93',
  className = '',
}) => {
  if (!animating) return null;

  const size = radius * 2;
  const tickCount = 12;

  return (
    <div className={className} style={{ width: size, height: size, position: 'relative' }}>
      {Array.from({ length: tickCount }).map((_, index) => {
        const angle = (index * 360) / tickCount;
        const delay = index * 0.083; // 1/12 second

        return (
          <motion.div
            key={index}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              width: '2px',
              height: radius / 2.5,
              backgroundColor: color,
              borderRadius: '1px',
              top: '50%',
              left: '50%',
              transformOrigin: `1px ${radius}px`,
              transform: `rotate(${angle}deg) translateY(-${radius}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
