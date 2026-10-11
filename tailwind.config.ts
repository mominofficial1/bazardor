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
          primary: "#05893e",
          primaryStrong: "#047f39",
          primaryContent: "#f3fbf4",
          success: "#1a9951",
          error: "#d03739",
          errorContent: "#fff6f5",
          base100: "#fafcfa",
          base200: "#f0f5f0",
          base300: "#e1e8e1",
          baseContent: "#1d271f",
          accentWarm: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-hind-siliguri)", "sans-serif"],
        bengali: ["var(--font-hind-siliguri)", "sans-serif"],
      },
      animation: {
        ticker: "ticker 35s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bazardor: {
          primary: "#05893e",
          "primary-content": "#f3fbf4",
          secondary: "#166534",
          accent: "#f59e0b",
          neutral: "#1d271f",
          "base-100": "#fafcfa",
          "base-200": "#f0f5f0",
          "base-300": "#e1e8e1",
          "base-content": "#1d271f",
          info: "#0284c7",
          success: "#1a9951",
          warning: "#f59e0b",
          error: "#d03739",
        },
      },
    ],
    defaultTheme: "bazardor",
  },
};

export default config;
