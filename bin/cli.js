#!/usr/bin/env node
const prompt = require("../src/utils/prompt.js");
const command = require("../src/utils/command.js");

command.register("new", "create a new project", function () {
  const questions = prompt.setQuestions([
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
  ]);

  prompt.getAnswers(questions).then((answers) => {
    console.log(answers);
  });
});

command.activate();
