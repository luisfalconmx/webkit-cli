const { program } = require('commander')

function version (version = '') {
  program.version(version)
}

function create (command = '', description = '', action) {
  program.command(command).description(description).action(action)
}

function activate () {
  program.parse(process.argv)
}

function option (option = '', description = '', defaultValue) {
  program.option(option, description, defaultValue)
}

module.exports = { version, create, activate, option }
