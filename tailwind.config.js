/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'matcha': {
          50: '#f0f7f0',
          100: '#d4e8d4',
          200: '#a8d0a8',
          300: '#7cb77c',
          400: '#5fa05f',
          500: '#4a8a4a',
          600: '#3d733d',
          700: '#325c32',
          800: '#284628',
          900: '#1e301e',
        },
        'wood': {
          50: '#faf8f5',
          100: '#f3ede4',
          200: '#e7dbc9',
          300: '#d4c0a0',
          400: '#b89968',
          500: '#a07c48',
          600: '#8a6a3e',
          700: '#6e5432',
          800: '#5c462b',
          900: '#4a3925',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4a8a4a 0%, #b89968 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px #fff' },
          '100%': { textShadow: '0 0 20px #fff, 0 0 30px #667eea' },
        }
      },
      fontFamily: {
        'mono': ['Fira Code', 'Monaco', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}