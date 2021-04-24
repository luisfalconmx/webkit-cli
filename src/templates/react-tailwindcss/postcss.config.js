const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')

module.exports = ({ env }) => ({
  plugins: [tailwindcss(), autoprefixer()]
})
