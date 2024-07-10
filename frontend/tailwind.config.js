/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#354762",
        secondary: "#cfe0e5",
        third: "#65727c",
        fourth: "#d3d3d3",
        text_white: "#f5f1ea",
        text_blue: "#344d64",
        text_red: "#e50000",
      },
    },
  },
  plugins: [],
};
