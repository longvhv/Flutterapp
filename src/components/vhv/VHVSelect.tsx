import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

export interface VHVSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface VHVSelectProps {
  options: VHVSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  fullWidth?: boolean;
  className?: string;
}

export const VHVSelect: React.FC<VHVSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  error,
  fullWidth = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`} ref={containerRef}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 text-left
            bg-white dark:bg-gray-800
            border-2 rounded-xl
            flex items-center justify-between
            transition-all
            ${error
              ? 'border-red-500 focus:border-red-600'
              : isOpen
              ? 'border-blue-600'
              : 'border-gray-300 dark:border-gray-600'
            }
            ${disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer hover:border-gray-400 dark:hover:border-gray-500'
            }
          `}
        >
          <span className={selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-auto"
            >
              {options.map((option) => {
                const isSelected = option.value === value;
                const isDisabled = option.disabled || false;

                return (
                  <button
                    key={option.value}
                    onClick={() => !isDisabled && handleSelect(option.value)}
                    disabled={isDisabled}
                    className={`
                      w-full px-4 py-3 text-left flex items-center justify-between
                      transition-colors
                      ${isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={16} />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
