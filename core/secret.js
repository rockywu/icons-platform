"use strict";
/**
 * Created by rocky on 2017/10/9.
 */

const crypto = require("crypto");
const SECRET_KEY = "user-secret"; //cookie签名秘钥
const {md5, getLogger} = require("./index");
const logger = getLogger("core/secret");
const {EXCEPTION_ARGUMENTS} = require("./constants");

/**
 * 加密
 * @param str
 * @param secret
 * @return {Buffer|string}
 */
function encrypt(str,secret) {
    secret = secret || "...";
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str,'utf8','hex');
    enc += cipher.final('hex');
    return enc;
}

/**
 * 解密
 * @param str
 * @param secret
 * @return {Buffer|string}
 */
function decrypt(str,secret) {
    secret = secret || "...";
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}

/**
 * 获取cookie中的用户id
 * @param authInfo
 * @param userAgent
 */
function parseSecretUserInfo(userAgent = "", secretUserInfo = "") {
    if(!userAgent || !secretUserInfo) {
        logger.error(EXCEPTION_ARGUMENTS);
        return null;
    }
    let uaKey = SECRET_KEY + md5(userAgent) + SECRET_KEY;
    let userInfo = null;
    try {
        userInfo = JSON.parse(decrypt(secretUserInfo, uaKey));
    } catch(e){}
    return userInfo;
}


/**
 * 生成用户秘钥cookie
 * @param userAgent
 * @param uid
 */
function createSecretUserInfo(userAgent ="",  userInfo = "") {
    if(!userAgent || !userInfo) {
        logger.error(EXCEPTION_ARGUMENTS);
        return null;
    }
    let uaKey = SECRET_KEY + md5(userAgent) + SECRET_KEY;
    let secretUserInfo = JSON.stringify(userInfo);
    return encrypt(secretUserInfo, uaKey);
}

module.exports = {
    parseSecretUserInfo,
    createSecretUserInfo
}