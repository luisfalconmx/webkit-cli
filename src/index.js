const inquirer = require("inquirer");

inquirer
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
    {
      name: "linters",
      type: "checkbox",
      message: "What linters will you use in your project?",
      choices: [
        {
          name: "ESLint",
          checked: true,
        },
        {
          name: "Prettier",
          checked: true,
        },
        {
          name: "Stylelint",
          checked: false,
        },
        {
          name: "CommitLint",
          checked: false,
        },
      ],
    },
  ])
  .then((answers) => {
    console.log("Answers: ", answers);
  });
