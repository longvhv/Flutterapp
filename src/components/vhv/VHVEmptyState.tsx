import React from 'react';
import { LucideIcon } from 'lucide-react';
import { VHVButton } from './VHVButton';

interface VHVEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: React.ReactNode;
  className?: string;
}

export const VHVEmptyState: React.FC<VHVEmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  illustration,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 ${className}`}>
      {/* Icon or Illustration */}
      {illustration ? (
        <div className="mb-6">{illustration}</div>
      ) : Icon ? (
        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
          <Icon size={48} className="text-gray-400 dark:text-gray-600" />
        </div>
      ) : null}

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
          {description}
        </p>
      )}

      {/* Action */}
      {actionLabel && onAction && (
        <VHVButton variant="primary" onClick={onAction}>
          {actionLabel}
        </VHVButton>
      )}
    </div>
  );
};
