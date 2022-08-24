const http = require("node:http");
const { URL } = require("node:url");
const { handleRoutes } = require("./routes");
const { getRandomNumber } = require("../utils");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  handleRoutes(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
