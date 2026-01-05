import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface VHVCalendarEvent {
  id: string;
  date: Date;
  title: string;
  color?: string;
}

interface VHVCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  events?: VHVCalendarEvent[];
  onEventClick?: (event: VHVCalendarEvent) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export const VHVCalendar: React.FC<VHVCalendarProps> = ({
  value,
  onChange,
  events = [],
  onEventClick,
  minDate,
  maxDate,
  className = '',
}) => {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date | undefined, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return isSameDay(today, date);
  };

  const getEventsForDate = (date: Date): VHVCalendarEvent[] => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;
    setSelectedDate(date);
    onChange?.(date);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
    onChange?.(today);
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>

          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <button
          onClick={goToToday}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Today
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-gray-50 dark:bg-gray-800 text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-3"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {getDaysInMonth(currentMonth).map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="bg-white dark:bg-gray-900 aspect-square" />;
          }

          const disabled = isDateDisabled(day);
          const selected = isSameDay(selectedDate, day);
          const today = isToday(day);
          const dayEvents = getEventsForDate(day);

          return (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              disabled={disabled}
              className={`
                bg-white dark:bg-gray-900 aspect-square p-2
                flex flex-col items-center justify-start
                transition-colors
                ${disabled
                  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  : selected
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : today
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                  : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
            >
              <span className="text-sm font-medium mb-1">{day.getDate()}</span>
              
              {/* Event Indicators */}
              {dayEvents.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-auto">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: event.color || '#3B82F6' }}
                      title={event.title}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[8px]">+{dayEvents.length - 3}</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
