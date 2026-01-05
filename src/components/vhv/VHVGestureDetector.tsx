import React, { useState, useRef } from 'react';

interface VHVGestureDetectorProps {
  children: React.ReactNode;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  onPanStart?: (details: { x: number; y: number }) => void;
  onPanUpdate?: (details: { dx: number; dy: number }) => void;
  onPanEnd?: () => void;
  onHover?: (hovering: boolean) => void;
  behavior?: 'opaque' | 'translucent' | 'deferToChild';
  className?: string;
}

export const VHVGestureDetector: React.FC<VHVGestureDetectorProps> = ({
  children,
  onTap,
  onDoubleTap,
  onLongPress,
  onPanStart,
  onPanUpdate,
  onPanEnd,
  onHover,
  behavior = 'deferToChild',
  className = '',
}) => {
  const [lastTap, setLastTap] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const longPressTimer = useRef<NodeJS.Timeout>();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress();
      }, 500);
    }

    if (onPanStart) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      onPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && onPanUpdate) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      onPanUpdate({ dx, dy });
      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    if (isPanning && onPanEnd) {
      setIsPanning(false);
      onPanEnd();
    }
  };

  const handleClick = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTap;

    if (timeSinceLastTap < 300 && onDoubleTap) {
      onDoubleTap();
      setLastTap(0);
    } else {
      if (onTap) {
        onTap();
      }
      setLastTap(now);
    }
  };

  const handleMouseEnter = () => {
    if (onHover) {
      onHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (onHover) {
      onHover(false);
    }
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${behavior === 'opaque' ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
