import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface VHVExpansionPanelItem {
  headerBuilder: (isExpanded: boolean) => React.ReactNode;
  body: React.ReactNode;
  isExpanded?: boolean;
  canTapOnHeader?: boolean;
}

interface VHVExpansionPanelListProps {
  children: VHVExpansionPanelItem[];
  expansionCallback?: (panelIndex: number, isExpanded: boolean) => void;
  expandedHeaderPadding?: string;
  elevation?: number;
  className?: string;
}

export const VHVExpansionPanelList: React.FC<VHVExpansionPanelListProps> = ({
  children,
  expansionCallback,
  expandedHeaderPadding = '16px',
  elevation = 2,
  className = '',
}) => {
  const [expandedPanels, setExpandedPanels] = useState<Set<number>>(
    new Set(children.map((item, idx) => item.isExpanded ? idx : -1).filter(idx => idx !== -1))
  );

  const toggle = (index: number) => {
    const newExpanded = new Set(expandedPanels);
    const isExpanded = newExpanded.has(index);
    
    if (isExpanded) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    
    setExpandedPanels(newExpanded);
    expansionCallback?.(index, !isExpanded);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {children.map((panel, index) => {
        const isExpanded = expandedPanels.has(index);
        const canTap = panel.canTapOnHeader !== false;

        return (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            style={{ boxShadow: `0 ${elevation}px ${elevation * 2}px rgba(0,0,0,0.1)` }}
          >
            <div
              onClick={() => canTap && toggle(index)}
              style={{ padding: isExpanded ? expandedHeaderPadding : '16px' }}
              className={`flex items-center justify-between ${canTap ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''} transition-colors`}
            >
              <div className="flex-1">{panel.headerBuilder(isExpanded)}</div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4">{panel.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
