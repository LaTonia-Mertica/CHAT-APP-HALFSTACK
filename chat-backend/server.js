const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors());
const bodyParser = require("body-parser");
server.use(bodyParser.json());

let messages = [
  {
    text: "message outbound",
    received: false,
    timestamp: new Date(),
  },
  {
    text: "computer generated response",
    received: true,
    timestamp: new Date(),
  },
  {
    text: "message inbound",
    received: true,
    timestamp: new Date(),
  },
];

server.get(`/messages`, (req, res) => {
  res.send({ messages });
});

server.post(`/messages`, (req, res) => {
  console.log(req.body);
  messages.push(req.body);
  res.send({ messages: messages });
});

server.put("/messages/:index", (req, res) => {
  messages[req.params.index].text = req.body.text;
  res.send({ messages });
});

server.delete("/messages/:index", (req, res) => {
  messages.splice(req.params.index, 1);
  res.send({ messages });
});

server.get("/", (req, res) => {
  res.send("Hello Code World");
});

server.listen(3001, () => {
  console.log(`Backend Server Listening on Port 3001`);
});
