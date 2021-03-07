#!/usr/bin/env node
const prompt = require("../src/utils/prompt.js");

const getAnswers = async () => {
  const answers = await prompt.init;
  console.log(answers);
};

getAnswers();
