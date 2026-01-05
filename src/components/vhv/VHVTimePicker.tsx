import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VHVTimePickerProps {
  value?: { hour: number; minute: number };
  onChange?: (time: { hour: number; minute: number }) => void;
  format?: '12h' | '24h';
  disabled?: boolean;
  label?: string;
  minuteStep?: number;
  className?: string;
}

export const VHVTimePicker: React.FC<VHVTimePickerProps> = ({
  value,
  onChange,
  format = '12h',
  disabled = false,
  label,
  minuteStep = 1,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value || { hour: 12, minute: 0 });
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  const formatTime = (time: { hour: number; minute: number }): string => {
    if (format === '12h') {
      const hour = time.hour === 0 ? 12 : time.hour > 12 ? time.hour - 12 : time.hour;
      const p = time.hour >= 12 ? 'PM' : 'AM';
      return `${hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')} ${p}`;
    } else {
      return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
    }
  };

  const handleTimeSelect = (hour: number, minute: number) => {
    let finalHour = hour;
    
    if (format === '12h') {
      if (period === 'PM' && hour < 12) {
        finalHour = hour + 12;
      } else if (period === 'AM' && hour === 12) {
        finalHour = 0;
      }
    }

    const newTime = { hour: finalHour, minute };
    setSelectedTime(newTime);
    onChange?.(newTime);
  };

  const hours = format === '12h' 
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);

  const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Input */}
      <button
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
        <span className="text-gray-900 dark:text-white">
          {formatTime(selectedTime)}
        </span>
        <Clock size={20} className="text-gray-400" />
      </button>

      {/* Time Picker Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-4"
          >
            <div className="flex gap-4">
              {/* Hours */}
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 text-center">
                  Hour
                </label>
                <div className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 pr-2">
                  {hours.map((hour) => {
                    const isSelected = format === '12h'
                      ? (selectedTime.hour % 12 === 0 ? 12 : selectedTime.hour % 12) === hour
                      : selectedTime.hour === hour;

                    return (
                      <button
                        key={hour}
                        onClick={() => handleTimeSelect(hour, selectedTime.minute)}
                        className={`
                          w-16 px-3 py-2 rounded-lg text-sm font-medium
                          transition-colors mb-1
                          ${isSelected
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        {hour.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minutes */}
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 text-center">
                  Minute
                </label>
                <div className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 pr-2">
                  {minutes.map((minute) => (
                    <button
                      key={minute}
                      onClick={() => handleTimeSelect(selectedTime.hour, minute)}
                      className={`
                        w-16 px-3 py-2 rounded-lg text-sm font-medium
                        transition-colors mb-1
                        ${selectedTime.minute === minute
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      {minute.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>

              {/* AM/PM */}
              {format === '12h' && (
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 text-center">
                    Period
                  </label>
                  <div className="space-y-2">
                    {['AM', 'PM'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPeriod(p as 'AM' | 'PM')}
                        className={`
                          w-16 px-3 py-2 rounded-lg text-sm font-medium
                          transition-colors
                          ${period === p
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <button
                onClick={() => {
                  const now = new Date();
                  handleTimeSelect(now.getHours(), now.getMinutes());
                }}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
              >
                Now
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
