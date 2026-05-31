/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      //  إضافة الخط
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },

    
      keyframes: {
        "shooting-star": {
          "0%": {
            transform: "translate(0px, 0px) rotate(45deg)",
            opacity: "0"
          },
          "10%": {
            opacity: "1"
          },
          "90%": {
            opacity: "1"
          },
          "100%": {
            transform: "translate(800px, -500px) rotate(45deg)",
            opacity: "0"
          }
        }
      },

      animation: {
        "shooting-star": "animation: shooting 4s linear infinite;",
      },

    },
  },
  plugins: [],
};

  