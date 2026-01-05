import React, { useRef, useEffect } from 'react';

interface VHVPainter {
  paint: (canvas: CanvasRenderingContext2D, size: { width: number; height: number }) => void;
  shouldRepaint?: (oldDelegate: VHVPainter) => boolean;
}

interface VHVCustomPaintProps {
  painter?: VHVPainter;
  foregroundPainter?: VHVPainter;
  size?: { width: number; height: number };
  isComplex?: boolean;
  willChange?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const VHVCustomPaint: React.FC<VHVCustomPaintProps> = ({
  painter,
  foregroundPainter,
  size = { width: 300, height: 300 },
  isComplex = false,
  willChange = false,
  children,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const foregroundCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (painter && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, size.width, size.height);
        painter.paint(ctx, size);
      }
    }
  }, [painter, size]);

  useEffect(() => {
    if (foregroundPainter && foregroundCanvasRef.current) {
      const ctx = foregroundCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, size.width, size.height);
        foregroundPainter.paint(ctx, size);
      }
    }
  }, [foregroundPainter, size]);

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: size.width,
        height: size.height,
        willChange: willChange ? 'transform' : undefined,
      }}
    >
      {painter && (
        <canvas
          ref={canvasRef}
          width={size.width}
          height={size.height}
          className="absolute inset-0"
        />
      )}
      {children && <div className="relative z-10">{children}</div>}
      {foregroundPainter && (
        <canvas
          ref={foregroundCanvasRef}
          width={size.width}
          height={size.height}
          className="absolute inset-0 z-20 pointer-events-none"
        />
      )}
    </div>
  );
};
