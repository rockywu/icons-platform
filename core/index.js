"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const {isFunction, isObject} = require("lodash");
let path = require("path");
let fs = require("fs");
let log4js = require("log4js");
let logConfigure =require("../config/logs");
log4js.configure(logConfigure);
let logger = getLogger("core/index");
let cryptoJsMd5 = require("crypto-js/md5");

/**
 * 获取回调函数
 * @param args
 * @return {Function}
 */
function getCallback(args) {
    args = [].slice.call(args);
    let cb = () => {};
    let ln = args.length;
    if(ln && isFunction(args[ln-1]) ) {
        cb = args[ln-1];
    } else {

    }
    return cb;
}

/**
 * 创建logger对象
 * @type {{getCallback: getCallback}}
 */
function getLogger(name) {
    return log4js.getLogger(name || "core/index");
}

/**
 * 获取当前项目路径
 */
function buildPath(filePath) {
    filePath = filePath || "";
    filePath = __dirname + "/../" + filePath;
    return path.normalize(filePath.replace("//", "/"));
}

/**
 * 获取缓存路径
 */
function buildCachePath(path) {
    path = path || "";
    return buildPath("/.cache/" + path);
}

/**
 * 删除目标文件
 */
function deleteFile(filePath = "", cb = () => {}) {
    if(!filePath) {
        logger.warn("func.deleteFile", "文件不能为空")
    }
    try {
        fs.unlink(filePath,(err) => {
            if(err) {
                logger.error("func.deleteFile", "文件删除出错", filePath);
            }
            cb(err);
        });
    } catch(e) {}
}

/**
 * 内容MD5
 * @param content
 * @return {*}
 */
function md5(content) {
    if(typeof content != "string") {
        content = content.toString();
    }
    return cryptoJsMd5(content).toString();
}

module.exports = {
    getCallback,
    getLogger,
    buildPath,
    buildCachePath,
    deleteFile,
    md5
}
