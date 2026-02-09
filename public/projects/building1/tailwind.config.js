/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        construction: {
          yellow: "#FFB800",
          black: "#1A1A1A",
          gray: "#F3F4F6",
          dark: "#262626",
        },
      },
      backgroundImage: {
        "stripe-pattern":
          "linear-gradient(45deg, #1A1A1A 25%, #FFB800 25%, #FFB800 50%, #1A1A1A 50%, #1A1A1A 75%, #FFB800 75%, #FFB800 100%)",
      },
    },
  },
  plugins: [],
};

