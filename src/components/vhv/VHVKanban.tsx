import React, { useState } from 'react';
import { MoreVertical, Plus } from 'lucide-react';

export interface VHVKanbanCard {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  assignee?: string;
}

export interface VHVKanbanColumn {
  id: string;
  title: string;
  cards: VHVKanbanCard[];
  color?: string;
}

interface VHVKanbanProps {
  columns: VHVKanbanColumn[];
  onChange?: (columns: VHVKanbanColumn[]) => void;
  onCardClick?: (card: VHVKanbanCard) => void;
  onAddCard?: (columnId: string) => void;
  className?: string;
}

export const VHVKanban: React.FC<VHVKanbanProps> = ({
  columns,
  onChange,
  onCardClick,
  onAddCard,
  className = '',
}) => {
  const [draggedCard, setDraggedCard] = useState<{ card: VHVKanbanCard; fromColumn: string } | null>(null);

  const handleDragStart = (card: VHVKanbanCard, columnId: string) => {
    setDraggedCard({ card, fromColumn: columnId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toColumnId: string) => {
    if (!draggedCard) return;

    const newColumns = columns.map((col) => {
      if (col.id === draggedCard.fromColumn) {
        return {
          ...col,
          cards: col.cards.filter((c) => c.id !== draggedCard.card.id),
        };
      }
      if (col.id === toColumnId) {
        return {
          ...col,
          cards: [...col.cards, draggedCard.card],
        };
      }
      return col;
    });

    onChange?.(newColumns);
    setDraggedCard(null);
  };

  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {columns.map((column) => (
        <div
          key={column.id}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(column.id)}
          className="flex-shrink-0 w-80 bg-gray-100 dark:bg-gray-800 rounded-xl p-4"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {column.color && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
              )}
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {column.title}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                {column.cards.length}
              </span>
            </div>
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
              <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Cards */}
          <div className="space-y-3 min-h-[200px]">
            {column.cards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(card, column.id)}
                onClick={() => onCardClick?.(card)}
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {card.title}
                </h4>
                {card.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {card.description}
                  </p>
                )}
                {card.tags && card.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {card.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {card.assignee && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {card.assignee.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {card.assignee}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Card Button */}
          {onAddCard && (
            <button
              onClick={() => onAddCard(column.id)}
              className="w-full mt-3 px-4 py-2 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <Plus size={16} />
              <span className="text-sm font-medium">Add Card</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
