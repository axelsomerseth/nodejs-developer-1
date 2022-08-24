const http = require("node:http");
const { getRandomNumber } = require("../utils");

// Data
const quotes = require("../data/quotes.json");

function home(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`Welcome to Programming Quotes!`);
}

function random(req, res) {
  const randomIndex = getRandomNumber(quotes.length);
  const randomQuote = quotes[randomIndex];
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`${"«"}${randomQuote.quote}${"»"} ${"⸺"} ${randomQuote.author}`);
}

// Example: http://localhost:3000/by-author?author=Stephen
function byAuthor(req, res) {
  const { searchParams } = new URL(`http://${req.url}`);
  const quotesFound = quotes.filter((q) =>
    q.author.toLowerCase().includes(searchParams.get("author").toLowerCase())
  );
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(quotesFound));
  res.end();
}

function notFound(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Page/route not found.");
}

function handleRoutes(req, res) {
  switch (req.url) {
    case "/":
      // home route
      home(req, res);
      break;

    case "/random":
      // random route
      random(req, res);
      break;

    case req.url.match(/\/by\-author\?author=[\w]*/)?.input:
      // by author route with query param `author`
      byAuthor(req, res);
      break;

    default:
      // no match found.
      notFound(req, res);
      break;
  }
}

module.exports = { handleRoutes };
