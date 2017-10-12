"use strict";
/**
 * Created by rocky on 2017/10/4.
 */
const {permissions} = require("../tables");
const {testAsyncFunc} = require("node-mysql-dao");
const {
    EXCEPTION_ARGUMENTS,
    PERMISSION_GATHER_UPLOAD,
    PERMISSION_GATHER_MODIFY,
    PERMISSION_GATHER_AUDIT,
    PERMISSION_GATHER_PUBLISH,
    PERMISSION_GATHER_ADMIN
} = require("../constants");
const {forEach} = require("lodash");

/**
 * 获取集合的用户权限
 * @param gid
 * @param cb
 */
function getGatherPermissionsByGid(gid, cb) {
    if(!gid) return cb(EXCEPTION_ARGUMENTS);
    permissions.find({gid}, (err, rs) => {
        if(err) return cb(err);
        let tmp = {};
        forEach(rs, v => {
            !tmp[v.aid] && (tmp[v.aid] = []);
            tmp[v.aid].push(v.uid);
        });
        cb(null, tmp);
        tmp = null;
    });
}

/**
 * 获取用户集合权限
 * @param uid
 */
function getUserPermissionsByUid(uid, cb) {
    if(!uid) return cb(EXCEPTION_ARGUMENTS);
    permissions.find({uid}, (err, rs) => {
        if(err) return cb(err);
        let tmp = {};
        forEach(rs, v => {
            !tmp[v.gid] && (tmp[v.gid] = []);
            tmp[v.gid].push(v.aid);
        });
        cb(null, tmp);
        tmp = null;
    });
}

/**
 * 添加用户集合权限
 * @param gid 集合id
 * @param uid 用户id
 * @param aid 权限id
 */
function addUserPermission(gid, uid, aid, cb = () => {}) {
    if(!gid || !uid || !aid) return cb(EXCEPTION_ARGUMENTS);
    permissions.insert({gid, uid, aid}, cb);
}

/**
 * 删除用户集合权限
 */
function deleteUserPermission(gid, uid, aid, cb = ()=> {}) {
    if(!gid || !uid || !aid) return cb(EXCEPTION_ARGUMENTS);
    permissions.delete({gid, uid, aid}, cb);
}

/**
 * 检查用户集合权限
 */
function checkUserForHasPermissionByAid(permissions = [], aid = 0) {
    permissions = permissions || [];
    return permissions && permissions.indexOf(aid) >=0;
}

/**
 * 检查用户是否有集合上传权限
 */
function checkUserForHasUploadPermission(permissions) {
    return checkUserForHasPermissionByAid(permissions , PERMISSION_GATHER_UPLOAD);
}

/**
 * 检查用户是否有集合编辑权限
 */
function checkUserForHasModifyPermission(permissions) {
    return checkUserForHasPermissionByAid(permissions , PERMISSION_GATHER_MODIFY);
}

/**
 * 检查用户是否有集合审核权限
 */
function checkUserForHasAuditPermission(permissions) {
    return checkUserForHasPermissionByAid(permissions , PERMISSION_GATHER_AUDIT);
}

/**
 * 检查用户是否有集合发布权限
 */
function checkUserForHasPublishPermission(permissions) {
    return checkUserForHasPermissionByAid(permissions , PERMISSION_GATHER_PUBLISH);
}

/**
 * 检查用户是否有集合管理员权限
 */
function checkUserForHasAdminPermission(permissions) {
    return checkUserForHasPermissionByAid(permissions , PERMISSION_GATHER_ADMIN);
}


module.exports = {
    getGatherPermissionsByGid,
    getUserPermissionsByUid,
    addUserPermission,
    deleteUserPermission,
    checkUserForHasUploadPermission,
    checkUserForHasModifyPermission,
    checkUserForHasAuditPermission,
    checkUserForHasPublishPermission,
    checkUserForHasAdminPermission
}
