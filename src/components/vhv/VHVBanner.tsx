import React from 'react';

interface VHVBannerAction {
  label: string;
  onPressed: () => void;
}

interface VHVBannerProps {
  leading?: React.ReactNode;
  content: React.ReactNode;
  actions: VHVBannerAction[];
  backgroundColor?: string;
  dividerColor?: string;
  className?: string;
}

export const VHVBanner: React.FC<VHVBannerProps> = ({
  leading,
  content,
  actions,
  backgroundColor = '#FEF3C7',
  dividerColor = '#F59E0B',
  className = '',
}) => {
  return (
    <div
      style={{ backgroundColor, borderLeftColor: dividerColor }}
      className={`flex items-center gap-4 px-4 py-3 border-l-4 ${className}`}
    >
      {leading && <div className="flex-shrink-0">{leading}</div>}
      <div className="flex-1">{content}</div>
      <div className="flex gap-2 flex-shrink-0">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onPressed}
            className="px-4 py-1 text-sm font-medium text-gray-700 hover:bg-black/5 rounded transition-colors"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};