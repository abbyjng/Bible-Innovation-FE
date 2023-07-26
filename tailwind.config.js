/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/constants.ts",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        DEFAULT: "0 3px 10px rgb(0,0,0,0.2)",
      },
      fontFamily: {
        sans: ["'Noto Sans'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        slateGray: "#657786",
      },
    },
  },
  plugins: [],
};
