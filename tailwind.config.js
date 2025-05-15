/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'roboto-condensed': ['var(--font-roboto-condensed)', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };