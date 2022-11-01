/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B2434",
        secondary: "#F5F5F5",
        primaryFont: "#2B283A",
        secondaryFont: "#4A4E74",
        accent: "#59E391",
      },
      fontFamily: {
        karla: "Karla",
        inter: "Inter",
      },
    },
  },
  plugins: [],
};
