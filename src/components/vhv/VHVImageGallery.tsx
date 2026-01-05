import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface VHVGalleryImage {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
}

interface VHVImageGalleryProps {
  images: VHVGalleryImage[];
  columns?: number;
  gap?: number;
  showCaptions?: boolean;
  className?: string;
}

export const VHVImageGallery: React.FC<VHVImageGalleryProps> = ({
  images,
  columns = 3,
  gap = 4,
  showCaptions = true,
  className = '',
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setZoom(1);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoom(1);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <>
      {/* Gallery Grid */}
      <div
        className={`grid gap-${gap} ${className}`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 aspect-square"
          >
            <img
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
            </div>
            {showCaptions && image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeft size={32} className="text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronRight size={32} className="text-white" />
            </button>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <ZoomOut size={20} className="text-white" />
              </button>
              <span className="px-4 py-2 bg-white/10 rounded-full text-white">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <ZoomIn size={20} className="text-white" />
              </button>
            </div>

            {/* Image */}
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: zoom }}
              exit={{ opacity: 0, scale: 0.8 }}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            {showCaptions && images[currentIndex].caption && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 px-6 py-3 rounded-lg">
                <p className="text-white text-center">{images[currentIndex].caption}</p>
              </div>
            )}

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 rounded-lg">
              <p className="text-white">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
