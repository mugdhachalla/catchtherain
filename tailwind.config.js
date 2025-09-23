// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0ea5e9",        // sky-500
          light: "#38bdf8",          // sky-400
          dark: "#0284c7",           // sky-600
          foreground: "#0b3b5a"
        },
        secondary: {
          DEFAULT: "#16a34a",        // green-600
          light: "#22c55e",
          dark: "#15803d",
          foreground: "#0a2f16"
        },
        accent: {
          DEFAULT: "#2563eb",        // blue-600
          light: "#60a5fa",
          dark: "#1d4ed8",
          foreground: "#eef2ff"
        }
      }
    },
  },
  plugins: [],
};
