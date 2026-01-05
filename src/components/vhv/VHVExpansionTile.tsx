import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VHVExpansionTileProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  onExpansionChanged?: (expanded: boolean) => void;
  backgroundColor?: string;
  collapsedBackgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  className?: string;
}

export const VHVExpansionTile: React.FC<VHVExpansionTileProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  children,
  initiallyExpanded = false,
  onExpansionChanged,
  backgroundColor,
  collapsedBackgroundColor,
  textColor,
  iconColor,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const toggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpansionChanged?.(newExpanded);
  };

  return (
    <div className={className}>
      <div
        onClick={toggle}
        style={{
          backgroundColor: isExpanded ? backgroundColor : collapsedBackgroundColor,
          color: textColor,
        }}
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {leading && <div className="flex-shrink-0">{leading}</div>}
        
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          {subtitle && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</div>
          )}
        </div>

        {trailing}
        
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: iconColor }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
