import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

export interface VHVBottomNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface VHVBottomNavProps {
  items: VHVBottomNavItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'default' | 'gradient';
}

export const VHVBottomNav: React.FC<VHVBottomNavProps> = ({
  items,
  activeId,
  onChange,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
  };
  
  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 ${variantClasses[variant]}`}>
      <div className="flex items-center justify-around px-2 py-3 max-w-screen-lg mx-auto">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
                ${variant === 'gradient' 
                  ? isActive 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/70 hover:text-white'
                  : isActive 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
