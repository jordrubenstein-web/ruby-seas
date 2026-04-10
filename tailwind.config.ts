import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050B14",
          900: "#0A1628",
          800: "#0F2341",
          700: "#163056",
        },
        seafoam: {
          400: "#56C5B0",
          500: "#3AAFA9",
          600: "#2B8A7E",
        },
        pearl: "#F8F9FA",
        slate: {
          100: "#E2E8F0",
          400: "#94A3B8",
          700: "#334155",
        },
        accent: "#D4AF37",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      animation: {
        pulseSlow: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
