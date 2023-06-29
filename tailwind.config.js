/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    colors: {
      primary: '#ffe600',
      secondary: '#ffc700',
      // ...
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-rtl'),
    require("flowbite/plugin")
  ],
}

