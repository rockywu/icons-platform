"use strict";
/**
 * Created by rocky on 2017/10/11.
 */
const {logs} = require("../tables");
const {testAsyncFunc} = require("node-mysql-dao");
const {
    EXCEPTION_NONE_RESULT,
    EXCEPTION_ARGUMENTS
} = require("../constants");
const {forEach, mapValues} = require("lodash");

const LOG_TYPES = {
    PERMISSIONS : 1,
};

/**
 * 添加permission日志
 * @param uid 操作人
 */
function operatePermissionLog(uid = 0, content = "", cb = () => {}) {
    logs.insert({
        uid : uid,
        type : LOG_TYPES.PERMISSIONS,
        content : JSON.stringify(content)
    }, (err, rs) => {
        cb(null, rs);
    });
}

module.exports = {
    operatePermissionLog
};
