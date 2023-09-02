const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#ffe600',
      secondary: '#ffc700',
      disable: '#ffe600a6',
      // ...
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-rtl'),
    require("flowbite/plugin"),
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#ffe600",
            },
            secondary: {
              DEFAULT: "#ffc700",
            },
            disable: {
              DEFAULT: "#ffe600a6",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#ffe600",
            },
            secondary: {
              DEFAULT: "#ffc700",
            },
            disable: {
              DEFAULT: "#ffe600a6",
            },
          },
        },
      }
    })
  ],
}

