import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Omit<Config, "content"|"theme"|"darkMode"|"plugins"> = {
  content:[
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/*.{js,ts,jsx,tsx,mdx}", // web directories
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // web directories
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // storybook directories
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  plugins: [nextui()],
}


export default config;