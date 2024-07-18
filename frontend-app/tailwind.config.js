/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      flexGrow: {
        2: 2,
      },
      fontFamily: {
        inter: ["Inter"],
        oswald: ["Oswald"],
        lato: ["Lato"],
        nunito: ["nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
