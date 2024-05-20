import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config/tailwind.config"
const config: Omit<Config, "presets"> = {
  presets:[sharedConfig]
}


export default config;