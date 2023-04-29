import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif']
      },
      fontWeight: {
        bold: 'bold'
      }
    },
  },
  plugins: [],
} satisfies Config;
