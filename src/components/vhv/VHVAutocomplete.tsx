import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface VHVAutocompleteOption {
  id: string;
  label: string;
  value: string;
  subtitle?: string;
  disabled?: boolean;
}

interface VHVAutocompleteProps {
  options: VHVAutocompleteOption[];
  value?: VHVAutocompleteOption | null;
  onChange?: (option: VHVAutocompleteOption | null) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
  loading?: boolean;
  freeSolo?: boolean; // Allow custom values
  className?: string;
}

export const VHVAutocomplete: React.FC<VHVAutocompleteProps> = ({
  options,
  value,
  onChange,
  onInputChange,
  placeholder = 'Search...',
  label,
  disabled = false,
  clearable = true,
  loading = false,
  freeSolo = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value?.label || '');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    setInputValue(value?.label || '');
  }, [value]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(0);
    onInputChange?.(newValue);

    if (!newValue) {
      onChange?.(null);
    }
  };

  const handleOptionSelect = (option: VHVAutocompleteOption) => {
    if (option.disabled) return;
    
    setInputValue(option.label);
    onChange?.(option);
    setIsOpen(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl border-2
          transition-all duration-200
          ${isOpen
            ? 'border-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/30'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
        `}
      >
        <Search size={20} className="text-gray-400 flex-shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        {clearable && inputValue && !disabled && (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
          >
            <X size={16} className="text-gray-400" />
          </button>
        )}
      </div>

      {/* Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-80 overflow-auto"
          >
            {loading ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <div className="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="mt-2">Loading...</p>
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                {freeSolo ? (
                  <p>Press Enter to add "{inputValue}"</p>
                ) : (
                  <p>No options found</p>
                )}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  disabled={option.disabled}
                  className={`
                    w-full px-4 py-3 text-left flex items-center gap-3
                    transition-colors
                    ${option.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : index === highlightedIndex
                      ? 'bg-blue-50 dark:bg-blue-950/30'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {option.label}
                    </div>
                    {option.subtitle && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {option.subtitle}
                      </div>
                    )}
                  </div>
                  {value?.id === option.id && (
                    <Check size={16} className="text-blue-600 flex-shrink-0" />
                  )}
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
