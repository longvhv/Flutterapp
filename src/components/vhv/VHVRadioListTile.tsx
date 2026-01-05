import React from 'react';

interface VHVRadioListTileProps<T = any> {
  value: T;
  groupValue: T;
  onChanged?: (value: T) => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  secondary?: React.ReactNode;
  activeColor?: string;
  enabled?: boolean;
  selected?: boolean;
  controlAffinity?: 'leading' | 'trailing' | 'platform';
  className?: string;
}

export function VHVRadioListTile<T = any>({
  value,
  groupValue,
  onChanged,
  title,
  subtitle,
  secondary,
  activeColor = '#3B82F6',
  enabled = true,
  selected = false,
  controlAffinity = 'trailing',
  className = '',
}: VHVRadioListTileProps<T>) {
  const isSelected = value === groupValue;

  const radio = (
    <input
      type="radio"
      checked={isSelected}
      onChange={() => enabled && onChanged?.(value)}
      disabled={!enabled}
      style={{
        accentColor: activeColor,
      }}
      className="w-5 h-5 cursor-pointer disabled:cursor-not-allowed"
    />
  );

  return (
    <div
      onClick={() => enabled && onChanged?.(value)}
      className={`
        flex items-center gap-3 px-4 py-3
        ${enabled ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : 'opacity-50 cursor-not-allowed'}
        ${selected || isSelected ? 'bg-blue-50 dark:bg-blue-950' : ''}
        transition-colors duration-150
        ${className}
      `}
    >
      {controlAffinity === 'leading' && radio}
      {secondary && <div className="flex-shrink-0">{secondary}</div>}
      
      <div className="flex-1">
        <div className="text-sm font-medium dark:text-white">{title}</div>
        {subtitle && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</div>
        )}
      </div>
      
      {controlAffinity === 'trailing' && radio}
    </div>
  );
}
