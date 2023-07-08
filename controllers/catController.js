const express = require("express");
const router = express.Router();

let cArray = require("../models/category");

router.get("/", (req, res) => {
  res.status(200).send(cArray);
});

router.post("/", (req, res) => {
    const newItem = req.body;

    if (!newItem || newItem.category == '' || !newItem.hasOwnProperty('category')) {
      res.redirect("/category");
    } else if (cArray.some(item => newItem.category.includes(item))) res.status(409).json({ error: 'Value already exists in the array.' })
    else {
      cArray = cArray.concat(newItem.category);
      //when new category created, send back all
      res.status(201).json(cArray);
    }
  });

  module.exports = router