import React from 'react';

interface VHVCupertinoSwitchProps {
  value: boolean;
  onChanged?: (value: boolean) => void;
  activeColor?: string;
  trackColor?: string;
  thumbColor?: string;
  className?: string;
}

export const VHVCupertinoSwitch: React.FC<VHVCupertinoSwitchProps> = ({
  value,
  onChanged,
  activeColor = '#34C759',
  trackColor = '#E5E7EB',
  thumbColor = '#FFFFFF',
  className = '',
}) => {
  return (
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onChanged?.(!value)}
      className={`
        relative inline-flex h-8 w-14 items-center rounded-full
        transition-all duration-300 ease-in-out
        shadow-inner
        ${className}
      `}
      style={{
        backgroundColor: value ? activeColor : trackColor,
      }}
    >
      <span
        className="inline-block h-7 w-7 transform rounded-full shadow-md transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: thumbColor,
          transform: value ? 'translateX(26px)' : 'translateX(2px)',
        }}
      />
    </button>
  );
};
