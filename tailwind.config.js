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
            background: "rgb(229 231 235)",
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
            background: "rgb(229 231 235)",
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

/*


background-attachment: scroll;
background-clip: border-box;
background-color: rgba(209, 213, 219, 0.5);
background-image: none;
background-origin: padding-box;
background-position-x: 0%;
background-position-y: 0%;
background-repeat-x: repeat;
background-repeat-y: repeat;
background-size: auto;

*/