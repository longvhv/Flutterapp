import React, { useEffect, useRef, useState } from 'react';
import { VHVLoader } from './VHVLoader';

interface VHVInfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => void | Promise<void>;
  hasMore: boolean;
  loading?: boolean;
  threshold?: number;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  className?: string;
}

export const VHVInfiniteScroll: React.FC<VHVInfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 200,
  loader,
  endMessage,
  className = '',
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = async () => {
    if (isFetching || !hasMore || loading) return;

    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrolledToBottom = scrollHeight - scrollTop - clientHeight <= threshold;

    if (scrolledToBottom) {
      setIsFetching(true);
      try {
        await onLoadMore();
      } finally {
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, isFetching]);

  const defaultLoader = (
    <div className="flex justify-center py-8">
      <VHVLoader variant="spinner" size="medium" />
    </div>
  );

  const defaultEndMessage = (
    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
      No more items to load
    </div>
  );

  return (
    <div ref={containerRef} className={`overflow-auto ${className}`}>
      {children}
      {(loading || isFetching) && (loader || defaultLoader)}
      {!hasMore && !loading && !isFetching && (endMessage || defaultEndMessage)}
    </div>
  );
};
