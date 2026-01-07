/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'din-blue': {
          DEFAULT: '#2D4196',
          50: '#E8EBF5',
          100: '#D1D7EB',
          500: '#2D4196',
          600: '#243477',
          700: '#1B2758',
        },
        'construction-grey': {
          DEFAULT: '#1E1E23',
          900: '#1E1E23',
        },
        'paper-white': {
          DEFAULT: '#F0F2F5',
        },
        'signal-grey': {
          DEFAULT: '#9D9D9D',
          400: '#9D9D9D',
        },
      },
      fontFamily: {
        sans: ['Archivo Variable', 'Archivo', 'system-ui', 'sans-serif'],
        narrow: ['Archivo Narrow', 'Archivo', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'din': '0.02em',
      },
      lineHeight: {
        'din': '1.5',
      },
      spacing: {
        // DIN 4px-Basis-Modul
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
      },
      maxWidth: {
        'din': '1440px', // DIN A0 quer
      },
    },
  },
  plugins: [],
}
