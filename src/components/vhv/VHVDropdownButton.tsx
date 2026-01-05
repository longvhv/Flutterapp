import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface VHVDropdownItem<T = any> {
  value: T;
  child: React.ReactNode;
}

interface VHVDropdownButtonProps<T = any> {
  items: VHVDropdownItem<T>[];
  value?: T;
  onChanged?: (value: T) => void;
  hint?: React.ReactNode;
  disabledHint?: React.ReactNode;
  elevation?: number;
  disabled?: boolean;
  className?: string;
}

export function VHVDropdownButton<T = any>({
  items,
  value,
  onChanged,
  hint,
  disabledHint,
  elevation = 8,
  disabled = false,
  className = '',
}: VHVDropdownButtonProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find(item => item.value === value);

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

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center justify-between gap-2 w-full
          px-4 py-2 rounded-lg border
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}
          transition-colors duration-200
        `}
      >
        <span>{disabled && disabledHint ? disabledHint : selectedItem?.child || hint || 'Select'}</span>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                onChanged?.(item.value);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${item.value === value ? 'bg-blue-50 dark:bg-blue-950 text-blue-600' : ''}
                transition-colors duration-150
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
