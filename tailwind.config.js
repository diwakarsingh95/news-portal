/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F8F8F8",
        gray: "#949494"
      },
      screens: {
        "2xl": "1440px"
      }
    }
  },
  plugins: []
};
