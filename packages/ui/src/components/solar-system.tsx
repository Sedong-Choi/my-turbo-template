"use client";

import React, { useEffect, useState } from "react";
import Star from "./star";

import { tv } from "@nextui-org/react";

const planetOrbit = tv({
  base:["relative top-1/2 left-1/2 transform"],
  variants:{
    planetOrbit:{
      mercury:"w-[300px] h-[300px] animate-[planet-orbit_8s_linear_infinite] solar-readius-[mercury]",
    }
  }
});
const planet = tv({
  base: ["rounded-full absolute"],
  variants: {
    planet: {
      mercury: "bg-[#B7B8B9] w-[48px] h-[48px] animate-[reverse-orbit_8s_linear_infinite]",
      // venus: "bg-[#FFC649] w-[121px] h-[121px] duration-200",
      // earth: "bg-[#34A56F] w-[127px] h-[127px] duration-300",
    },
  }
})
const SolarSystem: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [starCount, setStarCount] = useState(10);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    console.log('make stars')
    setTimeout(() => {
      makeStars();
    }, 5000);
  }, [starCount]);

  const makeStars = () => {
    setStarCount(Math.floor(Math.random() * 51) + 50);
  };

  return (
    <div className="solar-system bg-black min-h-full h-[calc(100dvh_-_var(--navbar-height)_-_1px)]">
      <div className="relative w-full h-full">
        <Sun />
        <div className={planetOrbit({planetOrbit:"mercury"})}>
          <button
            className={planet({  class: isHovered ? "paused" : "" })}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            Mercury
          </button>
          </div>
        {/* <button
          className={planet({ planet: "venus", class: isHovered ? "paused" : "" })}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          Venus
        </button>
        <button
          className={planet({ planet: "earth", class: isHovered ? "paused" : "" })}
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
        >
          Earth
        </button> */}
      </div>
      {starCount > 0 && Array.from({ length: starCount }, (_, index) => <Star key={index} size={10} color="white" />)}
    </div>
  );
};

const Sun = () => {
  return <div className="bg-yellow-400 rounded-full w-[150px] h-[150px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>;
};
export default SolarSystem;
