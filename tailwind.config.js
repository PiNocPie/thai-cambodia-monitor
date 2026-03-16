/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0f14',
          800: '#0f1419',
          700: '#1a2332',
          600: '#243040',
          500: '#2d3e50',
        },
      },
    },
  },
  plugins: [],
}
