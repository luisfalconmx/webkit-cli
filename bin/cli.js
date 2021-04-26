#!/usr/bin/env node
const path = require('path')
const { version } = require('../package.json')
const { program } = require('commander')
const inquirer = require('inquirer')
const colors = require('colors/safe')
const copy = require('recursive-copy')

// Set the cli version
program.version(version)

program
  .command('new')
  .description('create a new project')
  .action(() => {
    inquirer
      .prompt([
        {
          name: 'project',
          message: 'What is the name of your project?',
          default: 'my-project'
        },
        {
          name: 'template',
          type: 'list',
          message: 'Select the template you will use',
          choices: ['react-tailwindcss', 'react-bootstrap']
        }
      ])
      .then(async ({ project, template }) => {
        await copy(
          path.resolve(__dirname, `../templates/${template}`),
          process.cwd() + `/${project}`,
          { overwrite: true, dot: true },
          (err) => err && console.error('Copy failed: ' + err)
        )
        console.log(colors.green('terminado con exito'))
      })
      .catch((err) => console.error(err))
  })

// Active all commands (This is required)
program.parse(process.argv)
