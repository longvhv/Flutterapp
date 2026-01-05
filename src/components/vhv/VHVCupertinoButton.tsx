import React from 'react';

interface VHVCupertinoButtonProps {
  child: React.ReactNode;
  onPressed?: () => void;
  color?: string;
  disabledColor?: string;
  padding?: string;
  borderRadius?: string;
  minSize?: number;
  pressedOpacity?: number;
  enabled?: boolean;
  className?: string;
}

export const VHVCupertinoButton: React.FC<VHVCupertinoButtonProps> = ({
  child,
  onPressed,
  color = '#007AFF',
  disabledColor = '#D1D5DB',
  padding = '12px 16px',
  borderRadius = '8px',
  minSize = 44,
  pressedOpacity = 0.4,
  enabled = true,
  className = '',
}) => {
  return (
    <button
      onClick={onPressed}
      disabled={!enabled}
      style={{
        backgroundColor: enabled ? color : disabledColor,
        padding,
        borderRadius,
        minHeight: `${minSize}px`,
      }}
      className={`
        text-white font-medium text-center
        active:opacity-40
        disabled:cursor-not-allowed
        transition-opacity duration-150
        ${className}
      `}
    >
      {child}
    </button>
  );
};
