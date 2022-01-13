const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const restrict = require("./auth/auth-middlware");

const authRouter = require("./auth/auth-router");
const collectionsRouter = require("./collections/collections-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/collections", restrict, collectionsRouter);

const Users = require("./collections/collections-model");

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/auth/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.post("/auth", async (req, res) => {
  Users.add(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

server.use((err, req, res) => {
  // eslint disable line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
