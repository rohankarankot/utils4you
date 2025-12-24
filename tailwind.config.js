/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e1e9ff",
          200: "#c8d6ff",
          300: "#a1b8ff",
          400: "#7189ff",
          500: "#4f46e5",
          600: "#3b31ce",
          700: "#2f26ab",
          800: "#28218a",
          900: "#24206f",
          950: "#151341",
        },
        accent: {
          light: "#06b6d4",
          DEFAULT: "#0891b2",
          dark: "#0e7490",
        },
        surface: {
          light: "#ffffff",
          dark: "#0f172a",
        },
      },
      fontFamily: {
        heading: ["Outfit", "Inter", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
