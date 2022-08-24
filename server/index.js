const http = require("node:http");
const { URL } = require("node:url");

const hostname = "127.0.0.1";
const port = 3000;

const quotes = require("../data/quotes.json");

function home(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`Welcome to Programming Quotes!`);
}

function random(req, res) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
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
      // by author route
      byAuthor(req, res);
      break;

    default:
      // no match found.
      notFound(req, res);
      break;
  }
}

const server = http.createServer((req, res) => {
  handleRoutes(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
