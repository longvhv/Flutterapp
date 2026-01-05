import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface VHVRangeSliderProps {
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValues?: boolean;
  color?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  marks?: { value: number; label: string }[];
  className?: string;
}

export const VHVRangeSlider: React.FC<VHVRangeSliderProps> = ({
  value = [0, 100],
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValues = false,
  color = 'primary',
  size = 'medium',
  marks,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [minValue, maxValue] = value;
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
  };

  const thumbSizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-purple-600',
    success: 'bg-green-600',
  };

  const updateValue = (clientX: number, thumb: 'min' | 'max') => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const rawValue = min + (percent / 100) * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    if (thumb === 'min') {
      onChange?.([Math.min(clampedValue, maxValue), maxValue]);
    } else {
      onChange?.([minValue, Math.max(clampedValue, minValue)]);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, thumb: 'min' | 'max') => {
    if (disabled) return;
    setIsDragging(thumb);
    updateValue(e.clientX, thumb);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled) return;
    updateValue(e.clientX, isDragging);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, minValue, maxValue]);

  return (
    <div className={`relative w-full ${className}`}>
      {showValues && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {minValue}
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {maxValue}
          </span>
        </div>
      )}

      <div
        ref={sliderRef}
        className={`relative w-full ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-full ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {/* Active Range */}
        <motion.div
          className={`absolute top-0 h-full ${colorClasses[color]} rounded-full`}
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Min Thumb */}
        <motion.div
          onMouseDown={(e) => handleMouseDown(e, 'min')}
          className={`
            absolute top-1/2 -translate-y-1/2
            ${thumbSizeClasses[size]}
            ${colorClasses[color]}
            rounded-full shadow-lg cursor-grab active:cursor-grabbing
            ${isDragging === 'min' ? 'scale-125' : 'scale-100'}
            ${disabled ? 'cursor-not-allowed' : 'hover:scale-110'}
            transition-transform
          `}
          style={{ left: `${minPercent}%`, marginLeft: '-0.5rem' }}
          whileTap={!disabled ? { scale: 1.25 } : {}}
        />

        {/* Max Thumb */}
        <motion.div
          onMouseDown={(e) => handleMouseDown(e, 'max')}
          className={`
            absolute top-1/2 -translate-y-1/2
            ${thumbSizeClasses[size]}
            ${colorClasses[color]}
            rounded-full shadow-lg cursor-grab active:cursor-grabbing
            ${isDragging === 'max' ? 'scale-125' : 'scale-100'}
            ${disabled ? 'cursor-not-allowed' : 'hover:scale-110'}
            transition-transform
          `}
          style={{ left: `${maxPercent}%`, marginLeft: '-0.5rem' }}
          whileTap={!disabled ? { scale: 1.25 } : {}}
        />

        {/* Marks */}
        {marks && (
          <div className="absolute inset-0">
            {marks.map((mark) => {
              const markPercent = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className="absolute top-full pt-2"
                  style={{ left: `${markPercent}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-0.5 h-2 bg-gray-400 dark:bg-gray-600 mx-auto" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap mt-1 block">
                    {mark.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
