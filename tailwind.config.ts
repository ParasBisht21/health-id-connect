
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#121212',
          dark: '#0A0A0A',
        },
        brand: {
          green: '#10B981',
          cyan: '#22D3EE',
        },
      },
      boxShadow: {
        'medical-card': '0 4px 15px rgba(16, 185, 129, 0.2)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
