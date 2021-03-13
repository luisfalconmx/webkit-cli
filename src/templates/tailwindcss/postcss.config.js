const postcssPresetEnv = require("postcss-preset-env");
const postcssEasyImport = require("postcss-easy-import");
const postcssSimpleVars = require("postcss-simple-vars");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    autoprefixer(),
    postcssEasyImport(),
    postcssPresetEnv({ stage: 0 }),
    postcssSimpleVars(),
    tailwindcss(),
  ],
};
