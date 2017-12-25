"use strict";
/**
 * Created by rocky on 2017/12/25.
 */

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("*", (req, res, next) => {
    res.send("aa1")
});

module.exports = router;

