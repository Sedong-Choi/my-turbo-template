import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Omit<Config, "content" | "theme" | "darkMode" | "plugins"> = {
    content:[
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/src/**/*.{tsx,ts}", // for packages/ui only
        "../../packages/ui/provider/*.ts" // for nextui provider
      ],
    darkMode: ["class"],
    plugins: [nextui()],
    theme: {
        extend: {},
    },
}


export default config;