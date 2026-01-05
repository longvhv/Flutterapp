import React from 'react';

interface VHVElevatedButtonProps {
  onPressed?: () => void;
  child: React.ReactNode;
  disabled?: boolean;
  autofocus?: boolean;
  className?: string;
}

export const VHVElevatedButton: React.FC<VHVElevatedButtonProps> = ({
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
        bg-blue-600 hover:bg-blue-700 active:bg-blue-800
        text-white
        shadow-md hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        transition-all duration-200
        ${className}
      `}
    >
      {child}
    </button>
  );
};
