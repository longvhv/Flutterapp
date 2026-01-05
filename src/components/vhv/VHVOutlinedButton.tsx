import React from 'react';

interface VHVOutlinedButtonProps {
  onPressed?: () => void;
  child: React.ReactNode;
  disabled?: boolean;
  autofocus?: boolean;
  className?: string;
}

export const VHVOutlinedButton: React.FC<VHVOutlinedButtonProps> = ({
  onPressed,
  child,
  disabled = false,
  autofocus = false,
  className = '',
}) => {
  return (
    <button
      onClick={onPressed}
      disabled={disabled}
      autoFocus={autofocus}
      className={`
        px-6 py-3 rounded-lg
        border-2 border-blue-600 dark:border-blue-400
        text-blue-600 dark:text-blue-400
        hover:bg-blue-50 dark:hover:bg-blue-950
        active:bg-blue-100 dark:active:bg-blue-900
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {child}
    </button>
  );
};
