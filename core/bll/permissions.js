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
 *
 */
function checkUserForHasPermissionByAid(gid, uid, aid, cb = ()=> {}) {

}


/**
 * 检查用户是否有集合上传权限
 */
function checkUserForHasUploadPermission(gid, uid, cb = () => {}) {
    checkUserForHasPermissionByAid(gid, uid , PERMISSION_GATHER_UPLOAD, cb);
}

/**
 * 检查用户是否有集合编辑权限
 */
function checkUserForHasModifyPermission(gid, uid, cb = () => {}) {
    checkUserForHasPermissionByAid(gid, uid , PERMISSION_GATHER_MODIFY, cb);
}

/**
 * 检查用户是否有集合审核权限
 */
function checkUserForHasAuditPermission(gid, uid, cb = () => {}) {
    checkUserForHasPermissionByAid(gid, uid , PERMISSION_GATHER_AUDIT, cb);
}

/**
 * 检查用户是否有集合发布权限
 */
function checkUserForHasPublishPermission(gid, uid, cb = () => {}) {
    checkUserForHasPermissionByAid(gid, uid , PERMISSION_GATHER_PUBLISH, cb);
}

/**
 * 检查用户是否有集合管理员权限
 */
function checkUserForHasAdminPermission() {
    checkUserForHasPermissionByAid(gid, uid , PERMISSION_GATHER_ADMIN, cb);
}


module.exports = {
    getGatherPermissionsByGid,
    getUserPermissionsByUid,
    addUserPermission,
    deleteUserPermission
}
