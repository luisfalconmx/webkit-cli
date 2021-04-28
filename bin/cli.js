#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const { version } = require('../package.json')
const { program } = require('commander')
const inquirer = require('inquirer')
const colors = require('colors/safe')
const Listr = require('listr')
const execa = require('execa')
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
          message: 'Default branch for repository',
          choices: ['main', 'master']
        }
      ])
      .then(({ project, template, branch }) => {
        const srcPath = path.resolve(__dirname, `../templates/${template}`)
        const destPath = process.cwd() + `/${project}`

        const tasks = new Listr([
          {
            title: 'Copy files',
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
          },
          {
            title: 'Install package dependencies',
            task: () => execa('npm', ['install'], { cwd: project })
          },
          {
            title: 'Initializing repository',
            task: () =>
              execa('git', ['init', `--initial-branch=${branch}`], {
                cwd: project
              })
          },
          {
            title: 'Setting up code validators',
            task: () => execa('npx', ['mrm', 'lint-staged'], { cwd: project })
          }
        ])

        tasks
          .run()
          .then(() => {
            console.log(colors.green('The project was built successfully'))
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => console.error(colors.red(err)))
  })

// Active all commands (This is required)
program.parse(process.argv)
