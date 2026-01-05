import React from 'react';

interface VHVTextButtonProps {
  onPressed?: () => void;
  child: React.ReactNode;
  disabled?: boolean;
  autofocus?: boolean;
  className?: string;
}

export const VHVTextButton: React.FC<VHVTextButtonProps> = ({
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
        px-4 py-2 rounded-lg
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
