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

// Common Validations for questions
const notEmptyField = async (input) => {
  if (input === '') {
    return 'This field is required'
  }
  return true
}

// Commands
program
  .command('new')
  .description('create a new project')
  .action(() => {
    inquirer
      .prompt([
        {
          name: 'project',
          type: 'input',
          message: 'What is the name of your project?',
          default: 'my-project',
          validate: notEmptyField
        },
        {
          name: 'template',
          type: 'list',
          message: 'Select the template you will use',
          choices: ['react-tailwindcss']
        },
        {
          name: 'branch',
          type: 'list',
          message: 'Default branch for repository',
          choices: ['main', 'master', 'stable']
        }
      ])
      .then(({ project, template, branch }) => {
        const srcPath = path.resolve(__dirname, `../templates/${template}`)
        const destPath = process.cwd() + `/${project}`

        const tasks = new Listr([
          {
            title: 'Create directory',
            task: () => {
              if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true })
              } else {
                throw new Error('Directory already exists')
              }
            }
          },
          {
            title: 'Copy files',
            task: () => {
              // Copy all files
              copy(`${srcPath}/**/*`, destPath, (err) => {
                if (err) throw new Error(err)
              })

              // Copy all dot files
              copy(`${srcPath}/**/.*`, destPath, (err) => {
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
            console.log()
            console.log(
              colors.green('🎉 ', 'The project was built successfully')
            )
            console.log()
            console.log('Now run the following commands:')
            console.log(colors.cyan(`cd ${project}`))
            console.log(colors.cyan('npm start'))
            console.log()
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(colors.red('Error creating project'))
        console.error(colors.red(err))
      })
  })

// Active all commands (This is required)
program.parse(process.argv)
