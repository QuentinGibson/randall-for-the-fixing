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
      },
      animation: {
        'bubble-rise': 'bubblerise 4s infinite ease-in'
      }

    },
  },
  plugins: [],
} satisfies Config;
