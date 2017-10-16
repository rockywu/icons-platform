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
const {auto,series, apply} = require("async");
const {forEach, isEmpty} = require("lodash");
const {restoreGatherOfRemovedReloations} = require("./relations");

/**
 * 获取有效的集合信息
 * @param gid
 */
function getValidityGatherInfoByGid(gid, cb = ()=> {}) {
    if(!gid || gid < 1) return cb(EXCEPTION_ARGUMENTS);
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
    if(!gid || gid < 1) return cb(EXCEPTION_ARGUMENTS);
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
    if(isEmpty(data) || !gid || gid < 1) return cb(EXCEPTION_ARGUMENTS);
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

/**
 * 删除集合
 * @param gid 被移除的集合id
 */
function removeGather(gid, cb = () => {}) {
    series([
        apply(getValidityGatherInfoByGid, gid),
        apply(updateGatherInfo, {flag : 1}, gid),
    ], (err, rs) => {
        if(err) return cb(err);
        cb(null, rs);
    });
}

/**
 * 还原集合
 * @param gid
 */
function restoreGather(gid, cb = () => {}) {
    series([
        apply(series, [
            apply(getInvalidityGatherInfoByGid, gid),
            apply(updateGatherInfo, {flag : 0}, gid)
        ]),
        //还原关联
        apply(restoreGatherOfRemovedReloations, gid)
    ], (err, rs) => {
        if(err) return cb(err);
        cb(null, rs);
    });

}

module.exports = {
    getValidityGatherInfoByGid,
    getInvalidityGatherInfoByGid,
    createGather,
    removeGather,
    restoreGather,
    updateGatherInfo
};

