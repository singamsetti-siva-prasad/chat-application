/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "10vh": "10vh",
        "20vh": "20vh",
        "25vh": "25vh",
        "30vh": "30vh",
        "50vh": "50vh",
        "80vh": "80vh",
      },
      width: {
        "20vw": "20vw",
        "10vw": "10vw",
        "25vw": "25vw",
        "30vw": "30vw",
        "50vw": "50vw",
        "80vw": "80vw",
        "5vh": "5vh",
      },

      colors: {
        gray: "#E8F9FD",
        navy: "#0A2647",
        blue: "#144272",
        primary: "#CFFDE1",
        secondary: "#2C74B3",
        lightBlack: " #999999",
        chats: "#FDFAF6",
        button: "#9CB4CC",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
