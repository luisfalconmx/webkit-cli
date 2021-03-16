const postcssPresetEnv = require('postcss-preset-env')
const postcssEasyImport = require('postcss-easy-import')
const postcssSimpleVars = require('postcss-simple-vars')
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = ({ env }) => ({
  plugins: [
    postcssEasyImport(),
    autoprefixer(),
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true
      }
    }),
    postcssSimpleVars(),
    tailwindcss(),
    env === 'production' ? purgecss({ content: ['./**/*.html', './**/*.jsx'] }) : false,
    env === 'production'
      ? cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
      : false
  ]
})
