"use strict";
/**
 * Created by rocky on 2017/10/9.
 */
const {} = require("async");
const {COOKIE_USER_INFO, COOKIE_SECRET} = require("../core/constants");
const {encrypt, decrypt} = require("../core");

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

module.exports = (req, res, next) => {


}
