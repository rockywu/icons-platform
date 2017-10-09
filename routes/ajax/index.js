"use strict";
/**
 * Created by rocky on 2017/10/9.
 */
const express = require('express');
const router = express.Router();

router.use("/permissions", require("./permissions"))

module.exports = router;
