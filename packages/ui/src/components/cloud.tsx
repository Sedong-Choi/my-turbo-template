
import { useEffect, useRef, useState } from 'react'

import { CloudFlow } from '../animations/cloudFlow';
interface CloudProps {
    navHeight?: string
}
const Cloud = (
    { navHeight }: CloudProps
) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight - (parseFloat(navHeight ?? '0')));
    const [cloudInstance, setCloudInstance] = useState<CloudFlow | null>(null)

    useEffect(() => {
        console.debug('Clouds useEffect');
        if (!canvasRef.current) return;
        const initCloudInstance = new CloudFlow(canvasRef.current);
        setCloudInstance(initCloudInstance);
        initCloudInstance.draw();
        window.addEventListener('resize', handleResize);
        return () => {
            initCloudInstance.destroy();
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleResize = (event: Event) => {
        ``
        if (event.target instanceof Window) {
            setScreenWidth(event.target.innerWidth);
            setScreenHeight(event.target.innerHeight);
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={screenWidth}
            height={screenHeight}
            style={{ position: 'fixed'}}>
        </canvas>
    )
}

export default Cloud;