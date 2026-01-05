import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VHVCarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  infinite?: boolean;
  className?: string;
}

export const VHVCarousel: React.FC<VHVCarouselProps> = ({
  children,
  autoPlay = false,
  interval = 3000,
  showArrows = true,
  showDots = true,
  infinite = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        goToNext();
      }, interval);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [autoPlay, interval, currentIndex]);

  const goToPrevious = () => {
    setDirection(-1);
    if (currentIndex === 0) {
      setCurrentIndex(infinite ? totalSlides - 1 : 0);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    setDirection(1);
    if (currentIndex === totalSlides - 1) {
      setCurrentIndex(infinite ? 0 : totalSlides - 1);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Slides */}
      <div className="relative w-full aspect-video">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            {slides[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={!infinite && currentIndex === 0}
            className={`
              absolute left-4 top-1/2 -translate-y-1/2
              w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90
              flex items-center justify-center
              hover:bg-white dark:hover:bg-gray-800
              transition-all shadow-lg
              ${!infinite && currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <ChevronLeft size={24} className="text-gray-900 dark:text-white" />
          </button>

          <button
            onClick={goToNext}
            disabled={!infinite && currentIndex === totalSlides - 1}
            className={`
              absolute right-4 top-1/2 -translate-y-1/2
              w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90
              flex items-center justify-center
              hover:bg-white dark:hover:bg-gray-800
              transition-all shadow-lg
              ${!infinite && currentIndex === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <ChevronRight size={24} className="text-gray-900 dark:text-white" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-2 h-2 rounded-full transition-all
                ${index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/75'
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
};
