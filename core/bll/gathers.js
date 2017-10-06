"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const {projects, relations} = require("../tables");
const async = require("async");
const {isNull, map} = require("lodash");
const {ERROR_FUNC_PARAMER, ERROR_MYSQL_QUERY, INFO_MYSQL_NO_RESULT} = require("../constants");
const {getLogger} = require("../index");
const logger = getLogger("core/bll/projects");
module.exports = exports;

/**
 * 获取项目基本信息
 * @param where
 * @param page
 * @param pageSize
 * @param cb
 */
exports.getProjects = (where = {}, page = 1, pageSize = 9, cb = () =>{}) => {
    page = page > 0 ? page : 1;
    projects.find(where, "id ASC", pageSize, (page - 1) * pageSize, cb);
}

/**
 * 获取项目字体信息详情
 */
exports.getProjectIcons = (pId, page = 1, pageSize = 36, cb = () => {}) => {
    async.waterfall([
        (cb) => {
            relations.find({
                p_id : pId
            }, "unicode ASC", pageSize, (page - 1) * pageSize, (err, rs) => {
                if(err) {
                    cb(ERROR_MYSQL_QUERY);
                    return;
                }
                if(isNull(rs)) {
                    cb(INFO_MYSQL_NO_RESULT);
                    return;
                }
                cb(null, rs);
            });
        },
        (rs, cb) => {
            let ids = map(rs,(v, k) => v.i_id);
            icons.find({
                id : ids
            }, (err, rows) => {
                console.log(999, rows);
            });
        }
    ], (err, rs) => {
        if(err) {
            logger.error("getProjectIcons", err);
            cb(null, []);
        } else {

        }
    });
}

/**
 * 获取项目字体编号信息
 */
exports.getProjectUnicodeIcons = (pId, page = 1, pageSize = 36, cb = () => {}) => {
    if(!pId) {
        cb(ERROR_FUNC_PARAMER);
    }
    relations.find({
        p_id : pId
    }, "unicode ASC", pageSize, (page - 1) * pageSize, cb);
}


/**
 * 获取项目基本信息
 * @param pId
 * @param cb
 */
exports.getProjectByPid = (pId, cb) => {
    projects.findRow({id : pId}, cb);
}

/**
 * 创建项目
 */
exports.createProject = (data, cb) => {
    if(!data.name || !data.tag) {
        cb(ERROR_FUNC_PARAMER);
        return;
    }
    let rs = {
        name : data.name,
        tag : data.tag,
        flag : 0,
        type : parseInt(data.type, 10) ? 0 : 1 //0为系统项目，1为个人项目
    }
    async.waterfall([
        async.apply(projects.findRow, {
            name : rs.name,
            tag : rs.tag
        }),
        (data, cb) => {
            cb(isNull(data) ? null : "project is exit");
        },
        async.apply(project.insert, rs)
    ], (err, id) => {
        cb(err, id);
    });
}

/**
 * 更新项目基本信息
 */
exports.updateProject = () => {

}

