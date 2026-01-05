import React from 'react';

interface VHVCheckboxListTileProps {
  value: boolean;
  onChanged?: (value: boolean) => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  secondary?: React.ReactNode;
  activeColor?: string;
  checkColor?: string;
  enabled?: boolean;
  selected?: boolean;
  controlAffinity?: 'leading' | 'trailing' | 'platform';
  className?: string;
}

export const VHVCheckboxListTile: React.FC<VHVCheckboxListTileProps> = ({
  value,
  onChanged,
  title,
  subtitle,
  secondary,
  activeColor = '#3B82F6',
  checkColor = '#FFFFFF',
  enabled = true,
  selected = false,
  controlAffinity = 'trailing',
  className = '',
}) => {
  const checkbox = (
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => enabled && onChanged?.(e.target.checked)}
      disabled={!enabled}
      style={{
        accentColor: activeColor,
      }}
      className="w-5 h-5 rounded cursor-pointer disabled:cursor-not-allowed"
    />
  );

  return (
    <div
      onClick={() => enabled && onChanged?.(!value)}
      className={`
        flex items-center gap-3 px-4 py-3
        ${enabled ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : 'opacity-50 cursor-not-allowed'}
        ${selected ? 'bg-blue-50 dark:bg-blue-950' : ''}
        transition-colors duration-150
        ${className}
      `}
    >
      {controlAffinity === 'leading' && checkbox}
      {secondary && <div className="flex-shrink-0">{secondary}</div>}
      
      <div className="flex-1">
        <div className="text-sm font-medium dark:text-white">{title}</div>
        {subtitle && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</div>
        )}
      </div>
      
      {controlAffinity === 'trailing' && checkbox}
    </div>
  );
};
