import React from 'react';

interface VHVCupertinoNavigationBarProps {
  leading?: React.ReactNode;
  middle?: React.ReactNode;
  trailing?: React.ReactNode;
  backgroundColor?: string;
  border?: boolean;
  className?: string;
}

export const VHVCupertinoNavigationBar: React.FC<VHVCupertinoNavigationBarProps> = ({
  leading,
  middle,
  trailing,
  backgroundColor = 'rgba(248, 248, 248, 0.92)',
  border = true,
  className = '',
}) => {
  return (
    <nav
      style={{ backgroundColor }}
      className={`
        flex items-center justify-between px-4 h-14
        ${border ? 'border-b border-gray-200 dark:border-gray-700' : ''}
        backdrop-blur-lg
        ${className}
      `}
    >
      <div className="flex-1 flex justify-start">{leading}</div>
      <div className="flex-1 flex justify-center font-semibold">{middle}</div>
      <div className="flex-1 flex justify-end">{trailing}</div>
    </nav>
  );
};
