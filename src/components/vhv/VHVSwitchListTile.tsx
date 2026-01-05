import React from 'react';

interface VHVSwitchListTileProps {
  value: boolean;
  onChanged?: (value: boolean) => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  secondary?: React.ReactNode;
  activeColor?: string;
  activeTrackColor?: string;
  inactiveThumbColor?: string;
  inactiveTrackColor?: string;
  enabled?: boolean;
  selected?: boolean;
  controlAffinity?: 'leading' | 'trailing' | 'platform';
  className?: string;
}

export const VHVSwitchListTile: React.FC<VHVSwitchListTileProps> = ({
  value,
  onChanged,
  title,
  subtitle,
  secondary,
  activeColor = '#3B82F6',
  activeTrackColor = '#93C5FD',
  inactiveThumbColor = '#9CA3AF',
  inactiveTrackColor = '#E5E7EB',
  enabled = true,
  selected = false,
  controlAffinity = 'trailing',
  className = '',
}) => {
  const switchElement = (
    <button
      role="switch"
      aria-checked={value}
      onClick={(e) => {
        e.stopPropagation();
        enabled && onChanged?.(!value);
      }}
      disabled={!enabled}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      style={{
        backgroundColor: value ? activeTrackColor : inactiveTrackColor,
      }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full transition duration-200 ease-in-out"
        style={{
          backgroundColor: value ? activeColor : inactiveThumbColor,
          transform: value ? 'translateX(24px)' : 'translateX(4px)',
        }}
      />
    </button>
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
      {controlAffinity === 'leading' && switchElement}
      {secondary && <div className="flex-shrink-0">{secondary}</div>}
      
      <div className="flex-1">
        <div className="text-sm font-medium dark:text-white">{title}</div>
        {subtitle && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</div>
        )}
      </div>
      
      {controlAffinity === 'trailing' && switchElement}
    </div>
  );
};
