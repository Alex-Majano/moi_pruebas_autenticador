import PrimeUI from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-primary': {
          500: '#2D52A8',
          700: '#3862c4',
          900: '#2D52A899'
        },
        'custom-success': {
          500: '#4EAC4C',
          700: '#C0FFBB',
        },
        'custom-error': {
          500: '#AC4C4C',
          900: '#e24c4c',
          700:  '#FFBBBB',
        },
        'custom-warning': {
          500:  '#AC914C',
          700: '#FFF0BB',
        },
        menu: {
          500: '#000033',
          700: '#00003399',
        },
        'custom-secondary': {
          500: '#D0E6FF'
        },
        background: '#F4F7FD',
        banner: '#4A4A4A',
      }
    },
    screens: {
      'xs': '280px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [PrimeUI],
}
