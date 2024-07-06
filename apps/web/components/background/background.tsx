"use client";
import React, { useState, useEffect } from 'react';
import "@/styles/custom-background.css";
import Night from './night';
import Day from './day';

import Cloud from "@repo/ui/cloud";

import { useTheme } from 'next-themes';
import Snow from '@repo/ui/snow';
interface BackgroundProps {
    remainingHeight?:string;
}
const Background = ({remainingHeight}:BackgroundProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    const boxClass = (type: string) => `w-full box ${theme == type ? "animate-spinUp" : "animate-spinDown"}`;
    return (
        <div className="relative">
            <div className={`custom-bg bg-${theme} absolute w-full`}
            style={{
                height: `calc(100vh - ${remainingHeight})`
            }}>
                <div key='dark' className={boxClass('dark')}>
                    <Night theme={theme} />
                </div>
                <div key="light" className={boxClass('light')}>
                    <Day theme={theme} />
                </div>
            </div>
            {
                theme === "dark" && (
                    <Snow maxParticle={500} animationSpeed={30} remainingHeight={remainingHeight} />
                )
            }
            <Cloud remainingHeight={remainingHeight} />
        </div>
    );
};

export default Background;
