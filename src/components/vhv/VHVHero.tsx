import React from 'react';

interface VHVHeroProps {
  tag: string;
  child: React.ReactNode;
  createRectTween?: (begin: DOMRect, end: DOMRect) => void;
  flightShuttleBuilder?: () => React.ReactNode;
  placeholderBuilder?: () => React.ReactNode;
  transitionOnUserGestures?: boolean;
  className?: string;
}

export const VHVHero: React.FC<VHVHeroProps> = ({
  tag,
  child,
  createRectTween,
  flightShuttleBuilder,
  placeholderBuilder,
  transitionOnUserGestures = false,
  className = '',
}) => {
  // Hero animation in web is typically handled by View Transitions API
  // For now, we use a data attribute for identification
  return (
    <div
      data-hero-tag={tag}
      className={`transition-all duration-300 ${className}`}
      style={{
        viewTransitionName: tag,
      }}
    >
      {child}
    </div>
  );
};
