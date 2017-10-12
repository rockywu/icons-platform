"use strict";
/**
 * Created by rocky on 2017/10/9.
 */
const express = require('express');
const router = express.Router();
const {waterfall,apply} = require("async");
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
    getUserInfoByUid
} = require("../../core/bll/users");

const {
    operatePermissionLog
} = require("../../core/bll/logs");


/*
 * 权限校验
 */
router.use("*", (req, res, next) => {
    let params = res.getParams(["gid"]);
    let gid = params.gid;
    let permissions = res.locals.userPermissions;
    if(!gid || !permissions || !permissions[gid]) {
        return res.outJson({}, "无权限访问", AJAX_STATUS.STATUS_REJECT);
    }
    next();
});

/**
 * 权限用户操作
 */
router.use("/user/*", (req, res, next) => {
    let locals = res.locals;
    let params = res.getParams(["gid", "action", "uid"]);
    let action = params.action;
    let gid = params.gid;
    let uid = params.uid;
    let permissions = locals.userPermissions;
    if((action != "add" && action != "delete")
        || !checkUserForHasAdminPermission(permissions[gid])
        || !uid) {
        return res.outJson({}, "无权限访问", AJAX_STATUS.STATUS_REJECT);
    }
    //校验用户是否存在
    getUserInfoByUid(uid, (err, rs) => {
        if(err) {
            return res.outJson({}, "该用户不存在", AJAX_STATUS.STATUS_REJECT);
        }
        return next();
    });
});


/**
 * 添加/移除集合用户上传权限
 */
router.get("/user/upload", (req, res, next) => {
    let locals = res.locals;
    let params = res.getParams(["gid", "action", "uid"]);
    let cb = null;
    if(params.action == "add") {
        cb = apply(addUserPermission, params.gid, params.uid, PERMISSION_GATHER_UPLOAD);
    } else {
        cb = apply(deleteUserPermission, params.gid, params.uid, PERMISSION_GATHER_UPLOAD);
    }
    waterfall([cb], (err, rs) => {
        if(err) {
            return res.outJson({}, "操作失败", AJAX_STATUS.STATUS_FAILED);
        }
        operatePermissionLog(locals.userInfo.uid, {
            gid : params.gid,
            uid : params.uid,
            action : params.action
        });
        res.outJson(rs);
    });
});

/**
 * 添加集合
 */

module.exports = router;
