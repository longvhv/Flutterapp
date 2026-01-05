import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface VHVBackButtonProps {
  color?: string;
  onPressed?: () => void;
  className?: string;
}

export const VHVBackButton: React.FC<VHVBackButtonProps> = ({
  color,
  onPressed,
  className = '',
}) => {
  const handleClick = () => {
    if (onPressed) {
      onPressed();
    } else {
      window.history.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
    >
      <ArrowLeft size={24} style={{ color }} />
    </button>
  );
};
