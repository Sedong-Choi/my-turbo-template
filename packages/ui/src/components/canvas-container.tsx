
import { useEffect, useRef, useState } from 'react'

import { Animation, type AnimationType } from '../animations';
interface CanvasContainerProps {
    remainingHeight?: string
    width?: number;
    height?: number;
    parentRef?: React.RefObject<HTMLDivElement>;
    animations: Animations;
}
export type Animations =
    { global?: GlobalAnimationOptions } & AnimationOptions;

export type AnimationOptions = {
    snow?: ParticleFlakeProps;
    cloud?: CloudProps;
    rain?: ParticleFlakeProps;
    thunder?: ThunderProps;
}


export type AnimationObject = 'sun' | 'moon';
export type GlobalAnimationOptions =
    { objects?: AnimationObject[]; } & SharedAnimationOptionsProps;

export type SharedAnimationOptionsProps ={
    [key in SharedAnimationOptions]?: string;
}

export type SharedAnimationOptions = "theme" |"fps";


export type ThunderProps = SharedAnimationOptionsProps & {
    maxParticle?: number;
}

export type ParticleFlakeProps = SharedAnimationOptionsProps & {
    maxParticle?: number;
}
export type CloudProps = SharedAnimationOptionsProps & {
    createDuration?: number;
    maxCloud?: number;
    color?: string;
}
const CanvasContainer = (
    {
        remainingHeight,
        parentRef,
        animations,
    }: CanvasContainerProps
) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [screenWidth, setScreenWidth] = useState(parentRef?.current?.clientWidth ?? window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(parentRef?.current?.clientHeight ?? window.innerHeight - (parseFloat(remainingHeight ?? '0')));
    const [animationInstance, setAnimationInstance] = useState<Animation | null>(null);

    useEffect(() => {
        if (!canvasRef.current || animationInstance) return;

        const initAnimation = new Animation(canvasRef.current);
        for (let type of Object.keys(animations) as (keyof Animations)[]) {
            if (type === 'global') {
                initAnimation.setOptions(animations['global']);
            } else {
                initAnimation.add(type as AnimationType, animations[type]);
            }
        }
        setAnimationInstance(initAnimation);

        initAnimation.animate();
        console.log('animation started', initAnimation);
        window.addEventListener('resize', handleResize);
        if (parentRef?.current) {
            setScreenWidth(parentRef.current.clientWidth);
            setScreenHeight(parentRef.current.clientHeight);
        }
        return () => {
            initAnimation.destroy();
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleResize = (event: Event) => {
        const target = parentRef?.current ?? event.target;
        if (target instanceof Window) {
            setScreenWidth(target?.innerWidth);
            setScreenHeight(target?.innerHeight - (parseFloat(remainingHeight ?? '0')));
        }
        if (target instanceof HTMLDivElement) {
            setScreenWidth(target.clientWidth);
            setScreenHeight(target.clientHeight);
        }
    };
    return (
        <canvas
            ref={canvasRef}
            width={screenWidth}
            height={screenHeight}
            className="relative -translate-x/2 -translate-y/2"
        >
        </canvas>
    )
}

export default CanvasContainer;