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
          red: "#C8102E",
          darkRed: "#9E0B22",
          lightRed: "#FEF2F2",
          navy: "#0F172A",
          slate: "#1E293B",
          gold: "#F59E0B",
          goldHover: "#D97706",
          grayBg: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};
export default config;
