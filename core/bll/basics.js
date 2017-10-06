"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const {icons, auditIcons} = require("../tables");
const {ERROR_FUNC_PARAMER} = require("../constants");

module.exports = exports;

/**
 * 获取列表
 */
exports.getIcons = () => {
}

/**
 * 通过hash获取字体信息
 */
exports.getIcons = (hash = "", cb =() =>{}) => {
    if(!hash) {
        cb(ERROR_FUNC_PARAMER);
    }
    icons.findRow({hash : hash}, cb);
}

/**
 * 插入字体审核表
 * @param data
 * @param cb
 */
exports.insertAuditIcon = (data, cb) => {
    let rs = {
        p_id : data.pId || 0,
        u_id : data.userId || 0,
        name : data.name || "",
        hash : data.hash || "",
        svg : data.svg || "",
        status : data.status || 0,
        audit_uid : data.auditUid | 0,
        r_id : data.rId || 0
    }
    auditIcons.insert(rs, cb);
}

exports.updateAuditIconById = () => {

}

/**
 * 单挑插入
 */
exports.insertIcon = (userId, hash, svg, name, type) => {
}
