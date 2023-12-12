/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quoter: ['"Outfit"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
