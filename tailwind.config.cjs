/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#F3F5F7",
          75: "#E6E9ED",
          100: "#DDE1E6",
          150: "#CED4D9",
          200: "#C7CCD1",
          300: "#A2A9B0",
          400: "#878D96",
          500: "#697077",
          600: "#4D5358",
          700: "#343A3F",
          750: "#272D31",
          800: "#21262A",
          850: "#1A1E22",
          900: "#121619",
        },
        whiteAlpha: {
          50: "#FFFFFF0A",
          100: "#FFFFFF0F",
          200: "#FFFFFF14",
          300: "#FFFFFF29",
          400: "#FFFFFF3D",
        },
        green: {
          50: "#DEFBE6",
          100: "#89F6B1",
          200: "#2DE370",
          300: "#0BC355",
          400: "#06A144",
          500: "#018134",
          600: "#0C5C2C",
          700: "#044318",
          800: "#022D0E",
          900: "#071D09",
        },
        primary: {
          1: "#400709",
          2: "#080D3B",
          3: "#0D0909",
          4: "#DAD9D4",
        },
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    require("tailwindcss-intersect"),
  ],
};
