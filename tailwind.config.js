/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#effef6',
          100: '#d8fbe8',
          500: '#10b981',
          600: '#0e9f6e',
          700: '#0a7a54',
          900: '#054130'
        },
        warm: {
          100: '#fff7df',
          300: '#f8dd84',
          500: '#f4c95d',
          700: '#c28f18'
        }
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(15, 118, 110, 0.35)',
        card: '0 14px 35px -18px rgba(15, 23, 42, 0.25)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};