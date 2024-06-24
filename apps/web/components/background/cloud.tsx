'use client';
import { tv } from "@nextui-org/react";
import { useEffect, useState } from "react";

const cloudStyle = tv({
    variants: {
        move: {
            "right-10": "animate-move-to-right-10",
            "right-20": "animate-move-to-right-20",
            "left-10": "animate-move-to-left-10",
            "left-20": "animate-move-to-left-20",
        }
    }
})
const Cloud = () => {
    const [clouds, setClouds] = useState<any[]>([]);
    const [cloudCount,setCloudCount] =useState(Math.floor(Math.random() * (6 - 3 + 1)) + 3);
    useEffect(() => {
        const interval = setInterval(() => {
            setCloudCount(Math.floor(Math.random() * (6 - 3 + 1)) + 3);
            setClouds(makeClouds());
        }, 20000);

        // 컴포넌트가 언마운트될 때 인터벌 정리
        return () => clearInterval(interval);
    }, []);

    const makeClouds = ()=> {
        return Array.from({ length: cloudCount }).map(() => ({
            y: Math.random() * window.innerHeight,
            width: Math.random() * 100 + 50,
            height: Math.random() * 50 + 25,
            direction: Math.random() > 0.5 ? 'left' : 'right', // 좌->우 또는 우->좌
            duration: Math.random() > 0.5 ? '10' : '20',
        }))
    }

    return (
        <div className="w-full">
            {clouds.map((cloud: any, index: number) => (
                <div key={index} className={cloudStyle({ move: `${cloud.direction as 'left' | 'right'}-${cloud.duration as '10' | '20'}` })}>
                    <div
                        className="cloud"
                        style={{
                            top: `${cloud.y}px`,
                            width: `${cloud.width}px`,
                            height: `${cloud.height}px`,
                        }}
                    >
                    </div>
                </div>
            ))}
        </div>)

}

export default Cloud;