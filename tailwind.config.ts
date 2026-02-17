import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: "#FFFFFF",
          50: "#F8F9FA",
          100: "#F1F3F5",
          300: "#DEE2E6",
          500: "#ADB5BD",
          700: "#495057",
          900: "#212529"
        },
        primary: {
          500: "#4A6FA5",
          600: "#3F5E8E",
          700: "#334B73"
        }
      },
      fontFamily: {
        title: ["var(--font-playfair)"],
        body: ["var(--font-inter)"]
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.07)",
        lg: "0 10px 15px rgba(0,0,0,0.1)",
        xl: "0 20px 25px rgba(0,0,0,0.15)"
      }
    }
  },
  plugins: []
};

export default config;
