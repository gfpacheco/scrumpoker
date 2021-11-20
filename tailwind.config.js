module.exports = {
  purge: ['./public/index.html', './src/**/*.js'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Noto Serif', 'serif'],
      },
      fontSize: {
        '10xl': '10rem',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
};
