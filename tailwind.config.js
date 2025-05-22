/** @type {import('tailwindcss').Config} */



export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Add this line for dark mode support
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        // Custom color palette for dark/light themes
        primary: {
          light: "#3b82f6", // blue-500
          dark: "#60a5fa", // blue-400
        },
        secondary: {
          light: "#f59e0b", // amber-500
          dark: "#fbbf24", // amber-400
        },
        background: {
          light: "#ffffff",
          dark: "#0f172a", // slate-900
        },
        card: {
          light: "#f8fafc", // slate-50
          dark: "#1e293b", // slate-800
        },
        text: {
          light: "#1e293b", // slate-800
          dark: "#f8fafc", // slate-50
        },
        border: {
          light: "#e2e8f0", // slate-200
          dark: "#334155", // slate-700
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fade-in-slow": "fadeIn 0.5s ease-in-out",
        spin: "spin 1s linear infinite",
        "theme-toggle": "pulse 1s ease-in-out 1",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};
