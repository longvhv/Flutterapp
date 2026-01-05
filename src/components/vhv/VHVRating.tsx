import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface VHVRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  readOnly?: boolean;
  showValue?: boolean;
  precision?: number;
  color?: string;
  emptyColor?: string;
  className?: string;
}

export const VHVRating: React.FC<VHVRatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  size = 'medium',
  readOnly = false,
  showValue = false,
  precision = 1,
  color = 'text-yellow-500',
  emptyColor = 'text-gray-300 dark:text-gray-600',
  className = '',
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const iconSizes = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const handleClick = (starValue: number) => {
    if (readOnly) return;
    onChange?.(starValue);
  };

  const handleMouseEnter = (starValue: number) => {
    if (readOnly) return;
    setHoverValue(starValue);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(null);
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const isFilled = displayValue >= starValue;
          const isPartiallyFilled = displayValue > index && displayValue < starValue;
          const fillPercentage = isPartiallyFilled
            ? ((displayValue - index) * 100)
            : isFilled
            ? 100
            : 0;

          return (
            <button
              key={index}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={readOnly}
              className={`
                relative transition-transform
                ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
              `}
            >
              {/* Empty star */}
              <Star
                size={iconSizes[size]}
                className={emptyColor}
                fill="currentColor"
              />
              
              {/* Filled star */}
              {fillPercentage > 0 && (
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star
                    size={iconSizes[size]}
                    className={color}
                    fill="currentColor"
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {value.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
};
