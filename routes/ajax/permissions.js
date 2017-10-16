"use strict";
/**
 * Created by rocky on 2017/10/9.
 */
const express = require('express');
const router = express.Router();
const {auto, apply} = require("async");
const {
    AJAX_STATUS,
    PERMISSION_GATHER_UPLOAD,
    PERMISSION_GATHER_MODIFY,
    PERMISSION_GATHER_AUDIT,
    PERMISSION_GATHER_PUBLISH,
    PERMISSION_GATHER_ADMIN
} = require("../../core/constants");
const {
    addUserPermission,
    deleteUserPermission,
    checkUserForHasAdminPermission
} = require("../../core/bll/permissions");

const {
    getValidityGatherInfoByGid
} = require("../../core/bll/gathers");

const {
    getUserInfoByUid
} = require("../../core/bll/users");

const {
    operatePermissionLog
} = require("../../core/bll/logs");

/*
 * 平台超级用户添加/删除集合管理员权限
 * @param gid
 * @param action
 * @param uid
 */
router.use("/user/admin", (req, res, next) => {
    let params = res.getParams("gid", "action", "uid");
    let userInfo = res.locals.userInfo;
    if(parseInt(userInfo.authority, 10) === 1) {
        return next();
    } else {
        return res.outJson({}, "无权限访问", AJAX_STATUS.STATUS_REJECT);
    }
});

/**
 * 集合管理员权限用户操作
 * @param gid
 * @param action
 * @param uid
 */
router.use(/\/user\/(upload|modify|audit|publish)/, (req, res, next) => {
    let locals = res.locals;
    let params = res.getParams("gid", "action", "uid");
    let action = params.action;
    let gid = params.gid;
    let uid = params.uid;
    let permissions = locals.userPermissions;
    if((action != "add" && action != "delete")
        || !checkUserForHasAdminPermission(permissions[gid])
        || !uid) {
        return res.outJson({}, "无权限访问", AJAX_STATUS.STATUS_REJECT);
    }
    next();
});


/**
 * 添加/移除集合用户的权限
 * @param gid
 * @param action
 * @param uid
 */
router.use(/\/user\/(upload|modify|audit|publish|admin)/, (req, res) => {
    let locals = res.locals;
    let params = res.getParams("gid", "action", "uid", "0");
    let type = params["0"];
    let types = {
        "upload" : PERMISSION_GATHER_UPLOAD,
        "modify" : PERMISSION_GATHER_MODIFY,
        "audit" : PERMISSION_GATHER_AUDIT,
        "publish" : PERMISSION_GATHER_PUBLISH,
        "admin" : PERMISSION_GATHER_ADMIN
    }
    auto({
        gatherInfo : apply(getValidityGatherInfoByGid, params.gid),
        userInfo : apply(getUserInfoByUid, params.uid),
        operateInfo : ["gatherInfo", "userInfo", function(rs, cb) {
            let callback = null;
            if(params.action == "add") {
                callback = apply(addUserPermission, params.gid, params.uid, types[type]);
            } else {
                callback = apply(deleteUserPermission, params.gid, params.uid, types[type]);
            }
            callback(cb);
        }]
    }, (err, rs) => {
        if(err || !rs.gatherInfo || !rs.userInfo || !rs.operateInfo) {
            return res.outJson({}, "操作失败", AJAX_STATUS.STATUS_FAILED);
        }
        operatePermissionLog(locals.userInfo.uid, {
            gid : params.gid,
            uid : params.uid,
            action : params.action
        });
        return res.outJson({});
    });
});

module.exports = router;
