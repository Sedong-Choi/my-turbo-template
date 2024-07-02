import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import customTheme from "./custom-theme";
const config: Pick<Config, "content" | "theme" | "darkMode" | "plugins"> = {
    content: [
        "./app/**/*.{ts,tsx,css}",
        "./components/**/*.{ts,tsx,css}",
        "./styles/**/*.css",
        "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/src/**/*.{tsx,ts,css}", // for packages/ui only
        "../../packages/ui/provider/*.ts" // for nextui provider
    ],
    darkMode: ["class"],
    plugins: [nextui()],
    theme: customTheme,
}


export default config;