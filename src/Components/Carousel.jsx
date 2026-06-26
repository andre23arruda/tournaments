import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel({ items, renderItem, responsive = { mobile: 1, tablet: 2, desktop: 3 }, darkMode }) {
  const [visibleItems, setVisibleItems] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVisibleItems(responsive.mobile || 1);
      } else if (width < 1024) {
        setVisibleItems(responsive.tablet || 2);
      } else {
        setVisibleItems(responsive.desktop || 3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsive]);

  // Adjust current index if visibleItems changes or screen size changes to avoid blank space at the end
  useEffect(() => {
    const maxIndex = Math.max(0, items.length - visibleItems);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleItems, items.length, currentIndex]);

  const maxIndex = Math.max(0, items.length - visibleItems);

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    if (diffX > 50) {
      // Swiped left
      if (currentIndex < maxIndex) {
        next();
      }
    }
    if (diffX < -50) {
      // Swiped right
      if (currentIndex > 0) {
        prev();
      }
    }
  };

  // If there are no items to scroll (total items <= visible items), just show them without navigation
  const showNavigation = items.length > visibleItems;

  return (
    <div className="relative w-full group">
      {/* Viewport container */}
      <div 
        className="overflow-hidden w-full -mx-3 px-3"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex items-stretch transition-transform duration-500 ease-out py-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 px-3 transition-all duration-300 flex flex-col"
              style={{
                width: `${100 / visibleItems}%`
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <button
            onClick={prev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 z-20 p-3 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 cursor-pointer ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700' 
                : 'bg-white/80 border-gray-200 text-gray-800 hover:bg-gray-100'
            }`}
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={next}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 z-20 p-3 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 cursor-pointer ${
              darkMode 
                ? 'bg-gray-800/80 border-gray-700 text-white hover:bg-gray-700' 
                : 'bg-white/80 border-gray-200 text-gray-800 hover:bg-gray-100'
            }`}
            aria-label="Próximo slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showNavigation && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx 
                  ? 'w-6 bg-orange-600' 
                  : `w-2.5 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`
              }`}
              aria-label={`Ir para o slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
