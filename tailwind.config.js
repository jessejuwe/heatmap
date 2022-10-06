/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        adapt: {
          h1: 'clamp(3rem, 1rem + 10vw, 7rem)',
          p: 'clamp(1rem, 0.5rem + 10vw, 1.5rem)',
        },
      },
      fontFamily: {
        catamaran: ['Catamaran', 'sans-serif'],
        mouseMemoirs: ['"Mouse Memoirs"', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        squarePeg: ['"Square Peg"', 'cursive'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        col: {
          sky: 'rgb(var(--color-sky) / <alpha-value>)',
          purple: 'rgb(var(--color-purple) / <alpha-value>)',
          pink: 'rgb(var(--color-pink) / <alpha-value>)',
          emerald: 'rgb(var(--color-emerald) / <alpha-value>)',
          orange: 'rgb(var(--color-orange) / <alpha-value>)',
          darkBlue: 'rgb(var(--color-darkBlue) / <alpha-value>)',
          darkPink: 'rgb(var(--color-darkPink) / <alpha-value>)',
        },
      },
      screens: {
        small: '450px', // => @media (min-width: 450px) { ... }
        mid: '500px', // => @media (min-width: 500px) { ... }
        big: '900px', // => @media (min-width: 900px) { ... }
        bigger: '1200px', // => @media (min-width: 1200px) { ... }
        large: '2000px', // => @media (min-width: 2000px) { ... }
      },
    },
  },
  plugins: [],
};
