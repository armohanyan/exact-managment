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
        primary: "#1e4d4b",
        "primary-dark": "#163a38",
        "primary-soft": "rgba(30, 77, 75, 0.08)",
        accent: "#b8d430",
        "accent-hover": "#9bb82a",
        "accent-soft": "rgba(184, 212, 48, 0.15)",
        surface: "#ffffff",
        muted: "#5a5a5a",
        border: "#e6e4df",
        "placeholder-start": "#e8e6e1",
        "placeholder-end": "#d4d2cc",
        "bg-alt": "#ebe9e3",
      },
      fontFamily: {
        sans: ["var(--font-sans-active)", "system-ui", "sans-serif"],
        display: ["var(--font-display-active)", "system-ui", "serif"],
      },
      boxShadow: {
        sm: "0 2px 12px rgba(0, 0, 0, 0.06)",
        md: "0 8px 30px rgba(0, 0, 0, 0.08)",
        lg: "0 20px 50px rgba(0, 0, 0, 0.1)",
        xl: "0 24px 60px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, rgba(30, 77, 75, 0.06) 0%, rgba(184, 212, 48, 0.04) 100%)",
        "section-alt": "linear-gradient(180deg, #ebe9e3 0%, #f5f4f0 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
