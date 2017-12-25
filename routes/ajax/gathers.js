"use strict";
/**
 * Created by rocky on 2017/10/12.
 * 系统管理员有直接创建/删除公开集合权限的权限，个人用户拥有删除私有集合权限
 */
const express = require('express');
const router = express.Router();
const {
    checkUserForHasSystemAdminPermission
} = require("../../core/bll/permissions");
const {
    getGatherInfoByGid,
    removeGather,
    restoreGather
} = require("../../core/bll/gathers");
const {auto,series, apply} = require("async");
const {forEach, isEmpty} = require("lodash");
const {
    AJAX_STATUS,
    PERMISSION_GATHER_UPLOAD,
    PERMISSION_GATHER_MODIFY,
    PERMISSION_GATHER_AUDIT,
    PERMISSION_GATHER_PUBLISH,
    PERMISSION_GATHER_ADMIN
} = require("../../core/constants");

/**
 * 检查
 */
router.use("*", (req, res, next) => {
    let params = res.getParams("gid");
    let gid = params.gid;
    let userInfo = res.locals.userInfo;
    getGatherInfoByGid(gid, (err, rs) => {
        if(err) return res.outJson({}, "未找到集合信息", AJAX_STATUS.STATUS_NOTFOUND);
        res.locals.gInfo = rs;
        if(rs.category == 1) {
            //公共集合
            return !checkUserForHasSystemAdminPermission(userInfo) ? res.outJson({}, "无权限操作", AJAX_STATUS.STATUS_REJECT) : next();
        } else {
            //非公共集合
            return next();
        }

    });
});

/**
 * 创建(公开/私有)集合
 */
router.use("/create", (req, res, next) => {
    let params = res.getParams("name", "alias", "category", "type");
    if(!params.name || params.category)
    return res.outJson(params);
    if(params.category === 0) { //公开集合

    } else { //私有集合

    }
    //res.send("1231");
});

/**
 * 删除(公开/私有)集合
 */
router.use("/remove", () => {
    let params = res.getParams("gid");

});

/**
 * 审核集合（系统管理员审核新增公开集合）
 */
router.use("/audit", (req, res, next) => {

});


module.exports = router;
