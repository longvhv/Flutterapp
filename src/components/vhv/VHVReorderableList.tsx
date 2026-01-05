import React, { useState } from 'react';
import { motion, Reorder } from 'motion/react';
import { GripVertical } from 'lucide-react';

export interface VHVReorderableItem {
  id: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface VHVReorderableListProps {
  items: VHVReorderableItem[];
  onReorder: (items: VHVReorderableItem[]) => void;
  showHandle?: boolean;
  gap?: number;
  className?: string;
}

export const VHVReorderableList: React.FC<VHVReorderableListProps> = ({
  items,
  onReorder,
  showHandle = true,
  gap = 2,
  className = '',
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={onReorder}
      className={`space-y-${gap} ${className}`}
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item}
          onDragStart={() => setDraggedItem(item.id)}
          onDragEnd={() => setDraggedItem(null)}
          dragListener={!item.disabled}
          className={`
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
            ${draggedItem === item.id ? 'opacity-50 scale-105' : ''}
          `}
        >
          <motion.div
            whileDrag={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            className={`
              flex items-center gap-3 p-4 bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 rounded-xl
              transition-all duration-200
              ${!item.disabled ? 'hover:shadow-md' : ''}
            `}
          >
            {showHandle && !item.disabled && (
              <GripVertical size={20} className="text-gray-400 flex-shrink-0" />
            )}
            <div className="flex-1">
              {item.content}
            </div>
          </motion.div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
