#!/usr/bin/env node

const quotes = require("../data/quotes.json");

// docs: https://www.npmjs.com/package/chalk/v/4.1.2
const chalk = require("chalk");

// docs: https://www.npmjs.com/package/inquirer/v/8.2.4
const inquirer = require("inquirer");

const nanospinner = require("nanospinner");

const gradient = require("gradient-string");

// TODO (optional): implement chalk-animation

const getFormattedOutput = (quote = "", author = "") => {
  const symbol = chalk.magenta;
  const q = chalk.yellow(quote);
  const a = chalk.cyan(author);
  const output = `${symbol("«")}${q}${symbol("»")} ${symbol("⸺")} ${a}`;
  return output;
};

const authors = ["Random", ...new Set(quotes.map((el) => el.author))];

const questions = [
  {
    type: "list",
    name: "author",
    message: "Select an autor: ",
    default: "random",
    choices: authors,
  },
];

console.log(
  gradient.rainbow.multiline(
    [
      `__        __   _                          _  `,
      `\\ \\      / /__| | ___ ___  _ __ ___   ___| | `,
      ` \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ | `,
      `  \\ V  V /  __/ | (_| (_) | | | | | |  __/_|  `,
      `   \\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___(_) `,
    ].join("\n")
  )
);
console.log("\n");
console.log(gradient.rainbow("###   Programming Quotes CLI Tool.   ###"));

const spinner = nanospinner
  .createSpinner("Fetching programming quotes ... \n")
  .start();

setTimeout(() => {
  spinner.success();
  inquirer
    .prompt(questions)
    .then((answers) => {
      // Use user feedback
      if (answers.author === "Random") {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        const output = getFormattedOutput(
          randomQuote.quote,
          randomQuote.author
        );
        console.log(output);
      } else if (answers.author) {
        const quotesFromSelectedAuthor = quotes.filter(
          (q) => q.author === answers.author
        );
        const randomIndex = Math.floor(
          Math.random() * quotesFromSelectedAuthor.length
        );
        const selectedQuote = quotesFromSelectedAuthor[randomIndex];
        const output = getFormattedOutput(
          selectedQuote.quote,
          selectedQuote.author
        );
        console.log(output);
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log(error);
        process.exit(1);
      } else {
        // Something else went wrong
        console.log(error);
        process.exit(2);
      }
    });
}, 1000);
