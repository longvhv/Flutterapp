import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface VHVScrollbarProps {
  children: React.ReactNode;
  thumbColor?: string;
  trackColor?: string;
  thickness?: number;
  radius?: number;
  interactive?: boolean;
  className?: string;
}

export const VHVScrollbar: React.FC<VHVScrollbarProps> = ({
  children,
  thumbColor = 'rgba(0, 0, 0, 0.3)',
  trackColor = 'transparent',
  thickness = 8,
  radius = 4,
  interactive = true,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollHeight, clientHeight } = scrollRef.current;
      setShowScrollbar(scrollHeight > clientHeight);
    };

    const element = scrollRef.current;
    if (element) {
      handleScroll();
      element.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);

      return () => {
        element.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, []);

  const scrollbarStyles = `
    .vhv-scrollbar::-webkit-scrollbar {
      width: ${thickness}px;
    }
    .vhv-scrollbar::-webkit-scrollbar-track {
      background: ${trackColor};
      border-radius: ${radius}px;
    }
    .vhv-scrollbar::-webkit-scrollbar-thumb {
      background: ${thumbColor};
      border-radius: ${radius}px;
    }
    .vhv-scrollbar::-webkit-scrollbar-thumb:hover {
      background: ${interactive ? 'rgba(0, 0, 0, 0.5)' : thumbColor};
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div
        ref={scrollRef}
        className={`vhv-scrollbar overflow-auto ${className}`}
      >
        {children}
      </div>
    </>
  );
};

interface VHVSingleChildScrollViewProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal' | 'both';
  padding?: number | string;
  reverse?: boolean;
  className?: string;
}

export const VHVSingleChildScrollView: React.FC<VHVSingleChildScrollViewProps> = ({
  children,
  direction = 'vertical',
  padding,
  reverse = false,
  className = '',
}) => {
  const overflowClass = {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
    both: 'overflow-auto',
  }[direction];

  const style: React.CSSProperties = {
    padding: typeof padding === 'number' ? `${padding}px` : padding,
    flexDirection: reverse ? (direction === 'horizontal' ? 'row-reverse' : 'column-reverse') : undefined,
  };

  return (
    <div className={`${overflowClass} ${className}`} style={style}>
      {children}
    </div>
  );
};
