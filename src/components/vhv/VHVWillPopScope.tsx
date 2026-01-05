import React, { useEffect } from 'react';

interface VHVWillPopScopeProps {
  children: React.ReactNode;
  onWillPop: () => boolean | Promise<boolean>;
  className?: string;
}

export const VHVWillPopScope: React.FC<VHVWillPopScopeProps> = ({
  children,
  onWillPop,
  className = '',
}) => {
  useEffect(() => {
    const handlePopState = async (e: PopStateEvent) => {
      const shouldPop = await onWillPop();
      if (!shouldPop) {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onWillPop]);

  return <div className={className}>{children}</div>;
};
