/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50:  '#fff5f7',
          100: '#ffe4ec',
          200: '#ffc7d9',
          400: '#ff7ea3',
          500: '#ff4f7e',
          600: '#e63a68',
          700: '#b8264f'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
