/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'md' : { 'raw': '(width < 900px)'},
      'sm' : { 'raw': '(width < 600px)'},
    }
  },
  plugins: [],
}

