const quotes = require("../data/quotes.json");
const clic = require("cli-color");

const randomIndex = Math.floor(Math.random() * quotes.length);
const randomQuote = quotes[randomIndex];
const symbol = clic.magenta;
const quote = clic.yellow(randomQuote.quote);
const author = clic.cyan(randomQuote.author);

const output = `${symbol("«")}${quote}${symbol("»")} ${symbol("⸺")} ${author}`;

console.log(output);
