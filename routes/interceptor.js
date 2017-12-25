"use strict";
/**
 * Created by rocky on 2017/7/27.
 */
const {isObject, forEach, extend} = require("lodash");
const {series, apply} = require("async");
const {COOKIE_USER_INFO} = require("../core/constants");
const {parseSecretUserInfo, createSecretUserInfo} = require("../core/secret");
const {getUserPermissionsByUid} = require("../core/bll/permissions");
const {getUserInfoByUid} =  require("../core/bll/users");
const {AJAX_STATUS} = require("../core/constants");
/**
 * 输出json返回值
 * @param object res //response对象
 * @param object data
 * @param string status 1为操作成功，其他均为错误
 * @param string message
 */
function outJson(data = null, message = "成功", status = 200) {
    return {
        status : status ? (status + "").toString() : (isObject(data) ? "200" : "0"),
        message : (message + "").toString(),
        data : isObject(data) ? data : {}
    };
}

/**
 * 拦截器用于初始化和拦截请求
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {

    /**
     * 获取参数
     */
    res.getParams = (...args) =>{
        let query = req.query;
        let body = req.body;
        let params = req.params;
        let tmp = {};
        forEach(args, (v) => {
            tmp[v] = params[v] || body[v] || query[v] || null;
        });
        return tmp;
    }
    /**
     * 添加json标准输出
     * @param data
     * @param message
     * @param status
     */
    res.outJson = (data, message, status)=> {
        let rs = outJson(data, message, status);
        res.status(200).json(rs).end();
    }
    /**
     * 获取已登录用户基本信息
     */
    res.locals.userInfo = null;
    res.locals.userPermissions = null;
    let userAgent = req.headers['user-agent'];
    let userInfo = parseSecretUserInfo(userAgent, req.cookies[COOKIE_USER_INFO]);
    if(!userInfo || !userInfo.uid) {
        //未登录用户操作，可以查看所有公开
        let secretUserInfo = createSecretUserInfo(userAgent, {uid : 1, uname : 'rockywu'});
        res.cookie(COOKIE_USER_INFO, secretUserInfo, {
            maxAge : 1000 * 60 * 60 * 6
        });
    }
    let uid = userInfo.uid;
    /**
     * 访问获取用户所有信息
     */
    series({
        userInfo : apply(getUserInfoByUid, uid),
        userPermissions : apply(getUserPermissionsByUid, uid)
    }, function(err, rs) {
        if(err) {
            //操作错误
            return next();
        }
        res.locals.userInfo = rs.userInfo;
        res.locals.userPermissions = rs.userPermissions;
        return next();
    })
}
