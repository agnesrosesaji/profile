/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#681D35',
          dark: '#501528',
          deep: '#421021',
          muted: '#8C4058',
          light: '#B26E83',
          subtle: '#F4EBEF',
        },
        cream: {
          DEFAULT: '#F7F3EF',
          soft: '#FAF8F5',
          dark: '#EFEAE3',
          border: '#E8E2DC',
        },
        charcoal: {
          DEFAULT: '#282326',
          muted: '#777078',
          light: '#A09A9E',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(40, 35, 38, 0.05)',
        hover: '0 12px 30px -4px rgba(104, 29, 53, 0.12)',
        modal: '0 20px 50px -10px rgba(40, 35, 38, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
