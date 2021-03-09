#!/usr/bin/env node
const path = require("path");
const package = require("../package.json");
const prompt = require("../src/utils/prompt.js");
const command = require("../src/utils/command.js");
const template = require("../src/utils/template.js");

// Set the cli version
command.version(package.version);

command.create("new", "create a new project", () => {
  const questions = prompt.setQuestions([
    {
      name: "project",
      message: "What is the name of your project?",
      default: "webkit",
    },
    {
      name: "framework",
      type: "list",
      message: "What css framework will you use?",
      choices: ["tailwindcss", "bootstrap", "none"],
    },
    {
      name: "stack",
      type: "list",
      message: "que stack prefieres utilizar",
      choices: ["html-css-js", "pug-postcss-js", "pug-sass-js"],
      when: (answers) => answers.framework === "none",
    },
  ]);

  prompt
    .getAnswers(questions)
    .then((answers) => {
      let choise;

      if (answers.framework === "tailwindcss") choise = answers.framework;
      if (answers.framework === "bootstrap") choise = answers.framework;
      if (answers.stack === "html-css-js") choise = answers.stack;
      if (answers.stack === "pug-postcss-js") choise = answers.stack;
      if (answers.stack === "pug-sass-js") choise = answers.stack;

      template.generate(
        path.resolve(__dirname, `../src/templates/${choise}`),
        answers.project
      );
    })
    .catch((error) => console.error(error));
});

// Active all commands (This is required)
command.activate();
