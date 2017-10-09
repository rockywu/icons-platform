"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const database = require("../config/database");
const {getClient, getDaoByClient} = require("node-mysql-dao");
const {getLogger} = require("./index");
const logger = getLogger("core/table");
function log() {
    logger.info.apply(logger, [].slice.call(arguments));
}
let cl = getClient(database.master, log);
//返回数据表操作对象,用于增删改查
module.exports = {
    authorities : getDaoByClient(cl, "authorities", "aid", log),
    basics : getDaoByClient(cl, "basics", "bid", log),
    contents : getDaoByClient(cl, "contents", "id", log),
    gathers : getDaoByClient(cl, "gathers", "gid", log),
    logs : getDaoByClient(cl, "logs", "id", log),
    permissions :getDaoByClient(cl, "permissions", "id", log),
    relations : getDaoByClient(cl, "relations", "id", log),
    subscribers : getDaoByClient(cl, "subscribers", "id", log),
    users : getDaoByClient(cl, "users", "uid", log)
}
