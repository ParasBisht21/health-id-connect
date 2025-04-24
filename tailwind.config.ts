
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
        border: "#333333", // Keeping existing border color
        background: {
          DEFAULT: '#121212',
          dark: '#0A0A0A',
        },
        brand: {
          green: '#10B981',
          cyan: '#22D3EE',
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground))', // Added foreground color definition
        },
      },
      textColor: {
        foreground: 'hsl(var(--foreground))', // Added text color utility
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
