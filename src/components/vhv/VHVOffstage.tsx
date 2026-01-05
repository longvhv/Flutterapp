import React from 'react';

interface VHVOffstageProps {
  children: React.ReactNode;
  offstage?: boolean;
  className?: string;
}

export const VHVOffstage: React.FC<VHVOffstageProps> = ({
  children,
  offstage = true,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        visibility: offstage ? 'hidden' : 'visible',
        position: offstage ? 'absolute' : 'relative',
        pointerEvents: offstage ? 'none' : 'auto',
      }}
    >
      {children}
    </div>
  );
};
