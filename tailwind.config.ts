import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#f3f2f3",
        ink: "#2d2c3a",
        muted: "#ababba",
        primary: "#3090ea",
        "primary-menu": "#3d8eda",
        "case-1": "#e5e1f4",
        "case-2": "#dbede9",
        "case-3": "#dfe9f3",
        footer: "#4f4bcd",
        invert: "#ebebeb",
        success: "#1daf15",
        danger: "#c01313"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        button: "0 4px 5px rgba(48, 144, 234, 0.25)",
        "button-inner": "inset 0 0 10px rgba(255,255,255,0.5)"
      },
      screens: {
        tablet: "600px",
        desktop: "1024px"
      }
    }
  },
  plugins: []
};

export default config;
