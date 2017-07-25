"use strict";
/**
 * Created by rocky on 2017/7/24.
 */
let mysql = require("mysql");
let logger = require("log4js").getLogger("core/mysql/client");
let pool = mysql.createPool({
    connectionLimit : 10, //链接数量
    host : "127.0.0.1",
    user : "root",
    password : "",
    database : "icons"
});

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
                    console.log(9999, error)
                    logger.error(error);
                    callback(error, fields);
                } else {
                    callback(null, results, fields);
                }
            });
        }
    });
}

module.exports = {query}

