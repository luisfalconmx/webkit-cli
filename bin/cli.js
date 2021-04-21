#!/usr/bin/env node
const path = require('path')
const { version } = require('../package.json')
const prompt = require('../src/utils/prompt.js')
const command = require('../src/utils/command.js')
const template = require('../src/utils/template.js')
const colors = require('colors/safe')

// Set the cli version
command.version(version)

command.create('new', 'create a new project', () => {
  const questions = prompt.setQuestions([
    {
      name: 'project',
      message: 'What is the name of your project?',
      default: 'my-project'
    },
    {
      name: 'framework',
      type: 'list',
      message: 'What css framework will you use?',
      choices: ['tailwindcss']
    }
  ])

  prompt
    .getAnswers(questions)
    .then((answers) => {
      const message = () => {
        console.log('')
        console.log(colors.green('Your project was created successfully!'))
        console.log(
          'Now run the following commands to finish the installation:'
        )
        console.log('')
        console.log(colors.magenta('cd ' + answers.project))
        console.log(colors.magenta('npm install'))
        console.log(colors.magenta('npm start'))
      }

      template.generate(
        path.resolve(__dirname, `../src/templates/${answers.framework}`),
        answers.project,
        message
      )
    })
    .catch((error) => {
      console.log('')
      console.log(
        colors.red('Something went wrong when creating your project :(')
      )
      console.error(error)
    })
})

// Active all commands (This is required)
command.activate()
