import React, { useState, useRef, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VHVChipInputProps {
  value?: string[];
  onChange?: (chips: string[]) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  maxChips?: number;
  allowDuplicates?: boolean;
  variant?: 'outlined' | 'filled';
  chipColor?: 'primary' | 'secondary' | 'success';
  className?: string;
}

export const VHVChipInput: React.FC<VHVChipInputProps> = ({
  value = [],
  onChange,
  placeholder = 'Type and press Enter...',
  label,
  disabled = false,
  maxChips,
  allowDuplicates = false,
  variant = 'outlined',
  chipColor = 'primary',
  className = '',
}) => {
  const [chips, setChips] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const colorClasses = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-purple-600 text-white',
    success: 'bg-green-600 text-white',
  };

  const addChip = (chip: string) => {
    const trimmedChip = chip.trim();
    if (!trimmedChip) return;

    if (maxChips && chips.length >= maxChips) return;
    if (!allowDuplicates && chips.includes(trimmedChip)) return;

    const newChips = [...chips, trimmedChip];
    setChips(newChips);
    onChange?.(newChips);
    setInputValue('');
  };

  const removeChip = (index: number) => {
    const newChips = chips.filter((_, i) => i !== index);
    setChips(newChips);
    onChange?.(newChips);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addChip(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
      removeChip(chips.length - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const pastedChips = pastedText
      .split(/[,;\n]/)
      .map((chip) => chip.trim())
      .filter((chip) => chip);

    pastedChips.forEach((chip) => addChip(chip));
  };

  const variantClasses = {
    outlined: `border-2 ${isFocused ? 'border-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/30' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-900`,
    filled: `bg-gray-100 dark:bg-gray-800 border-0 ${isFocused ? 'ring-2 ring-blue-600' : ''}`,
  };

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.focus()}
        className={`
          flex flex-wrap items-center gap-2 px-3 py-2 rounded-xl
          transition-all duration-200 min-h-[48px]
          ${variantClasses[variant]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
        `}
      >
        {/* Chips */}
        <AnimatePresence>
          {chips.map((chip, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                text-sm font-medium
                ${colorClasses[chipColor]}
              `}
            >
              <span>{chip}</span>
              {!disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChip(index);
                  }}
                  className="p-0.5 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled || (maxChips ? chips.length >= maxChips : false)}
          placeholder={chips.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>

      {/* Helper Text */}
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Press Enter to add, Backspace to remove</span>
        {maxChips && (
          <span>
            {chips.length} / {maxChips}
          </span>
        )}
      </div>
    </div>
  );
};
