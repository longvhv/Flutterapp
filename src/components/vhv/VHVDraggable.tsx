import React, { useState } from 'react';

interface VHVDraggableProps<T = any> {
  data: T;
  child: React.ReactNode;
  feedback?: React.ReactNode;
  childWhenDragging?: React.ReactNode;
  feedbackOffset?: { x: number; y: number };
  dragAnchorStrategy?: 'child' | 'pointer';
  maxSimultaneousDrags?: number;
  onDragStarted?: () => void;
  onDragEnd?: (details: { wasAccepted: boolean }) => void;
  onDraggableCanceled?: (velocity: { x: number; y: number }, offset: { x: number; y: number }) => void;
  className?: string;
}

export function VHVDraggable<T = any>({
  data,
  child,
  feedback,
  childWhenDragging,
  feedbackOffset = { x: 0, y: 0 },
  dragAnchorStrategy = 'child',
  maxSimultaneousDrags,
  onDragStarted,
  onDragEnd,
  onDraggableCanceled,
  className = '',
}: VHVDraggableProps<T>) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(data));
    onDragStarted?.();
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    const wasAccepted = e.dataTransfer.dropEffect !== 'none';
    onDragEnd?.({ wasAccepted });
    
    if (!wasAccepted) {
      onDraggableCanceled?.({ x: 0, y: 0 }, { x: 0, y: 0 });
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`cursor-grab active:cursor-grabbing ${className}`}
    >
      {isDragging && childWhenDragging ? childWhenDragging : child}
    </div>
  );
}