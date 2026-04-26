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
        asphalt: "#0B0B0B",
        graphite: "#171717",
        steel: "#9CA3AF",
        signal: "#FFFFFF",
        violet: "#7C3AED",
        ember: "#F97316",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 28px 90px rgba(0,0,0,0.48)",
      },
    },
  },
  plugins: [],
};

export default config;
