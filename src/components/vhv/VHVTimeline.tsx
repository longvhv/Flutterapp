import React from 'react';
import { Check, Circle } from 'lucide-react';

export interface VHVTimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  completed?: boolean;
}

interface VHVTimelineProps {
  items: VHVTimelineItem[];
  variant?: 'default' | 'outlined';
  position?: 'left' | 'right' | 'alternate';
  className?: string;
}

export const VHVTimeline: React.FC<VHVTimelineProps> = ({
  items,
  variant = 'default',
  position = 'left',
  className = '',
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-blue-600',
      border: 'border-blue-600',
      text: 'text-blue-600',
    },
    secondary: {
      bg: 'bg-purple-600',
      border: 'border-purple-600',
      text: 'text-purple-600',
    },
    success: {
      bg: 'bg-green-600',
      border: 'border-green-600',
      text: 'text-green-600',
    },
    warning: {
      bg: 'bg-yellow-600',
      border: 'border-yellow-600',
      text: 'text-yellow-600',
    },
    error: {
      bg: 'bg-red-600',
      border: 'border-red-600',
      text: 'text-red-600',
    },
  };

  return (
    <div className={`relative ${className}`}>
      {items.map((item, index) => {
        const color = item.color || 'primary';
        const isLast = index === items.length - 1;
        const isLeft = position === 'left' || (position === 'alternate' && index % 2 === 0);
        const isRight = position === 'right' || (position === 'alternate' && index % 2 === 1);

        return (
          <div
            key={item.id}
            className={`
              relative flex gap-6
              ${position === 'alternate' ? (isLeft ? 'flex-row' : 'flex-row-reverse') : ''}
              ${!isLast ? 'pb-8' : ''}
            `}
          >
            {/* Timeline Line */}
            {!isLast && (
              <div
                className={`
                  absolute top-8 w-0.5 h-full
                  ${item.completed ? colorClasses[color].bg : 'bg-gray-300 dark:bg-gray-700'}
                  ${position === 'alternate'
                    ? 'left-1/2 -translate-x-1/2'
                    : position === 'right'
                    ? 'right-5'
                    : 'left-5'
                  }
                `}
              />
            )}

            {/* Icon */}
            <div
              className={`
                relative flex-shrink-0 w-10 h-10 rounded-full
                flex items-center justify-center
                ${variant === 'outlined'
                  ? `border-2 ${colorClasses[color].border} bg-white dark:bg-gray-900`
                  : colorClasses[color].bg
                }
                ${position === 'alternate' ? 'order-2' : ''}
              `}
            >
              {item.completed ? (
                <Check size={20} className={variant === 'outlined' ? colorClasses[color].text : 'text-white'} />
              ) : item.icon ? (
                <div className={variant === 'outlined' ? colorClasses[color].text : 'text-white'}>
                  {item.icon}
                </div>
              ) : (
                <Circle size={12} className={variant === 'outlined' ? colorClasses[color].text : 'text-white'} />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 ${position === 'alternate' ? (isLeft ? 'text-right' : 'text-left') : ''}`}>
              {item.timestamp && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {item.timestamp}
                </div>
              )}
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h4>
              {item.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
