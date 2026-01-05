import React, { useState } from 'react';

interface VHVDragTargetProps<T = any> {
  builder: (candidateData: T[], rejectedData: any[]) => React.ReactNode;
  onWillAccept?: (data: T) => boolean;
  onAccept?: (data: T) => void;
  onAcceptWithDetails?: (details: { data: T; offset: { x: number; y: number } }) => void;
  onLeave?: (data: T) => void;
  onMove?: (details: { data: T; offset: { x: number; y: number } }) => void;
  className?: string;
}

export function VHVDragTarget<T = any>({
  builder,
  onWillAccept,
  onAccept,
  onAcceptWithDetails,
  onLeave,
  onMove,
  className = '',
}: VHVDragTargetProps<T>) {
  const [candidateData, setCandidateData] = useState<T[]>([]);
  const [rejectedData, setRejectedData] = useState<any[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json')) as T;
      
      if (onWillAccept && !onWillAccept(data)) {
        e.dataTransfer.dropEffect = 'none';
        return;
      }
      
      e.dataTransfer.dropEffect = 'move';
      
      onMove?.({
        data,
        offset: { x: e.clientX, y: e.clientY },
      });
    } catch (error) {
      // Invalid data
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json')) as T;
      
      if (onWillAccept && !onWillAccept(data)) {
        setRejectedData([data]);
      } else {
        setCandidateData([data]);
      }
    } catch (error) {
      // Invalid data
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json')) as T;
      setCandidateData([]);
      setRejectedData([]);
      onLeave?.(data);
    } catch (error) {
      // Invalid data
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json')) as T;
      
      if (onWillAccept && !onWillAccept(data)) {
        return;
      }

      onAccept?.(data);
      onAcceptWithDetails?.({
        data,
        offset: { x: e.clientX, y: e.clientY },
      });
      
      setCandidateData([]);
      setRejectedData([]);
    } catch (error) {
      // Invalid data
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={className}
    >
      {builder(candidateData, rejectedData)}
    </div>
  );
}
