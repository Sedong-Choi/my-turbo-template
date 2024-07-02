"use client";
import { useEffect, useRef, useState } from "react";
import { SnowFlake } from "@repo/ui/animations";
interface SnowProps {
    maxParticle?: number;
    animationSpeed?: number; // {n}fps
    navHeight?: string
}
export default function Snow({ maxParticle, animationSpeed, navHeight }: SnowProps): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight - parseFloat(navHeight ?? '0'));
    const [snowflakes, setSnowFlakes] = useState<(SnowFlake | null)>(null);
    useEffect(() => {
        // canvas가 랜더링 된 후에 SnowFlake 인스턴스를 생성
        if (canvasRef.current) {
            let snowFlakeInstance = new SnowFlake(canvasRef.current);
            setSnowFlakes(snowFlakeInstance);
            if (animationSpeed) {
                snowFlakeInstance.setAnimationSpeed(animationSpeed);
            }
            return () => {
                // unMount 시에 SnowFlake 인스턴스를 제거
                snowFlakeInstance?.destroy();
                setSnowFlakes(null);
                // removeListener
                window.removeEventListener("resize", handleResize);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // SnowFlake 인스턴스가 생성되면 animation 시작
        if (snowflakes?.ctx && snowflakes?.canvas) {
            if (maxParticle) {
                snowflakes?.setMaxParticle(maxParticle);
            }
            snowflakes?.draw();
            // 이벤트 리스너 등록
            window.addEventListener("resize", handleResize);

        }
    }, [snowflakes]);

    const handleResize = (event: Event) => {
        if (event.target instanceof Window) {
            setScreenWidth(event.target.innerWidth);
            setScreenHeight(event.target.innerHeight);
        }
    };
    return (
        <canvas
            id="snow-canvas"
            ref={canvasRef}
            style={{ position: 'fixed', left: - screenWidth / 2 }}
            width={screenWidth * 2}
            height={screenHeight}
        />
    );
};
