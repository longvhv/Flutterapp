import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

export interface VHVNavigationRailItem {
  id: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  disabled?: boolean;
}

interface VHVNavigationRailProps {
  items: VHVNavigationRailItem[];
  value: string;
  onChange: (id: string) => void;
  position?: 'left' | 'right';
  expanded?: boolean;
  showLabels?: 'always' | 'selected' | 'never';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const VHVNavigationRail: React.FC<VHVNavigationRailProps> = ({
  items,
  value,
  onChange,
  position = 'left',
  expanded = false,
  showLabels = 'selected',
  header,
  footer,
  className = '',
}) => {
  return (
    <motion.div
      animate={{ width: expanded ? 256 : 80 }}
      className={`
        h-screen bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        flex flex-col py-4
        ${position === 'right' ? 'border-r-0 border-l' : ''}
        ${className}
      `}
    >
      {/* Header */}
      {header && (
        <div className="px-4 mb-4">
          {header}
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2 px-3">
        {items.map((item) => {
          const isActive = value === item.id;
          const Icon = item.icon;
          const showLabel = showLabels === 'always' || (showLabels === 'selected' && isActive);

          return (
            <button
              key={item.id}
              onClick={() => !item.disabled && onChange(item.id)}
              disabled={item.disabled}
              className={`
                relative w-full rounded-xl transition-all duration-200
                ${expanded ? 'px-4 py-3' : 'px-3 py-3'}
                flex items-center gap-3
                ${item.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              {/* Indicator */}
              {isActive && !expanded && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`
                    absolute ${position === 'left' ? 'left-0' : 'right-0'}
                    top-1/2 -translate-y-1/2
                    w-1 h-8 bg-blue-600 rounded-r-full
                  `}
                />
              )}

              {/* Icon */}
              <div className={`relative flex-shrink-0 ${expanded ? '' : 'mx-auto'}`}>
                <Icon size={24} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              {(expanded || showLabel) && (
                <motion.span
                  initial={expanded ? {} : { opacity: 0, width: 0 }}
                  animate={expanded ? {} : { opacity: 1, width: 'auto' }}
                  className={`
                    text-sm font-medium truncate
                    ${expanded ? 'flex-1 text-left' : 'absolute left-20 bg-gray-900 dark:bg-gray-700 text-white px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap'}
                  `}
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="px-4 mt-4">
          {footer}
        </div>
      )}
    </motion.div>
  );
};
