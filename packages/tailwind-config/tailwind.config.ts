import type { Config } from "tailwindcss";
import {nextui} from '@nextui-org/react';
const config: Omit<Config, "content" | "theme" | "darkMode" | "plugins"> = {
    mode: 'jit',
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",// for web 
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // for web 
        "./src/**/*.{js,ts,jsx,tsx,mdx}", // for storybook & ui package
        "./components/**/*.{js,ts,jsx,tsx,mdx}", // for ui
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // for ui
        "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // project root directories for apps
    ],
    darkMode: ["class",'[data-mode="dark"]'],
    plugins: [nextui()],
}


export default config;