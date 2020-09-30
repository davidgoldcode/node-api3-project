const express = require("express");
const morgan = require("morgan");

const server = express();
const log = morgan("combined");

//custom middleware

function logger(req, res, next) {
  console.log(req.headers);
  next();
}

server.use(express.json());
server.use(log);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
