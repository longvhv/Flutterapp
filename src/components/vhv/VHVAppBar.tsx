import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';

interface VHVAppBarProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
  actions?: React.ReactNode[];
  variant?: 'default' | 'gradient' | 'transparent';
  className?: string;
}

export const VHVAppBar: React.FC<VHVAppBarProps> = ({
  title,
  showBackButton = false,
  onBackClick,
  showMenuButton = false,
  onMenuClick,
  actions = [],
  variant = 'default',
  className = '',
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    transparent: 'bg-transparent',
  };
  
  const textColor = variant === 'gradient' ? 'text-white' : 'text-gray-900 dark:text-white';
  
  return (
    <header className={`sticky top-0 z-50 ${variantClasses[variant]} ${className}`}>
      <div className="flex items-center justify-between px-4 py-4">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${textColor}`}
            >
              <ArrowLeft size={24} />
            </button>
          )}
          
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${textColor}`}
            >
              <Menu size={24} />
            </button>
          )}
          
          <h1 className={`text-xl font-semibold ${textColor}`}>
            {title}
          </h1>
        </div>
        
        {/* Right side - Actions */}
        {actions.length > 0 && (
          <div className="flex items-center gap-2">
            {actions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
