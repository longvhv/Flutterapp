import React, { useState } from 'react';
import { motion } from 'motion/react';

export interface VHVTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  content: React.ReactNode;
}

interface VHVTabsProps {
  tabs: VHVTab[];
  defaultActiveId?: string;
  variant?: 'default' | 'pills' | 'underline';
  fullWidth?: boolean;
  onChange?: (id: string) => void;
  className?: string;
}

export const VHVTabs: React.FC<VHVTabsProps> = ({
  tabs,
  defaultActiveId,
  variant = 'default',
  fullWidth = false,
  onChange,
  className = '',
}) => {
  const [activeId, setActiveId] = useState(defaultActiveId || tabs[0]?.id);

  const handleTabChange = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  const activeTab = tabs.find((tab) => tab.id === activeId);

  const variantClasses = {
    default: {
      container: 'border-b border-gray-200 dark:border-gray-700',
      tab: 'px-6 py-3 border-b-2 transition-colors',
      active: 'border-blue-600 text-blue-600 dark:text-blue-400',
      inactive: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
    },
    pills: {
      container: 'bg-gray-100 dark:bg-gray-800 p-1 rounded-xl',
      tab: 'px-6 py-2 rounded-lg transition-all relative',
      active: 'text-white',
      inactive: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
    },
    underline: {
      container: 'relative',
      tab: 'px-6 py-3 transition-colors relative',
      active: 'text-blue-600 dark:text-blue-400',
      inactive: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
    },
  };

  return (
    <div className={className}>
      {/* Tabs */}
      <div className={`flex ${fullWidth ? 'w-full' : ''} ${variantClasses[variant].container}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                ${variantClasses[variant].tab}
                ${isActive ? variantClasses[variant].active : variantClasses[variant].inactive}
                ${fullWidth ? 'flex-1' : ''}
                flex items-center justify-center gap-2 font-medium text-sm
              `}
            >
              {variant === 'pills' && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600 rounded-lg"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {variant === 'underline' && (
        <motion.div
          className="h-0.5 bg-blue-600"
          layoutId="underline"
          transition={{ type: 'spring', duration: 0.5 }}
          style={{
            width: `${100 / tabs.length}%`,
            marginLeft: `${(tabs.findIndex((t) => t.id === activeId) * 100) / tabs.length}%`,
          }}
        />
      )}

      {/* Content */}
      <div className="mt-6">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab?.content}
        </motion.div>
      </div>
    </div>
  );
};
