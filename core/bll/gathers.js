"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const {gathers} = require("../tables");
const {testAsyncFunc} = require("node-mysql-dao");
const {
    EXCEPTION_ARGUMENTS,
    EXCEPTION_NONE_RESULT
} = require("../constants");
const {auto, apply} = require("async");
const {forEach} = require("lodash");

/**
 * 获取集合信息
 * @param gid
 */
function getGatherInfoByGid(gid, cb = ()=> {}) {
    gathers.findRow({gid}, (err, rs) => {
        if(err) return cb(err);
        if(rs === null) return cb(EXCEPTION_NONE_RESULT);
        cb(null, Object.assign({}, rs));
        rs = null;
    });
}

/**
 * 创建集合
 */
function createGather() {

}

/**
 * 删除集合
 * @param gid 被移除的集合id
 */
function removeGather(gid) {
    //auto({
    //    gatherInfo : apply(getGatherInfoByGid, {gid}),
    //}, (err, rs) => {
    //
    //});
}

//testAsyncFunc("removeGather", 1);


module.exports = {
    getGatherInfoByGid
};

