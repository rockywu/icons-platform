"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const {isFunction, isObject} = require("lodash");
let path = require("path");
let log4js = require("log4js");
let fs = require("fs");
log4js.configure({
    appenders: {
        out : {
            type: 'file',
            filename: '../logs/system.log',
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'trace' },
    },
});
let logger = getLogger("core/index");

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



module.exports = {
    getCallback,
    getLogger,
    buildPath,
    buildCachePath,
    deleteFile,
}
