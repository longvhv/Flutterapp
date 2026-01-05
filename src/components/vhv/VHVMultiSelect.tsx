import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface VHVMultiSelectOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

interface VHVMultiSelectProps {
  options: VHVMultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  maxHeight?: number;
  showSelectedCount?: boolean;
  className?: string;
}

export const VHVMultiSelect: React.FC<VHVMultiSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = 'Select options...',
  label,
  disabled = false,
  searchable = false,
  clearable = true,
  maxHeight = 300,
  showSelectedCount = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = searchable && searchQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange?.(value.filter((v) => v !== optionValue));
    } else {
      onChange?.([...value, optionValue]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (showSelectedCount && value.length > 2) {
      return `${value.length} items selected`;
    }
    return selectedOptions.map((opt) => opt.label).join(', ');
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border-2 rounded-xl
          flex items-center justify-between gap-3
          transition-all duration-200
          ${isOpen
            ? 'border-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/30'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
        `}
      >
        <span className={`flex-1 text-left truncate ${value.length === 0 ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
          {getDisplayText()}
        </span>

        <div className="flex items-center gap-2 flex-shrink-0">
          {clearable && value.length > 0 && !disabled && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-blue-600"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Options List */}
            <div className="overflow-y-auto" style={{ maxHeight }}>
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  const isDisabled = option.disabled || false;

                  return (
                    <button
                      key={option.id}
                      onClick={() => !isDisabled && toggleOption(option.value)}
                      disabled={isDisabled}
                      className={`
                        w-full px-4 py-3 text-left flex items-center gap-3
                        transition-colors
                        ${isDisabled
                          ? 'opacity-50 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                        ${isSelected
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300 dark:border-gray-600'
                        }
                      `}>
                        {isSelected && <Check size={14} className="text-white" />}
                      </div>
                      <span className="flex-1 truncate">{option.label}</span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Actions */}
            {value.length > 0 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <button
                  onClick={() => onChange?.([])}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
