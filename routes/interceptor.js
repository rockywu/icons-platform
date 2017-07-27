"use strict";
/**
 * Created by rocky on 2017/7/27.
 */
const {isObject} = require("lodash");
/**
 * 输出json返回值
 * @param object res //response对象
 * @param object data
 * @param string status 1为操作成功，其他均为错误
 * @param string message
 */
function outJson(data = null, message = "成功", status = "0") {
    return {
        status : status ? (status + "").toString() : (isObject(data) ? "1" : "0"),
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
     * 设置用户信息,模拟信息
     */
    res.locals.userInfo = {
        userId : 1,
        sign : "00001",
        name : "吴佳雷",
        avatar : "http://home.corp.anjuke.com/headpic/SHF3959/big.jpg",
        email : "rockywu_ajk@58ganji.com",
        english_name : "rockywu",
        permissions : "1,2,3,4,5,6"
    }
    next();
}
