/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#08172E',
          900: '#0B1E3D',
          800: '#122A52',
          700: '#1B3A6B',
        },
        action: {
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        amber: {
          100: '#FEF3C7',
          500: '#D97706',
          600: '#B45309',
        },
        surface: '#F6F7F9',
      },
    },
  },
  plugins: [],
};
