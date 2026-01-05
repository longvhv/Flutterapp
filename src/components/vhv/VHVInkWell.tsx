import React, { useState } from 'react';
import { motion } from 'motion/react';

interface VHVInkWellProps {
  children: React.ReactNode;
  onTap?: () => void;
  onLongPress?: () => void;
  onHover?: (hovering: boolean) => void;
  splashColor?: string;
  highlightColor?: string;
  hoverColor?: string;
  borderRadius?: number;
  enableFeedback?: boolean;
  excludeFromSemantics?: boolean;
  className?: string;
}

export const VHVInkWell: React.FC<VHVInkWellProps> = ({
  children,
  onTap,
  onLongPress,
  onHover,
  splashColor = 'rgba(0, 0, 0, 0.1)',
  highlightColor = 'rgba(0, 0, 0, 0.05)',
  hoverColor = 'rgba(0, 0, 0, 0.04)',
  borderRadius = 0,
  enableFeedback = true,
  excludeFromSemantics = false,
  className = '',
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const longPressTimer = React.useRef<NodeJS.Timeout>();

  const handleMouseDown = () => {
    setIsPressed(true);
    
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress();
        if (enableFeedback && navigator.vibrate) {
          navigator.vibrate(10);
        }
      }, 500);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleClick = () => {
    if (onTap) {
      onTap();
      if (enableFeedback && navigator.vibrate) {
        navigator.vibrate(5);
      }
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    if (onHover) {
      onHover(false);
    }
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const backgroundColor = isPressed
    ? highlightColor
    : isHovered
    ? hoverColor
    : 'transparent';

  return (
    <motion.div
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.98 }}
      style={{
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.2s',
      }}
      className={className}
      role={excludeFromSemantics ? 'presentation' : 'button'}
      tabIndex={excludeFromSemantics ? -1 : 0}
    >
      {children}
      
      {/* Ripple effect */}
      {isPressed && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: splashColor,
            borderRadius: `${borderRadius}px`,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
};
