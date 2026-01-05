import React from 'react';

interface VHVBaselineProps {
  children: React.ReactNode;
  baseline: number;
  baselineType?: 'alphabetic' | 'ideographic';
  className?: string;
}

export const VHVBaseline: React.FC<VHVBaselineProps> = ({
  children,
  baseline,
  baselineType = 'alphabetic',
  className = '',
}) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        verticalAlign: 'baseline',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
