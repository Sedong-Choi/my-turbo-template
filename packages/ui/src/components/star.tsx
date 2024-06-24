"use client";

import { useMemo, useState } from "react";
import { tv } from "@nextui-org/react";

const star = tv({
  base: "absolute rounded-full",
  variants: {
  },
  defaultVariants: {},
});

interface StarProps {
  size?: number;
  duration?: number;
  color?: string;
}
export default function Star({ size = 1, duration = 1, color }: StarProps) {
  const [width, setWidth] = useState(size);
  const [height, setHeight] = useState(size);
  useMemo(() => {
    setWidth(size ?? Math.round(Math.random() * 2 + 1));
    setHeight(size ?? Math.round(Math.random() * 2 + 1));
  }, []);
  return (
    <div
      className={star()}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        animationDuration: `${duration ?? Math.random() * 2 + 1}s`,
        backgroundColor:
          color ??
          `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
        position: "absolute",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
    ></div>
  );
};
