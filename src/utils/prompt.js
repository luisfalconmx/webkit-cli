const inquirer = require("inquirer");

const init = inquirer
  .prompt([
    {
      name: "project",
      message: "What is the name of your project?",
      default: "webkit",
    },
    {
      name: "views",
      type: "list",
      message: "What will you use to create the views?",
      choices: ["html", "pug"],
    },
    {
      name: "framework",
      type: "list",
      message: "What css framework will you use?",
      choices: ["none", "tailwindcss", "bootstrap 5"],
    },
    {
      name: "styles",
      type: "list",
      message: "What css preprocessor will you use?",
      choices: ["none", "postcss", "sass"],
      when: (answers) => answers.framework === "none",
    },
  ])
  .then((answers) => {
    return answers;
  });

module.exports = { init };
