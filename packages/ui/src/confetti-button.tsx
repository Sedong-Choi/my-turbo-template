"use client";

import { useRef } from 'react';
import {Button} from '@nextui-org/react';
import confetti from 'canvas-confetti';


interface CustomButtonProps {
  className?: string[];
  color?: string;
  size?: "sm"| "md"| "lg";
  children?: React.ReactNode | string;
}

const CustomButton = ({className,color,size,children}:CustomButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleConfetti = () => {
    const button = buttonRef.current;
    if(button) {
      const rect = button.getBoundingClientRect();
      const confettiProps = {
        particleCount: 100,
        startVelocity: 30,
        spread: 60,
        origin: {
          x: (rect.left + rect.right) / 2 / window.innerWidth,
          y: (rect.top + rect.bottom) / 2 / window.innerHeight
        }
      };
      confetti(confettiProps);
    }
  };

  const mergedClassName = `relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 ${className?.join(" ")}`;

  return (
    <Button
      ref={buttonRef}
      disableRipple
      className={mergedClassName}
      size={size}
      onPress={handleConfetti}
      color={color}
    >
      {children}
    </Button>
  );
};

export default CustomButton;