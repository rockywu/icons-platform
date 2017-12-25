"use strict";
/**
 * Created by rocky on 2017/12/25.
 */
const express = require("express");
const router = express.Router();

/**
 * 字体图标服务
 */
router.get("/icons/", require("../controllers/icons"));

/**
 * 图片图标服务
 */
router.use("/images/", require("../controllers/images"));

module.exports = router;
