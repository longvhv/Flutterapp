import React from 'react';

export interface VHVBottomNavigationBarItem {
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  label: string;
  backgroundColor?: string;
  tooltip?: string;
}

interface VHVBottomNavigationBarProps {
  items: VHVBottomNavigationBarItem[];
  currentIndex: number;
  onTap: (index: number) => void;
  selectedItemColor?: string;
  unselectedItemColor?: string;
  backgroundColor?: string;
  elevation?: number;
  type?: 'fixed' | 'shifting';
  showSelectedLabels?: boolean;
  showUnselectedLabels?: boolean;
  iconSize?: number;
  className?: string;
}

export const VHVBottomNavigationBar: React.FC<VHVBottomNavigationBarProps> = ({
  items,
  currentIndex,
  onTap,
  selectedItemColor = '#3B82F6',
  unselectedItemColor = '#9CA3AF',
  backgroundColor = '#FFFFFF',
  elevation = 8,
  type = 'fixed',
  showSelectedLabels = true,
  showUnselectedLabels = true,
  iconSize = 24,
  className = '',
}) => {
  return (
    <nav
      style={{
        backgroundColor,
        boxShadow: `0 -${elevation}px ${elevation * 2}px rgba(0,0,0,0.1)`,
      }}
      className={`fixed bottom-0 left-0 right-0 z-50 dark:bg-gray-900 ${className}`}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item, index) => {
          const isSelected = index === currentIndex;
          const showLabel = isSelected ? showSelectedLabels : showUnselectedLabels;

          return (
            <button
              key={index}
              onClick={() => onTap(index)}
              title={item.tooltip}
              style={{
                color: isSelected ? selectedItemColor : unselectedItemColor,
                backgroundColor: type === 'shifting' && isSelected ? item.backgroundColor : undefined,
              }}
              className={`
                flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg
                transition-all duration-200
                ${type === 'fixed' ? 'flex-1' : ''}
                hover:bg-gray-100 dark:hover:bg-gray-800
              `}
            >
              <div style={{ width: iconSize, height: iconSize }}>
                {isSelected && item.activeIcon ? item.activeIcon : item.icon}
              </div>
              
              {showLabel && (
                <span className="text-xs font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
