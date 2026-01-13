import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react'
const CustomCarousel = ({ data, renderItem, interval = 3000, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (data.length <= 1) return;

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return (
    <div className="w-full h-full h-screen">
      <div className="flex justify-between items-center px-5">
        {title && (
          <b className="text-5xl font-bold roker-font ">{title}</b>
        )}
        <div className="flex items-center gap-2">
          {/* prev button */}
          <button
            onClick={prevSlide}
            className="border-2 border-black hover:bg-black rounded-full hover:bg-black p-2 cursor-pointer flex-row-center-property hover:text-white transition duration-300">
            <ChevronLeft size={25} />
          </button>

          <button
            onClick={nextSlide}
            className="border-2 border-black hover:bg-black rounded-full hover:bg-black p-2 cursor-pointer flex-row-center-property hover:text-white transition duration-300">
            <ChevronRight size={25} />
          </button>
        </div>
      </div>

      <div className="relative">
        {data.map((product, index) => (
         <div
           key={index}
           className={`absolute top-0 w-full transition-opacity duration-1000 ${
             index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
           }`}>
           {renderItem(product)}
         </div>
       ))}
      </div>
    </div>
  );
};

export default CustomCarousel;

