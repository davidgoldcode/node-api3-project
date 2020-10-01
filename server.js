const express = require("express");
const morgan = require("morgan");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

//custom middleware
const logger = morgan("combined"); // global

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

module.exports = server;
