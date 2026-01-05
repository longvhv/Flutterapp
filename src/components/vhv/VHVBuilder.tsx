import React from 'react';

interface VHVBuilderProps {
  builder: (context: any) => React.ReactNode;
  className?: string;
}

export const VHVBuilder: React.FC<VHVBuilderProps> = ({
  builder,
  className = '',
}) => {
  return <div className={className}>{builder({})}</div>;
};
