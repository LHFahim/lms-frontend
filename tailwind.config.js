/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        aqua: '#3475e5',
      },
    },
  },
  plugins: [require('daisyui')],
  // daisyui: {
  //   themes: false,
  // },
};
