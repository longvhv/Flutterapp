import React, { useState, useRef, useEffect } from 'react';

export interface VHVPopupMenuItem<T = any> {
  value: T;
  child: React.ReactNode;
  enabled?: boolean;
}

interface VHVPopupMenuButtonProps<T = any> {
  itemBuilder: () => VHVPopupMenuItem<T>[];
  onSelected?: (value: T) => void;
  icon?: React.ReactNode;
  child?: React.ReactNode;
  offset?: { x: number; y: number };
  elevation?: number;
  enabled?: boolean;
  className?: string;
}

export function VHVPopupMenuButton<T = any>({
  itemBuilder,
  onSelected,
  icon,
  child,
  offset = { x: 0, y: 0 },
  elevation = 8,
  enabled = true,
  className = '',
}: VHVPopupMenuButtonProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const items = itemBuilder();

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        onClick={() => enabled && setIsOpen(!isOpen)}
        disabled={!enabled}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {child || icon}
      </button>

      {isOpen && (
        <div
          style={{
            left: `${offset.x}px`,
            top: `${offset.y}px`,
          }}
          className="absolute z-50 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[200px]"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.enabled !== false) {
                  onSelected?.(item.value);
                  setIsOpen(false);
                }
              }}
              disabled={item.enabled === false}
              className={`
                w-full text-left px-4 py-2
                hover:bg-gray-100 dark:hover:bg-gray-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-150
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === items.length - 1 ? 'rounded-b-lg' : ''}
              `}
            >
              {item.child}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
