import React, { useState } from 'react';
import { VHVLoader } from './VHVLoader';

export type VHVImageFit = 'contain' | 'cover' | 'fill' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown';

interface VHVImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fit?: VHVImageFit;
  alignment?: 'center' | 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  loadingBuilder?: React.ReactNode;
  errorBuilder?: React.ReactNode;
  frameBuilder?: (image: React.ReactNode) => React.ReactNode;
  opacity?: number;
  colorBlendMode?: string;
  filterQuality?: 'low' | 'medium' | 'high';
  className?: string;
}

export const VHVImage: React.FC<VHVImageProps> = ({
  src,
  alt = '',
  width,
  height,
  fit = 'cover',
  alignment = 'center',
  loadingBuilder,
  errorBuilder,
  frameBuilder,
  opacity = 1,
  colorBlendMode,
  filterQuality = 'high',
  className = '',
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fitMap = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    fitWidth: 'object-cover w-full',
    fitHeight: 'object-cover h-full',
    none: 'object-none',
    scaleDown: 'object-scale-down',
  };

  const alignmentMap = {
    center: 'object-center',
    topLeft: 'object-left-top',
    topCenter: 'object-top',
    topRight: 'object-right-top',
    centerLeft: 'object-left',
    centerRight: 'object-right',
    bottomLeft: 'object-left-bottom',
    bottomCenter: 'object-bottom',
    bottomRight: 'object-right-bottom',
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    opacity,
    mixBlendMode: colorBlendMode as any,
    imageRendering: filterQuality === 'low' ? 'pixelated' : filterQuality === 'medium' ? 'auto' : 'high-quality',
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (error && errorBuilder) {
    return <>{errorBuilder}</>;
  }

  const imageElement = (
    <img
      src={src}
      alt={alt}
      style={style}
      className={`${fitMap[fit]} ${alignmentMap[alignment]} ${className}`}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  if (loading && loadingBuilder) {
    return (
      <div className="relative" style={style}>
        {loadingBuilder}
        <img
          src={src}
          alt={alt}
          style={{ ...style, opacity: 0, position: 'absolute' }}
          className={`${fitMap[fit]} ${alignmentMap[alignment]}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    );
  }

  if (frameBuilder) {
    return <>{frameBuilder(imageElement)}</>;
  }

  return imageElement;
};

// VHVImage.asset - for local assets
export const VHVImageAsset: React.FC<Omit<VHVImageProps, 'src'> & { assetPath: string }> = ({
  assetPath,
  ...props
}) => <VHVImage src={assetPath} {...props} />;

// VHVImage.network - for network images
export const VHVImageNetwork: React.FC<VHVImageProps> = (props) => <VHVImage {...props} />;
