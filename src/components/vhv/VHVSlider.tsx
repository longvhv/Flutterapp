import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface VHVSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  marks?: { value: number; label: string }[];
  className?: string;
}

export const VHVSlider: React.FC<VHVSliderProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
  color = 'primary',
  size = 'medium',
  marks,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled) return;
    updateValue(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const rawValue = min + (percent / 100) * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    onChange?.(clampedValue);
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
  }, [isDragging]);

  return (
    <div className={`relative w-full ${className}`}>
      {showValue && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {value}
          </span>
        </div>
      )}

      <div
        ref={sliderRef}
        className={`relative w-full ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onMouseDown={handleMouseDown}
      >
        {/* Progress */}
        <motion.div
          className={`absolute top-0 left-0 h-full ${colorClasses[color]} rounded-full`}
          style={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Thumb */}
        <motion.div
          className={`
            absolute top-1/2 -translate-y-1/2
            ${thumbSizeClasses[size]}
            ${colorClasses[color]}
            rounded-full shadow-lg
            ${isDragging ? 'scale-125' : 'scale-100'}
            ${disabled ? '' : 'hover:scale-110'}
            transition-transform
          `}
          style={{ left: `${percentage}%`, marginLeft: '-0.5rem' }}
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
