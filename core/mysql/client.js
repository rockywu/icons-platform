"use strict";
/**
 * Created by rocky on 2017/7/24.
 */
let mysql = require("mysql");
let {isNull, isFunction} = require("lodash");
const logger = require("../index").getLogger("core/mysql/client");
module.exports = (conf) => {
    let pool = null;
    if(conf && conf.host && conf.user && conf.database) {
        pool = mysql.createPool(conf);
    }
    if(isNull(pool)) {
        logger.fatal("数据库链接配置错误", conf);
        throw new Error("数据库链接配置错误");
    }

    /**
     * 数据库查询
     * @param sql
     * @param params
     * @param callback
     */
    function query(sql, params, callback) {
        pool.getConnection((err, connection) => {
            if(err) {
                logger.error(err);
                callback(err);
            } else {
                connection.query(sql, params, (error, results, fields) => {
                    connection.release();
                    if(error) {
                        logger.error(error);
                        callback(error, fields);
                    } else {
                        callback(null, results, fields);
                    }
                });
            }
        });
    }
    return {query};
}
