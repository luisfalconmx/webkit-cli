const copy = require("recursive-copy");
const options = {
  overwrite: false,
  dot: true,
};

function generate(source = "", dest = "") {
  copy(source, process.cwd() + `/${dest}`, options, function (error) {
    if (error) console.error("Copy failed: " + error);
  });
}

module.exports = { generate };
