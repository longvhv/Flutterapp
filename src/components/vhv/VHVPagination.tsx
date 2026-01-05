import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface VHVPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined' | 'text';
  className?: string;
}

export const VHVPagination: React.FC<VHVPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  disabled = false,
  size = 'medium',
  variant = 'default',
  className = '',
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const paginationRange = React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 3 + 2 * siblingCount);
      return [...leftRange, 'dots', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPages - (2 + 2 * siblingCount), totalPages);
      return [1, 'dots', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, 'dots', ...middleRange, 'dots', totalPages];
    }

    return range(1, totalPages);
  }, [currentPage, totalPages, siblingCount]);

  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-12 h-12 text-lg',
  };

  const variantClasses = {
    default: {
      base: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
      active: 'bg-blue-600 text-white hover:bg-blue-700',
    },
    outlined: {
      base: 'border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
      active: 'border-blue-600 text-blue-600 dark:text-blue-400',
    },
    text: {
      base: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      active: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20',
    },
  };

  const PageButton: React.FC<{
    page: number | string;
    isActive?: boolean;
    onClick?: () => void;
  }> = ({ page, isActive = false, onClick }) => {
    if (page === 'dots') {
      return (
        <div className={`${sizeClasses[size]} flex items-center justify-center`}>
          <MoreHorizontal size={20} className="text-gray-400" />
        </div>
      );
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled || isActive}
        className={`
          ${sizeClasses[size]}
          ${isActive ? variantClasses[variant].active : variantClasses[variant].base}
          rounded-lg font-medium transition-colors
          flex items-center justify-center
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {page}
      </button>
    );
  };

  return (
    <nav className={`flex items-center gap-2 ${className}`}>
      {/* First */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={disabled || currentPage === 1}
          className={`
            ${sizeClasses[size]} ${variantClasses[variant].base}
            rounded-lg font-medium transition-colors
            flex items-center justify-center
            ${disabled || currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          First
        </button>
      )}

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        className={`
          ${sizeClasses[size]} ${variantClasses[variant].base}
          rounded-lg transition-colors
          flex items-center justify-center
          ${disabled || currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {paginationRange.map((page, index) => (
        <PageButton
          key={index}
          page={page}
          isActive={page === currentPage}
          onClick={() => typeof page === 'number' && onPageChange(page)}
        />
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
        className={`
          ${sizeClasses[size]} ${variantClasses[variant].base}
          rounded-lg transition-colors
          flex items-center justify-center
          ${disabled || currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <ChevronRight size={20} />
      </button>

      {/* Last */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={disabled || currentPage === totalPages}
          className={`
            ${sizeClasses[size]} ${variantClasses[variant].base}
            rounded-lg font-medium transition-colors
            flex items-center justify-center
            ${disabled || currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          Last
        </button>
      )}
    </nav>
  );
};
