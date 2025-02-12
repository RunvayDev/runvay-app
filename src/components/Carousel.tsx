"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const desktopImages = ["/Runvay(logo).jpg", "/carousel-sample.jpg", "/carousel-sample.jpg"];
const mobileImages = ["/runvay-bl.png", "/mobile2.jpg", "/mobile3.jpg"];

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    const listener = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const Carousel = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const images = isMobile ? mobileImages : desktopImages;

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

 
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval);
  }, [nextSlide]); 


  return (
    <div className="bg-white max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 my-8">
      <div className="relative w-full h-[80vh] overflow-hidden rounded-lg">
        {/* Image Container */}
        <div
          className="flex transition-transform duration-200 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0 relative h-[80vh]">
              <Image onClick={()=>{router.push(`/search?q=`);}}
                src={src} 
                alt={`Slide ${index + 1}`} 
                fill 
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Left Button */}
        <button 
          onClick={prevSlide} 
          className="absolute top-1/2 left-6 -translate-y-1/2 bg-gray-900/50 p-3 rounded-full text-white hover:bg-gray-800 transition-colors duration-200"
        >
          <ChevronLeft size={30} />
        </button>

        {/* Right Button */}
        <button 
          onClick={nextSlide} 
          className="absolute top-1/2 right-6 -translate-y-1/2 bg-gray-900/50 p-3 rounded-full text-white hover:bg-gray-800 transition-colors duration-200"
        >
          <ChevronRight size={30} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
          {images.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)} 
              className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                currentIndex === index ? "bg-white" : "bg-gray-400/70 hover:bg-gray-300"
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
