"use client";
import  { useState,useEffect } from 'react';
import "@/styles/custom-background.css";
import Night from './night';
import Day from './day';

import Cloud from "@repo/ui/cloud";

import { useTheme } from 'next-themes';
import Snow from './snow';
const Background: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted ) {
        return null;
    }
    const boxClass = (type: string) => `w-full box ${theme == type ? "animate-spinUp" : "animate-spinDown"}`;
    return (
        <div className="relative">
            <div className={`custom-bg bg-${theme} absolute w-full h-full`}>
                <div key='dark' className={boxClass('dark')}>
                    <Night theme={theme}/>
                </div>
                <div key="light" className={boxClass('light')}>
                    <Day theme={theme}/>
                </div>
            </div>
            {
                theme === "dark" && (
                    <Snow maxParticle={500} animationSpeed={30}/>
                )
            }
            <Cloud/>
        </div>
    );
};

export default Background;
