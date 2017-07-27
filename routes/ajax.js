"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const express = require('express');
const router = express.Router();
const {isNull} = require("lodash");
const formidable = require("formidable");
const mkdirp = require("mkdirp");
const {buildCachePath, getLogger, deleteFile} = require("../core");
const logger = getLogger("routes/ajax");
const fs = require("fs");
const async = require("async");
const cachePath = buildCachePath("");
const {getIconByHash, insertAuditIcon} = require("../core/bll/icons");
const {getProjects} = require("../core/bll/projects");
//创建文件上传缓存目录
mkdirp(cachePath, (err) => {
    logger.info("创建缓存文件目录", err);
});
/**
 * 跨域校验上传权限
 */
router.use("/svg/upload", (req, res, next) => {
    if(req.method == "OPTIONS" || req.method == "GET") {
        res.outJson();
    } else {
        next();
    }
});

/**
 * svg上传
 */
router.post("/svg/upload", (req, res, next) => {
    let userInfo = res.locals.userInfo;
    let form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = cachePath; //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 1 * 1024 * 1024;   //文件大小
    form.hash = "md5";
    form.parse(req, (err, fields, files) => {
        let file = files.file;
        if(err || "image/svg+xml" != file.type) {
            deleteFile(file.path);
            res.outJson(null, "文件上传失败");
            return;
        }
        let hash = file.hash;
        let name = file.name.replace(".svg", "");
        async.waterfall([(cb) => {
            //排查是否已经存在该字体
            getIconByHash(hash, (err, rs) => {
                console.log(999, err, rs);
                cb(err || (isNull(rs) ? rs: "hash of icon is exist"));
            });
        }, async.apply(fs.readFile, file.path, "utf8"),
        (svgContent, cb) => {
            insertAuditIcon({
                userId: userInfo.userId,
                name : name,
                hash : hash,
                svg : svgContent,
            }, cb)
        }],(err, auditId) => {
            if(err) {
                res.outJson(null, "失败 : " + err);
                return;
            }
            res.outJson({
                auditId :  auditId
            }, "成功");
        });
    });
});

/**
 * 获取系统项目列表
 */
router.get("/project/list", (req, res, next) => {
    let query = req.query;
    let page = query.page || 1;
    let size = query.size || 30;
    let type = parseInt(query.type, 10) === 1 ? 1 : 0;
    getProjects({
        type : type
    }, page, size, (err, rs) => {

    });


    res.send("");
});

module.exports = router;
