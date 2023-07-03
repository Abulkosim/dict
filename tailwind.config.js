/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: "white",
      bluish: "#00203F",
      lightBluish: "#00203FAA",
      greenish: "#adefd1ff",
      lightGreenish: "#adefd1BB",
    },
  },
  plugins: [],
};