"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
let express = require('express');
let router = express.Router();
let mkdirp = require("mkdirp");
let {buildCachePath, getLogger} = require("../core");
let logger = getLogger("routes/ajax");
let cachePath = buildCachePath("");
//创建文件上传缓存目录
mkdirp(cachePath, (err) => {
    logger("创建缓存文件目录", err);
});

/**
 * 提交文件
 * @param cb
 */
function postSvg(cb) {
    let form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = cachePath; //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 1 * 1024 * 1024;   //文件大小
    form.hash = "md5";
    form.parse(req, (err, fields, files) => {
        cb(err, fields, files);
    });
}

/**
 * 校验上传权限
 */
router.use("/svg/upload", (req, res, next) => {
    next();
});

/* GET home page. */
router.post("/svg/upload", (req, res, next) => {

});

module.exports = router;
