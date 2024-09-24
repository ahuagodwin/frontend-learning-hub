/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F61FF',
        secondary: '#F9F9F9',
        tertiary: '#273748',
        white: '#ffffff',
        black: '#000000',
        gray400: '#9ca3af'
      }
    }
  },
  plugins: []
}
