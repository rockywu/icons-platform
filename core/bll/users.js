"use strict";
/**
 * Created by rocky on 2017/10/9.
 */
const {users} = require("../tables");
const {testAsyncFunc} = require("node-mysql-dao");
const {
    EXCEPTION_NONE_RESULT,
    EXCEPTION_ARGUMENTS,
    PERMISSION_GATHER_UPLOAD,
    PERMISSION_GATHER_MODIFY,
    PERMISSION_GATHER_AUDIT,
    PERMISSION_GATHER_PUBLISH,
    PERMISSION_GATHER_ADMIN
    } = require("../constants");
const {forEach, mapValues} = require("lodash");

/**
 * 获取用户基本信息
 * @param uid
 */
function getUserInfoByUid(uid, cb = () => {}) {
    users.findRow({uid}, (err, rs) => {
        if(err) return cb(err);
        if(rs === null) return cb(EXCEPTION_NONE_RESULT);
        cb(null, Object.assign({}, rs));
        rs = null;
    });
}

/**
 * 获取多个用户的基本信息
 * @type {{getUserInfoByUid: getUserInfoByUid}}
 */
function getUserInfoByUids(uids = [], cb = () => {}) {
    users.find({uid : uids}, (err, rs) => {
        if(err) return cb(err);
        if(rs.length < 1) return cb(EXCEPTION_NONE_RESULT);
        cb(null, rs);
        rs = null;
    });
}

module.exports = {
    getUserInfoByUid,
    getUserInfoByUids
}

//testAsyncFunc("getUserInfoById", getUserInfoById, 1);
