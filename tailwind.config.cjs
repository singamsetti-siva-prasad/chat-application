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
        gray: "#A3C7D6",
        navy: "#0A2647",
        cream: "#F7F5EB",
        blue: "#144272",
        secondary: "#2C74B3",
        lightBlack: " #999999",
      },
    },
  },
  plugins: [],
};
