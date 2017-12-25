"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const {relations} = require("../tables");
const {testAsyncFunc} = require("node-mysql-dao");
const {
    EXCEPTION_ARGUMENTS,
    EXCEPTION_NONE_RESULT,
    EXCEPTION_UNABLE_OPERATE
} = require("../constants");
const {forEach, isArray, filter} = require("lodash");

/**
 * 更新关系
 * @param relationsInfo 关系信息
 * @param where 更新条件
 */
function updateReloations(relationsInfo = {}, where = {}, cb = () => {}) {
    relations.update(relationsInfo, where, (err, rs) => {
        if(err || rs < 1) return cb(err || EXCEPTION_UNABLE_OPERATE);
        cb(null , rs);
    });
}

/**
 * 还原集合历史删除
 * @param gid 集合id
 */
function restoreGatherOfRemovedReloations(gid = 0, cb = () => {}) {
    updateReloations({ flag : 1 }, {gid, flag : 3 }, (err ,rs) => {
        if(err == EXCEPTION_UNABLE_OPERATE) return cb(null, 0);
        if(err) return cb(err);
        cb(null ,rs);
    });
}

/**
 * 删除集合关联关系
 */
function removeGatherOfValidityReloations(gid = 0, cb = () => {}) {
    updateReloations({ flag : 3 }, {gid, flag : 1 }, (err ,rs) => {
        if(err == EXCEPTION_UNABLE_OPERATE) return cb(null, 0);
        if(err) return cb(err);
        cb(null ,rs);
    });
}

/**
 * 创建图标集合关联关系
 * @param data 数据
 */
function createGatherOfBasicsRelations(data = [], cb = () => {}) {
    //let {bid = 0, gid = 0, name ="", unicode = "", classname = ""} = data;
    //bid = filter(!isArray(bid) ? [bid] : bid, (v) => {
    //    return parseInt(v, 10) > 0;
    //});
    //cb(bid)
    //console.log(bid)
}

//testAsyncFunc("createGatherOfBasicsRelations", createGatherOfBasicsRelations, {bid : 9})


module.exports = {
    updateReloations,
    restoreGatherOfRemovedReloations,
    removeGatherOfValidityReloations
};
