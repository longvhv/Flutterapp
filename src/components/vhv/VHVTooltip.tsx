import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VHVTooltipProps {
  message: string;
  children: React.ReactNode;
  preferBelow?: boolean;
  verticalOffset?: number;
  padding?: string;
  margin?: number;
  height?: number;
  decoration?: {
    color?: string;
    textStyle?: React.CSSProperties;
  };
  waitDuration?: number;
  showDuration?: number;
  className?: string;
}

export const VHVTooltip: React.FC<VHVTooltipProps> = ({
  message,
  children,
  preferBelow = true,
  verticalOffset = 24,
  padding = '8px 12px',
  margin = 0,
  height,
  decoration = {},
  waitDuration = 500,
  showDuration = 1500,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      
      // Auto hide after showDuration
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, showDuration);
    }, waitDuration);

    // Calculate position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      if (preferBelow) {
        setPosition(spaceBelow > verticalOffset + 50 ? 'bottom' : 'top');
      } else {
        setPosition(spaceAbove > verticalOffset + 50 ? 'top' : 'bottom');
      }
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setIsVisible(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              [position]: position === 'bottom' ? `${verticalOffset}px` : `${verticalOffset}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: decoration.color || '#1F2937',
              padding,
              margin: `${margin}px`,
              height,
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              zIndex: 1000,
              pointerEvents: 'none',
              ...decoration.textStyle,
            }}
            className="text-white text-sm shadow-lg"
          >
            {message}
            
            {/* Arrow */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                [position === 'bottom' ? 'top' : 'bottom']: '-4px',
                width: 0,
                height: 0,
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                [position === 'bottom' ? 'borderBottom' : 'borderTop']: `4px solid ${decoration.color || '#1F2937'}`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
