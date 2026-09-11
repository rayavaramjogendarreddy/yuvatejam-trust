import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0A192F",
          slate: "#1E293B",
          red: "#DC2626",
          darkRed: "#991B1B",
          gold: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
