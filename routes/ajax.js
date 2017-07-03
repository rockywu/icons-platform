var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');

/**
 * 校验上传权限
 */
router.use("/svg/upload", function (req, res, next) {
    next();
});

/* GET home page. */
router.post("/svg/upload", function(req, res, next) {
    res.send("aaa");
});

module.exports = router;
