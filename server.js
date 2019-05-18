const express = require("express");

const server = express();
server.use(express.json());

//custom middleware
function logger(req, res, next) {
  const { path } = req;
  const timeStamp = Date.now();
  const log = { path, timeStamp };
  console.log(`${req.method} Request`, log);
  next();
}

server.use(logger);
server.use(express.json());

const projectRoute = require("./routes/projectRoute");
const actionRoute = require("./routes/actionRoute");

server.use("/projects", projectRoute);
server.use("/actions", actionRoute);

module.exports = server;
