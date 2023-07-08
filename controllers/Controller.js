const express = require("express");
const router = express.Router();

let transactionArray = require("../models/transactions");

router.get("/", (req, res) => {
  res.status(200).send(transactionArray);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!transactionArray.some(item => item.id == id)) {
    res.redirect("/transactions");
  } else {
    res.status(200).json(transactionArray.find(item => item.id == id));
  }
});

router.post("/", (req, res) => {
  const newItem = req.body;

  if (!newItem) {
    res.redirect("/transactions");
  } else {
    transactionArray = [...transactionArray, ...newItem];
    //when new entry created, send back all
    res.status(201).json(transactionArray);
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (!transactionArray.some(item => item.id == id)) {
    res.redirect("/transactions");
  } else {
    transactionArray = transactionArray.filter(item => item.id !== id);
    //consider 204 response
    res.json(transactionArray);
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  if (Object.values(req.body).length < 5) res.redirect('/')

  if (!transactionArray.some(item => item.id == id)) {
    res.redirect("/");
  } else {
    //req.body must include id
    transactionArray = transactionArray.map(item => {
      if (item.id == id) return req.body
      else if (item.id !== id) return item
    })
    res.status(200).json(transactionArray);
  }
});

module.exports = router;