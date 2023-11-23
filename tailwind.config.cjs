/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans"],
        raleway: ["Raleway", "sans"],
      },
    },
  },
  darkMode: "class",
};
