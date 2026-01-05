import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';

interface VHVReorderableListViewProps<T = any> {
  items: T[];
  itemBuilder: (item: T, index: number) => React.ReactNode;
  onReorder: (oldIndex: number, newIndex: number) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  buildDefaultDragHandles?: boolean;
  className?: string;
}

export function VHVReorderableListView<T = any>({
  items,
  itemBuilder,
  onReorder,
  header,
  footer,
  buildDefaultDragHandles = true,
  className = '',
}: VHVReorderableListViewProps<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className={className}>
      {header}
      
      <div className="space-y-1">
        {items.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
            onDragEnd={handleDragEnd}
            className={`
              flex items-center gap-2
              ${draggedIndex === index ? 'opacity-50' : ''}
              ${dragOverIndex === index ? 'border-t-2 border-blue-500' : ''}
              transition-opacity duration-150
            `}
          >
            {buildDefaultDragHandles && (
              <div className="cursor-grab active:cursor-grabbing p-2">
                <GripVertical size={20} className="text-gray-400" />
              </div>
            )}
            
            <div className="flex-1">
              {itemBuilder(item, index)}
            </div>
          </div>
        ))}
      </div>
      
      {footer}
    </div>
  );
}
