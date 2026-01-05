import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface VHVSearchSuggestion {
  id: string;
  label: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

interface VHVSearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  suggestions?: VHVSearchSuggestion[];
  onSuggestionClick?: (suggestion: VHVSearchSuggestion) => void;
  loading?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  autoFocus?: boolean;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
  className?: string;
}

export const VHVSearchBar: React.FC<VHVSearchBarProps> = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  suggestions = [],
  onSuggestionClick,
  loading = false,
  disabled = false,
  clearable = true,
  autoFocus = false,
  fullWidth = false,
  variant = 'outlined',
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (newValue: string) => {
    onChange?.(newValue);
    setShowSuggestions(newValue.length > 0 && suggestions.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    onChange?.('');
    inputRef.current?.focus();
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: VHVSearchSuggestion) => {
    onSuggestionClick?.(suggestion);
    setShowSuggestions(false);
  };

  const variantClasses = {
    outlined: `border-2 ${isFocused ? 'border-blue-600' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800`,
    filled: `bg-gray-100 dark:bg-gray-700 border-0 ${isFocused ? 'ring-2 ring-blue-600' : ''}`,
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''} ${className}`} ref={containerRef}>
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl
          transition-all duration-200
          ${variantClasses[variant]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <Search size={20} className="text-gray-400 flex-shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (value && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        {loading && <Loader size={20} className="text-blue-600 animate-spin flex-shrink-0" />}

        {clearable && value && !loading && (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors flex-shrink-0"
          >
            <X size={16} className="text-gray-400" />
          </button>
        )}
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-80 overflow-auto"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {suggestion.icon && (
                  <div className="flex-shrink-0 text-gray-400">{suggestion.icon}</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {suggestion.label}
                  </div>
                  {suggestion.subtitle && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {suggestion.subtitle}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
