"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const {gathers} = require("../tables");
const {testAsyncFunc} = require("node-mysql-dao");
const {
    EXCEPTION_ARGUMENTS,
    EXCEPTION_NONE_RESULT,
    EXCEPTION_UNABLE_OPERATE
} = require("../constants");
const {waterfall, apply} = require("async");
const {forEach} = require("lodash");

/**
 * 获取有效的集合信息
 * @param gid
 */
function getValidityGatherInfoByGid(gid, cb = ()=> {}) {
    gathers.findRow({gid, flag : 0}, (err, rs) => {
        if(err || rs === null) return cb(err || EXCEPTION_NONE_RESULT);
        cb(null, Object.assign({}, rs));
        rs = null;
    });
}

/**
 * 获取失效的集合信息
 * @param gid
 */
function getInvalidityGatherInfoByGid(gid, cb = ()=> {}) {
    gathers.findRow({gid, flat: 1}, (err, rs) => {
        if(err || rs === null) return cb(err || EXCEPTION_NONE_RESULT);
        cb(null, Object.assign({}, rs));
        rs = null;
    });
}

/**
 * 更新集合信息
 * @param data 更新内容
 * @param gid 集合id
 */
function updateGatherInfo(data = {}, gid = 0, cb = () => {}) {
    gathers.update(data, {gid}, (err, rs)=> {
        if(err || rs < 1) return cb(err || EXCEPTION_UNABLE_OPERATE);
        cb(null , rs);
    });
}

/**
 * 创建集合
 * @param gatherInfo 集合信息
 */
function createGather(gatherInfo = {}, cb = () => {}) {
    let {uid = 0, name = "", alias = "", category = 1, type = 0, flag = 0} = gatherInfo;
    if(!uid || !name) return cb(EXCEPTION_ARGUMENTS);
    gathers.insert({uid, name, alias, category, type, flag}, (err, rs) => {
        if(err || rs < 1) return cb(err || EXCEPTION_UNABLE_OPERATE);
        cb(null, rs);
    });
}

testAsyncFunc("createGather", createGather, {uid : 1,})

/**
 * 删除集合
 * @param gid 被移除的集合id
 */
function removeGather(gid, cb = () => {}) {
    waterfall([
        apply(getValidityGatherInfoByGid, gid),
        apply(updateGatherInfo, {flag : 1}, gid),

    ], (err, rs) => {
        if(err) return cb(err);
        cb(null, rs);
    });
}

/**
 * 还原集合
 */
function restoreGather(gid, cb = () => {}) {
    auto({
        gatherInfo : apply(getInvalidityGatherInfoByGid, gid),
    }, (err, rs) => {

    });

}

testAsyncFunc("removeGather", removeGather, 1);
//testAsyncFunc("restoreGather", restoreGather, 1);


module.exports = {
    getValidityGatherInfoByGid,
    getInvalidityGatherInfoByGid,
    createGather,
    removeGather,
    restoreGather,
    updateGatherInfo
};

