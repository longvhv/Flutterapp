import React from 'react';
import * as LucideIcons from 'lucide-react';

interface VHVIconProps {
  icon: keyof typeof LucideIcons | React.ComponentType<any>;
  size?: number;
  color?: string;
  semanticLabel?: string;
  className?: string;
}

export const VHVIcon: React.FC<VHVIconProps> = ({
  icon,
  size = 24,
  color,
  semanticLabel,
  className = '',
}) => {
  const style: React.CSSProperties = {
    color,
    width: size,
    height: size,
  };

  // If icon is a string, get from Lucide
  if (typeof icon === 'string') {
    const IconComponent = LucideIcons[icon as keyof typeof LucideIcons] as any;
    
    if (!IconComponent) {
      console.warn(`Icon "${icon}" not found in lucide-react`);
      return null;
    }

    return (
      <IconComponent
        size={size}
        style={style}
        className={className}
        aria-label={semanticLabel}
      />
    );
  }

  // If icon is a component
  const IconComponent = icon;
  return (
    <IconComponent
      size={size}
      style={style}
      className={className}
      aria-label={semanticLabel}
    />
  );
};
