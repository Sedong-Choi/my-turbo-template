"use client";
import React, { useState, useEffect } from 'react';
import "@/styles/custom-background.css";
import Night from './night';
import Day from './day';
import { type GlobalAnimationOptions, type AnimationOptions, AnimationObject, SharedAnimationOptions, SharedAnimationOptionsProps } from "@repo/ui/canvasContainer";
import CanvasContainer, { type Animations } from "@repo/ui/canvasContainer";

type FixedAnimationsOptions = {
    [key in keyof AnimationOptions]: {
        [subKey in keyof AnimationOptions[key]]: AnimationOptions[key][subKey] | AnimationObject[] | undefined;
    };
};

type FixedAnimations = {
    [key in keyof Animations]: FixedAnimationsOptions;
};


import { useTheme } from 'next-themes';
import { AnimationType } from '@repo/ui/animations';
interface AnimationContainerProps {

    remainingHeight?: string;
    height?: number | string;
    width?: number | string;
    className?: string;
    options: Animations;
}


const AnimationContainer = ({ remainingHeight, width, height, className, options }: AnimationContainerProps) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const [animations, setAnimations] = useState<Animations>(options);
    const sharedOptions: SharedAnimationOptions[] = ['theme'];
    useEffect(() => {
        if (options.global) {
            // TODO deep copy
            let mergedOptions: Animations = JSON.parse(JSON.stringify(options));
            for (let type of Object.keys(options) as (keyof Animations)[]) {
                if (type !== 'global') {
                    for (let key of Object.keys(options.global) as (keyof GlobalAnimationOptions)[]) {
                        if (mergedOptions && mergedOptions[type] && key !== 'objects') {
                            if (type && sharedOptions.includes(key)) {
                                mergedOptions[type][key as SharedAnimationOptions] = options.global[key];
                            }
                        }
                    }
                }
            }
            setAnimations(mergedOptions);
        }
    }, []);


    const containerClassName = `custom-bg relative ${className ?? ''} `;


    return (
        <div className={containerClassName} ref={containerRef} style={{
            width: width ?? '100%',
            height: height ?? '100%',
        }}>
            <CanvasContainer remainingHeight={remainingHeight} parentRef={containerRef} animations={animations} />
        </div>
    );
};

export default AnimationContainer;
