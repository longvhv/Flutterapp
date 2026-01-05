import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search } from 'lucide-react';

export interface VHVTransferItem {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

interface VHVTransferListProps {
  leftItems: VHVTransferItem[];
  rightItems: VHVTransferItem[];
  onChange?: (leftItems: VHVTransferItem[], rightItems: VHVTransferItem[]) => void;
  leftTitle?: string;
  rightTitle?: string;
  searchable?: boolean;
  showCounts?: boolean;
  className?: string;
}

export const VHVTransferList: React.FC<VHVTransferListProps> = ({
  leftItems,
  rightItems,
  onChange,
  leftTitle = 'Available',
  rightTitle = 'Selected',
  searchable = true,
  showCounts = true,
  className = '',
}) => {
  const [leftSelected, setLeftSelected] = useState<Set<string>>(new Set());
  const [rightSelected, setRightSelected] = useState<Set<string>>(new Set());
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');

  const filterItems = (items: VHVTransferItem[], search: string) => {
    if (!search) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredLeftItems = filterItems(leftItems, leftSearch);
  const filteredRightItems = filterItems(rightItems, rightSearch);

  const toggleLeftSelection = (id: string) => {
    const newSelected = new Set(leftSelected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setLeftSelected(newSelected);
  };

  const toggleRightSelection = (id: string) => {
    const newSelected = new Set(rightSelected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setRightSelected(newSelected);
  };

  const moveToRight = () => {
    const itemsToMove = leftItems.filter((item) => leftSelected.has(item.id));
    const newLeft = leftItems.filter((item) => !leftSelected.has(item.id));
    const newRight = [...rightItems, ...itemsToMove];
    onChange?.(newLeft, newRight);
    setLeftSelected(new Set());
  };

  const moveAllToRight = () => {
    onChange?.([], [...rightItems, ...leftItems]);
    setLeftSelected(new Set());
  };

  const moveToLeft = () => {
    const itemsToMove = rightItems.filter((item) => rightSelected.has(item.id));
    const newRight = rightItems.filter((item) => !rightSelected.has(item.id));
    const newLeft = [...leftItems, ...itemsToMove];
    onChange?.(newLeft, newRight);
    setRightSelected(new Set());
  };

  const moveAllToLeft = () => {
    onChange?.([...leftItems, ...rightItems], []);
    setRightSelected(new Set());
  };

  const ListPanel: React.FC<{
    items: VHVTransferItem[];
    selected: Set<string>;
    onToggle: (id: string) => void;
    title: string;
    search: string;
    onSearchChange: (value: string) => void;
  }> = ({ items, selected, onToggle, title, search, onSearchChange }) => (
    <div className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-300 dark:border-gray-600">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          {showCounts && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {items.length} items
            </span>
          )}
        </div>
        {searchable && (
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-600"
            />
          </div>
        )}
      </div>

      <div className="h-80 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
            No items
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              onClick={() => !item.disabled && onToggle(item.id)}
              disabled={item.disabled}
              className={`
                w-full px-4 py-3 text-left border-b border-gray-200 dark:border-gray-700 last:border-b-0
                transition-colors
                ${item.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : selected.has(item.id)
                  ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
            >
              {item.label}
            </button>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Left List */}
      <ListPanel
        items={filteredLeftItems}
        selected={leftSelected}
        onToggle={toggleLeftSelection}
        title={leftTitle}
        search={leftSearch}
        onSearchChange={setLeftSearch}
      />

      {/* Transfer Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={moveAllToRight}
          disabled={leftItems.length === 0}
          className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Move all to right"
        >
          <ChevronsRight size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={moveToRight}
          disabled={leftSelected.size === 0}
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Move selected to right"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
        <button
          onClick={moveToLeft}
          disabled={rightSelected.size === 0}
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Move selected to left"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button
          onClick={moveAllToLeft}
          disabled={rightItems.length === 0}
          className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Move all to left"
        >
          <ChevronsLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Right List */}
      <ListPanel
        items={filteredRightItems}
        selected={rightSelected}
        onToggle={toggleRightSelection}
        title={rightTitle}
        search={rightSearch}
        onSearchChange={setRightSearch}
      />
    </div>
  );
};
