import React from 'react';
import { LucideIcon } from 'lucide-react';

interface VHVBottomAppBarProps {
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
  fabAction?: {
    icon: LucideIcon;
    onClick: () => void;
    label?: string;
  };
  fabPosition?: 'center' | 'end';
  variant?: 'default' | 'notched';
  className?: string;
}

export const VHVBottomAppBar: React.FC<VHVBottomAppBarProps> = ({
  leftActions,
  rightActions,
  fabAction,
  fabPosition = 'end',
  variant = 'default',
  className = '',
}) => {
  const FabIcon = fabAction?.icon;

  return (
    <div className={`relative ${className}`}>
      {/* Bottom App Bar */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 z-40
          bg-white dark:bg-gray-900
          border-t border-gray-200 dark:border-gray-800
          ${variant === 'notched' && fabAction ? 'px-4 pt-4 pb-6' : 'px-4 py-4'}
        `}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Actions */}
          <div className="flex items-center gap-2">
            {leftActions}
          </div>

          {/* Center Spacer for FAB */}
          {fabPosition === 'center' && fabAction && variant === 'notched' && (
            <div className="w-20" />
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {rightActions}
          </div>
        </div>

        {/* Notch for Center FAB */}
        {variant === 'notched' && fabAction && fabPosition === 'center' && (
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-20 h-6 bg-white dark:bg-gray-900">
            <div className="absolute inset-0">
              <svg
                viewBox="0 0 80 24"
                className="w-full h-full fill-white dark:fill-gray-900"
              >
                <path d="M 0,24 L 0,12 Q 0,0 12,0 L 28,0 Q 32,0 34,2 Q 38,6 42,6 Q 46,6 50,2 Q 52,0 56,0 L 68,0 Q 80,0 80,12 L 80,24 Z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* FAB */}
      {fabAction && FabIcon && (
        <button
          onClick={fabAction.onClick}
          className={`
            fixed z-50 w-14 h-14 rounded-full
            bg-blue-600 hover:bg-blue-700 text-white
            shadow-2xl flex items-center justify-center
            transition-all duration-200 hover:scale-110
            ${fabPosition === 'center'
              ? 'left-1/2 -translate-x-1/2 -bottom-2'
              : 'right-6 bottom-20'
            }
          `}
          title={fabAction.label}
        >
          <FabIcon size={24} />
        </button>
      )}
    </div>
  );
};
