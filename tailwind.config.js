/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#282846",
        "primary-light": "#434377",
        accent: "#ff9a68",
      },
    },
  },
  plugins: [],
};
