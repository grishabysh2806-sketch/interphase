/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
    "./types.ts"
  ],
  theme: {
    extend: {
      colors: {
        'neo-black': '#050505',
        'neo-purple': '#2a0a4a',
        'neo-acid': '#ccff00',
        'neo-pink': '#ff00ff',
        'neo-cyan': '#00ffff',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #2a0a4a 1px, transparent 1px), linear-gradient(to bottom, #2a0a4a 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
