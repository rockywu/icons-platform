"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const {isFunction} = require("lodash");
let log4js = require("log4js");
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

module.exports = {
    getCallback,
    getLogger
}
