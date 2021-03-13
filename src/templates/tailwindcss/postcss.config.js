const postcssPresetEnv = require("postcss-preset-env");
const postcssEasyImport = require("postcss-easy-import");
const postcssSimpleVars = require("postcss-simple-vars");

module.exports = {
  plugins: [
    postcssEasyImport(),
    postcssPresetEnv({ stage: 0 }),
    postcssSimpleVars(),
  ],
};
