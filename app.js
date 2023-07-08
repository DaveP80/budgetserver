const express = require("express");
const Controller = require("./controllers/Controller");
const Category = require("./controllers/catController");
const Enable = require('./controllers/enableController')
const cors = require('cors')
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(cors())
app.use(logger('dev'))

app.get("/", (req, res) => {
  res.send("Welcome to Budgeting");
});

app.use("/transactions", Controller);
app.use("/category", Category);
app.use("/enable", Enable);

app.get("*", (req, res) => {
  res.status(404).send("Page not Found");
});

module.exports = app;