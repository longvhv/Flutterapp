import React from 'react';

export interface VHVTab {
  text?: string;
  icon?: React.ReactNode;
  child?: React.ReactNode;
}

interface VHVTabBarProps {
  tabs: VHVTab[];
  currentIndex: number;
  onTap: (index: number) => void;
  indicatorColor?: string;
  labelColor?: string;
  unselectedLabelColor?: string;
  indicatorWeight?: number;
  isScrollable?: boolean;
  className?: string;
}

export const VHVTabBar: React.FC<VHVTabBarProps> = ({
  tabs,
  currentIndex,
  onTap,
  indicatorColor = '#3B82F6',
  labelColor = '#3B82F6',
  unselectedLabelColor = '#6B7280',
  indicatorWeight = 2,
  isScrollable = false,
  className = '',
}) => {
  return (
    <div className={`relative border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className={`flex ${isScrollable ? 'overflow-x-auto' : 'justify-around'} gap-1`}>
        {tabs.map((tab, index) => {
          const isActive = index === currentIndex;
          
          return (
            <button
              key={index}
              onClick={() => onTap(index)}
              style={{
                color: isActive ? labelColor : unselectedLabelColor,
              }}
              className={`
                relative px-4 py-3 font-medium text-sm whitespace-nowrap
                transition-colors duration-200
                hover:bg-gray-50 dark:hover:bg-gray-800
                ${isScrollable ? 'flex-shrink-0' : 'flex-1'}
              `}
            >
              <div className="flex items-center justify-center gap-2">
                {tab.icon}
                {tab.text || tab.child}
              </div>
              
              {isActive && (
                <div
                  style={{
                    backgroundColor: indicatorColor,
                    height: `${indicatorWeight}px`,
                  }}
                  className="absolute bottom-0 left-0 right-0"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
