// Tailwind doesn't support ESM (yet)
const themes = require('./themes/index.js')

module.exports = {
  content: [
    './pages/*.mjs',
    './pages/**/*.mjs',
    './components/*.js',
    './components/*.mjs',
    './components/**/*.js',
    './components/**/*.mjs',
    './page-templates/*.mjs',
    './tailwind-force.html',
  ],
  plugins: [require('daisyui'), require('tailwindcss/nesting')],
  daisyui: {
    styled: true,
    themes: [themes],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
  theme: {
    extend: {
      aspectRatio: {
        '9/16': '9 / 16'
      }
    }
  }
}
