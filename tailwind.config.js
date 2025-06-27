/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}', // if you're using app directory (Next.js)
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', // Enables use of 'dark:' variants via a class
    theme: {
      extend: {},
    },
    plugins: [],
  };
  