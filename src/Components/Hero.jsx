import React, { useState, useEffect } from "react";

const Hero = () => {
  const slides = ["/src/assets/Hero_1.png", "/src/assets/Hero_2.png"];

  const [currentIndex, setCurrentIndex] = useState(0);

  // AUTO SLIDE (clean senior version)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []); // run once only

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      {/* SLIDER CONTAINER */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt="Hero Slide"
            className="w-full h-100 object-cover shrink-0"
          />
        ))}
      </div>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
