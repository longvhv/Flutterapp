import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VHVPageViewProps {
  children: React.ReactNode[];
  initialPage?: number;
  onPageChanged?: (index: number) => void;
  scrollDirection?: 'horizontal' | 'vertical';
  pageSnapping?: boolean;
  allowImplicitScrolling?: boolean;
  padEnds?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const VHVPageView: React.FC<VHVPageViewProps> = ({
  children,
  initialPage = 0,
  onPageChanged,
  scrollDirection = 'horizontal',
  pageSnapping = true,
  allowImplicitScrolling = false,
  padEnds = true,
  showIndicators = true,
  showArrows = false,
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToPage = (index: number) => {
    if (index >= 0 && index < children.length) {
      setCurrentPage(index);
      onPageChanged?.(index);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  useEffect(() => {
    if (containerRef.current) {
      const scrollPos = scrollDirection === 'horizontal'
        ? currentPage * containerRef.current.offsetWidth
        : currentPage * containerRef.current.offsetHeight;
      
      containerRef.current.scrollTo({
        [scrollDirection === 'horizontal' ? 'left' : 'top']: scrollPos,
        behavior: 'smooth',
      });
    }
  }, [currentPage, scrollDirection]);

  return (
    <div className={`relative ${className}`}>
      {/* Navigation Arrows */}
      {showArrows && scrollDirection === 'horizontal' && (
        <>
          {currentPage > 0 && (
            <button
              onClick={prevPage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {currentPage < children.length - 1 && (
            <button
              onClick={nextPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </>
      )}

      {/* Pages Container */}
      <div
        ref={containerRef}
        className={`
          flex overflow-hidden
          ${scrollDirection === 'horizontal' ? 'flex-row' : 'flex-col'}
          ${allowImplicitScrolling ? 'overflow-auto' : ''}
          ${pageSnapping ? 'snap-x snap-mandatory' : ''}
        `}
        style={{ scrollSnapType: pageSnapping ? 'both mandatory' : 'none' }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full snap-start"
          >
            {child}
          </div>
        ))}
      </div>

      {/* Page Indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${index === currentPage 
                  ? 'bg-blue-500 w-6' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
};
