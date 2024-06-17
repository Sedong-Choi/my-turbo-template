"use client";

import React, { useMemo, useState } from "react";
import Star from "./star";
const SolarSystem: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [starCount, setStarCount] = useState(10);
  
  const handleHover = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  useMemo(() => {
    setTimeout(() => {
      console.log('make stars')
      makeStars();
    }, 5000);
  }, [starCount]);
  
  const makeStars = () => {
    setStarCount(Math.floor(Math.random() * 51) + 50);
  };

  return (
    <div className="solar-system bg-black min-h-full h-[calc(100dvh_-_var(--navbar-height)_-_1px)]">
      <Sun />
      <button
        className={`planet ${isHovered ? "paused" : ""}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        Mercury
      </button>
      <button
        className={`planet ${isHovered ? "paused" : ""}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        Venus
      </button>
      <button
        className={`planet ${isHovered ? "paused" : ""}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        Earth
      </button>
      {starCount > 0 && Array.from({length: starCount}, (_, index) => <Star key={index} size={10} color="white"/>)}
    </div>
  );
};

const Sun = () => {
  return <div className="bg-yellow-400 rounded-full"></div>;
};
export default SolarSystem;
