#!/usr/bin/env node
const path = require('path')
const { version } = require('../package.json')
const { program } = require('commander')
const inquirer = require('inquirer')
const colors = require('colors/safe')
const Listr = require('listr')
// const execa = require('execa')
const fs = require('fs')
const copy = require('copy')

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
        },
        {
          name: 'branch',
          type: 'list',
          message: 'Select the template you will use',
          choices: ['main', 'master']
        }
      ])
      .then(({ project, template, branch }) => {
        const srcPath = path.resolve(__dirname, `../templates/${template}`)
        const destPath = process.cwd() + `/${project}`

        const tasks = new Listr([
          {
            title: 'Copy Files',
            task: () => {
              if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true })
              } else {
                throw new Error('Directory already exists')
              }

              // Copy all files
              copy(`${srcPath}/*`, destPath, (err) => {
                if (err) throw new Error(err)
              })

              // Copy dot files
              copy(`${srcPath}/.*`, destPath, (err) => {
                if (err) throw new Error(err)
              })
            }
          }
        ])

        tasks.run().catch((err) => {
          console.error(err)
        })
      })
      .catch((err) => console.error(colors.red(err)))
  })

// Active all commands (This is required)
program.parse(process.argv)
