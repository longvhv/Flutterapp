import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight } from 'lucide-react';

export interface VHVMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
  checked?: boolean;
  children?: VHVMenuItem[];
}

interface VHVMenuProps {
  items: VHVMenuItem[];
  trigger: React.ReactNode;
  onItemClick?: (id: string) => void;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  closeOnClick?: boolean;
  className?: string;
}

export const VHVMenu: React.FC<VHVMenuProps> = ({
  items,
  trigger,
  onItemClick,
  position = 'bottom-left',
  closeOnClick = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: VHVMenuItem) => {
    if (item.disabled) return;
    
    onItemClick?.(item.id);
    
    if (closeOnClick && !item.children) {
      setIsOpen(false);
    }
  };

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-50 min-w-[200px]
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-xl shadow-xl
              py-2
              ${positionClasses[position]}
            `}
          >
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                {item.divider ? (
                  <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                ) : (
                  <VHVMenuItemComponent
                    item={item}
                    onClick={handleItemClick}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const VHVMenuItemComponent: React.FC<{
  item: VHVMenuItem;
  onClick: (item: VHVMenuItem) => void;
}> = ({ item, onClick }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => item.children && setShowSubmenu(true)}
      onMouseLeave={() => item.children && setShowSubmenu(false)}
    >
      <button
        onClick={() => onClick(item)}
        disabled={item.disabled}
        className={`
          w-full px-4 py-2.5 text-left
          flex items-center gap-3
          transition-colors
          ${item.disabled
            ? 'opacity-50 cursor-not-allowed'
            : item.danger
            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20'
            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
          }
        `}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {item.checked && <Check size={16} className="flex-shrink-0" />}
        {item.children && <ChevronRight size={16} className="flex-shrink-0" />}
      </button>

      {item.children && showSubmenu && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-full top-0 ml-2 min-w-[200px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2"
        >
          {item.children.map((child) => (
            <VHVMenuItemComponent key={child.id} item={child} onClick={onClick} />
          ))}
        </motion.div>
      )}
    </div>
  );
};
