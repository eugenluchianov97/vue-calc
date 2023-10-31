/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      width: {
        '26': '6.5rem',
        '50': '13.5rem',

      }
    },
  },
  plugins: [],
}

