const { program } = require("commander");

function register(command = "", description = "", action) {
  program.command(command).description(description).action(action);
}

function activate() {
  program.parse(process.argv);
}

module.exports = { register, activate };
