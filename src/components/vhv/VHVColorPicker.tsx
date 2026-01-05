import React, { useState } from 'react';
import { Check } from 'lucide-react';

const PRESET_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
  '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
  '#8B5CF6', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#64748B',
];

interface VHVColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presetColors?: string[];
  showInput?: boolean;
  showPresets?: boolean;
  label?: string;
  className?: string;
}

export const VHVColorPicker: React.FC<VHVColorPickerProps> = ({
  value = '#3B82F6',
  onChange,
  presetColors = PRESET_COLORS,
  showInput = true,
  showPresets = true,
  label,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleColorChange = (newColor: string) => {
    setLocalValue(newColor);
    onChange?.(newColor);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="space-y-4">
        {/* Color Display & Input */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-sm flex-shrink-0"
            style={{ backgroundColor: localValue }}
          />

          {showInput && (
            <div className="flex-1">
              <input
                type="text"
                value={localValue}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-blue-600 transition-colors"
                placeholder="#000000"
              />
            </div>
          )}

          {/* Native Color Picker */}
          <label className="relative flex-shrink-0">
            <input
              type="color"
              value={localValue}
              onChange={(e) => handleColorChange(e.target.value)}
              className="sr-only"
            />
            <div className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors overflow-hidden">
              <div
                className="w-full h-full"
                style={{ background: 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, white 25%, white 75%, #ccc 75%, #ccc)', backgroundSize: '8px 8px', backgroundPosition: '0 0, 4px 4px' }}
              >
                <div className="w-full h-full" style={{ backgroundColor: localValue }} />
              </div>
            </div>
          </label>
        </div>

        {/* Preset Colors */}
        {showPresets && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Preset Colors</p>
            <div className="grid grid-cols-9 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`
                    relative w-full aspect-square rounded-lg
                    hover:scale-110 transition-transform
                    ${localValue.toUpperCase() === color.toUpperCase() ? 'ring-2 ring-blue-600 ring-offset-2' : ''}
                  `}
                  style={{ backgroundColor: color }}
                >
                  {localValue.toUpperCase() === color.toUpperCase() && (
                    <Check size={16} className="absolute inset-0 m-auto text-white drop-shadow-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
