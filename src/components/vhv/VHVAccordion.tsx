import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export interface VHVAccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface VHVAccordionProps {
  items: VHVAccordionItem[];
  defaultExpandedIds?: string[];
  allowMultiple?: boolean;
  variant?: 'default' | 'bordered' | 'separated';
  onChange?: (expandedIds: string[]) => void;
  className?: string;
}

export const VHVAccordion: React.FC<VHVAccordionProps> = ({
  items,
  defaultExpandedIds = [],
  allowMultiple = false,
  variant = 'default',
  onChange,
  className = '',
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);

  const toggleItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item?.disabled) return;

    let newExpandedIds: string[];
    
    if (allowMultiple) {
      newExpandedIds = expandedIds.includes(id)
        ? expandedIds.filter((expandedId) => expandedId !== id)
        : [...expandedIds, id];
    } else {
      newExpandedIds = expandedIds.includes(id) ? [] : [id];
    }

    setExpandedIds(newExpandedIds);
    onChange?.(newExpandedIds);
  };

  const variantClasses = {
    default: 'border-b border-gray-200 dark:border-gray-700 last:border-b-0',
    bordered: 'border border-gray-200 dark:border-gray-700 rounded-xl mb-2',
    separated: 'bg-white dark:bg-gray-800 rounded-xl shadow-md mb-3',
  };

  return (
    <div className={className}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div key={item.id} className={variantClasses[variant]}>
            <button
              onClick={() => toggleItem(item.id)}
              disabled={item.disabled}
              className={`
                w-full px-6 py-4 flex items-center justify-between
                text-left transition-colors
                ${item.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
                ${variant === 'bordered' || variant === 'separated' ? 'rounded-xl' : ''}
              `}
            >
              <div className="flex items-center gap-3 flex-1">
                {item.icon && (
                  <span className="text-blue-600 dark:text-blue-400">{item.icon}</span>
                )}
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={20} className="text-gray-500 dark:text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-400">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
