import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Pick<Config, "content" | "theme" | "darkMode" | "plugins"> = {
    content: [
        "./app/**/*.{ts,tsx,css}",
        "./components/**/*.{ts,tsx,css}",
        "./styles/**/*.{ts,tsx,css}",
        "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/src/**/*.{tsx,ts,css}", // for packages/ui only
        "../../packages/ui/provider/*.ts" // for nextui provider
    ],
    darkMode: ["class"],
    plugins: [nextui()],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                "spin-down": {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-180deg)' },
                },
                "spin-up": {
                    '0%': { transform: 'rotate(180deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
                "move-to-left": {
                    "0%": { transform: 'translateX(100%)' },
                    "100%": { transform: 'translateX(-100%)' }
                },
                "move-to-right": {
                    "0%": { transform: 'translateX(-100%)' },
                    "100%": { transform: 'translateX(100%)' },
                }
            },
            animation: {
                'orbit-test': 'spin 1s linear infinite',
                'spinUp': 'spin-up 1s linear',
                'spinDown': 'spin-down 1s linear',
                "move-to-left-20": 'move-to-left 20s linear infinite',
                "move-to-right-20": 'move-to-right 20s linear infinite',
                "move-to-left-10": 'move-to-left 10s linear infinite',
                "move-to-right-10": 'move-to-right 10s linear infinite',
            },
        }
    },
}


export default config;