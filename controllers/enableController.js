const express = require("express");
const router = express.Router();

let enable = require("../models/enabled");

router.get("/", (req, res) => {
    res.status(200).send(enable);
});

router.post("/", (req, res) => {
    const value = req.body;

    if (!value.hasOwnProperty('enabled') || typeof value.enabled !== 'boolean') {
        res.redirect("/enabled");
    }
    else {
        enable = [value.enabled];
        //when new category created, send back all
        res.status(201).send(enable);
    }
});
router.get("/reset", (req, res) => {

    if (!enable[0]) {
        res.status(200).send("already false");
    }
    else {
        enable = [false];
        //when new category created, send back all
        res.status(201).send(enable);
    }
});

module.exports = router