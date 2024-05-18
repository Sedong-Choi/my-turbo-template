import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./src/**/*.tsx",// @repo/ui 전용
  ],
  presets:[sharedConfig],
}

export default config;