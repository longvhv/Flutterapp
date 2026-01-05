import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface VHVBreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface VHVBreadcrumbProps {
  items: VHVBreadcrumbItem[];
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
  onItemClick?: (item: VHVBreadcrumbItem) => void;
  className?: string;
}

export const VHVBreadcrumb: React.FC<VHVBreadcrumbProps> = ({
  items,
  separator = <ChevronRight size={16} />,
  showHomeIcon = true,
  onItemClick,
  className = '',
}) => {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <React.Fragment key={item.id}>
              <li className="flex items-center gap-2">
                {item.href || onItemClick ? (
                  <button
                    onClick={() => onItemClick?.(item)}
                    className={`
                      flex items-center gap-2 transition-colors
                      ${isLast
                        ? 'text-gray-900 dark:text-white font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    {isFirst && showHomeIcon ? (
                      <Home size={16} />
                    ) : item.icon ? (
                      item.icon
                    ) : null}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <span
                    className={`
                      flex items-center gap-2
                      ${isLast
                        ? 'text-gray-900 dark:text-white font-medium'
                        : 'text-gray-600 dark:text-gray-400'
                      }
                    `}
                  >
                    {isFirst && showHomeIcon ? (
                      <Home size={16} />
                    ) : item.icon ? (
                      item.icon
                    ) : null}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
              
              {!isLast && (
                <li className="text-gray-400 dark:text-gray-600" aria-hidden="true">
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
