"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const express = require('express');
const router = express.Router();
const formidable = require("formidable");
const mkdirp = require("mkdirp");
const {buildCachePath, getLogger} = require("../core");
const logger = getLogger("routes/ajax");
const fs = require("fs");
const cachePath = buildCachePath("");
//创建文件上传缓存目录
mkdirp(cachePath, (err) => {
    logger.info("创建缓存文件目录", err);
});

/**
 * 校验上传权限
 */
router.use("/svg/upload", (req, res, next) => {
    if(req.method == "OPTIONS" || req.method == "GET") {
        res.send("").end();
    } else {
        next();
    }
});

/* GET home page. */
router.post("/svg/upload", (req, res, next) => {
    let form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = cachePath; //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 1 * 1024 * 1024;   //文件大小
    form.hash = "md5";
    form.parse(req, (err, fields, files) => {
        let file = files.file;
        if(err || "image/svg+xml" != file.type) {
        }
        res.send("").end();
    });
});

module.exports = router;
