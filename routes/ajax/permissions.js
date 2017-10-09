"use strict";
/**
 * Created by rocky on 2017/10/9.
 */
const express = require('express');
const router = express.Router();

/*
 * 权限校验
 */
router.use("*", (req, res, next) => {

});


/**
 * 添加集合上传权限
 */
router.get("/upload", (req, res, next) => {
});

/**
 * 添加
 */

module.exports = router;
