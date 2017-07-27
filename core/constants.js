"use strict";
/**
 * Created by rocky on 2017/7/27.
 */
const {mapValues} = require("lodash");
function build(obj) {
   return mapValues(obj, (v, k) => k);
}

module.exports = build({
   "ERROR_MYSQL_PARAMER" : "数据库操作参数错误",
   "ERROR_MYSQL_QUERY" : "数据库查询错误",
   "ERROR_FUNC_PARAMER" : "函数参数错误",
   "INFO_MYSQL_NO_RESULT" : "数据库未查询到结果"
});
