const inquirer = require("inquirer");

function setQuestions(questions) {
  return inquirer.prompt(questions).then((answers) => {
    return answers;
  });
}

async function getAnswers(promise) {
  const answers = await promise;
  return answers;
}

module.exports = { setQuestions, getAnswers };
