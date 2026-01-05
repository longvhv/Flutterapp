import React from 'react';

interface VHVChipGroupProps<T = any> {
  chips: { label: string; value: T; avatar?: React.ReactNode }[];
  selectedValues?: T[];
  onSelectionChanged?: (values: T[]) => void;
  multiSelect?: boolean;
  spacing?: number;
  alignment?: 'start' | 'center' | 'end';
  selectedColor?: string;
  unselectedColor?: string;
  className?: string;
}

export function VHVChipGroup<T = any>({
  chips,
  selectedValues = [],
  onSelectionChanged,
  multiSelect = false,
  spacing = 8,
  alignment = 'start',
  selectedColor = '#3B82F6',
  unselectedColor = '#E5E7EB',
  className = '',
}: VHVChipGroupProps<T>) {
  const handleChipClick = (value: T) => {
    if (!onSelectionChanged) return;

    if (multiSelect) {
      const isSelected = selectedValues.includes(value);
      const newValues = isSelected
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      onSelectionChanged(newValues);
    } else {
      const isSelected = selectedValues.includes(value);
      onSelectionChanged(isSelected ? [] : [value]);
    }
  };

  const alignmentMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  };

  return (
    <div
      className={`flex flex-wrap ${alignmentMap[alignment]} ${className}`}
      style={{ gap: `${spacing}px` }}
    >
      {chips.map((chip, index) => {
        const isSelected = selectedValues.includes(chip.value);
        
        return (
          <button
            key={index}
            onClick={() => handleChipClick(chip.value)}
            style={{
              backgroundColor: isSelected ? selectedColor : unselectedColor,
            }}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}
              hover:opacity-80
              transition-all duration-200
            `}
          >
            {chip.avatar && <span>{chip.avatar}</span>}
            <span className="text-sm font-medium">{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
}
