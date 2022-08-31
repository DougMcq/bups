/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bitter: ["Bitter", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        darkYellow: "#997855",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
