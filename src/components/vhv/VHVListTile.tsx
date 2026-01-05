import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface VHVListTileProps {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  showArrow?: boolean;
  onClick?: () => void;
  divider?: boolean;
  className?: string;
}

export const VHVListTile: React.FC<VHVListTileProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  showArrow = false,
  onClick,
  divider = true,
  className = '',
}) => {
  const isClickable = onClick !== undefined;
  
  return (
    <motion.div
      onClick={onClick}
      className={`
        flex items-center gap-4 px-4 py-4 
        ${isClickable ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50' : ''}
        ${divider ? 'border-b border-gray-200 dark:border-gray-700' : ''}
        transition-colors
        ${className}
      `}
      whileTap={isClickable ? { scale: 0.98 } : {}}
    >
      {/* Leading */}
      {leading && (
        <div className="flex-shrink-0">
          {leading}
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Trailing */}
      {trailing && (
        <div className="flex-shrink-0">
          {trailing}
        </div>
      )}
      
      {/* Arrow */}
      {showArrow && (
        <div className="flex-shrink-0 text-gray-400">
          <ChevronRight size={20} />
        </div>
      )}
    </motion.div>
  );
};
