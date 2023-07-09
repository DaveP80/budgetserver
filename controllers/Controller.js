const express = require("express");
const router = express.Router();

let transactionArray = require("../models/transactions");

router.get("/", (req, res) => {
  res.status(200).send(transactionArray);
});

router.get("/get", (req, res) => {
  const id = req.query.id;

  if (!transactionArray.some(item => item.id == id)) {
    res.redirect("/transactions");
  } else {
    res.status(200).json(transactionArray.find(item => item.id == id));
  }
});

router.get("/reset", (req, res) => {

  if (transactionArray.length == 0) {
    res.status(200).send("already empty");
  }
  else {
    transactionArray = [];
    //when new category created, send back all
    res.status(200).send(transactionArray);
  }
});

router.post("/", (req, res) => {
  const newItem = req.body;

  let idarr = req.body.map(item => item.id)

  if (!newItem || transactionArray.some(item => idarr.includes(item.id)) || newItem.some(item => item.category === 'bank' && item.name === 'start' && parseFloat(item.value) < 100)) {
    res.status(409).send('Invalid Object details');

  } else {
    transactionArray = [...transactionArray, ...newItem].filter((item, index, array) => {
      return array.findIndex((obj) => obj.id === item.id) === index;
    });
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
    res.status(204).json(transactionArray);
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