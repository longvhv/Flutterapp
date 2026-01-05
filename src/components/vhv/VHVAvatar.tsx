import React from 'react';
import { User } from 'lucide-react';

export type VHVAvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
export type VHVAvatarVariant = 'circular' | 'rounded' | 'square';

interface VHVAvatarProps {
  src?: string;
  alt?: string;
  size?: VHVAvatarSize;
  variant?: VHVAvatarVariant;
  fallbackText?: string;
  color?: string;
  border?: boolean;
  className?: string;
}

export const VHVAvatar: React.FC<VHVAvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'medium',
  variant = 'circular',
  fallbackText,
  color = 'bg-blue-600',
  border = false,
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-base',
    large: 'w-16 h-16 text-xl',
    xlarge: 'w-24 h-24 text-2xl',
  };
  
  const variantClasses = {
    circular: 'rounded-full',
    rounded: 'rounded-xl',
    square: 'rounded-md',
  };
  
  const borderClass = border ? 'ring-2 ring-white dark:ring-gray-800 ring-offset-2' : '';
  
  const getInitials = () => {
    if (!fallbackText) return '';
    const words = fallbackText.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return fallbackText.substring(0, 2).toUpperCase();
  };
  
  return (
    <div
      className={`
        flex items-center justify-center overflow-hidden flex-shrink-0
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${borderClass}
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : fallbackText ? (
        <div className={`w-full h-full flex items-center justify-center ${color} text-white font-semibold`}>
          {getInitials()}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
          <User size={size === 'small' ? 16 : size === 'medium' ? 24 : size === 'large' ? 32 : 48} />
        </div>
      )}
    </div>
  );
};
