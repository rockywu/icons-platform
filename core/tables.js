"use strict";
/**
 * Created by rocky on 2017/7/25.
 */
const client = require("./mysql/client");
const dao = require("./mysql/dao");
const database = require("../config/database");
let cl = client(database.master);
//返回数据表操作对象,用于增删改查
module.exports = {
    users : new dao("users", "id", cl),
    relations : new dao("relations", "id", cl),
    relationTags : new dao("relation_tags", "id", cl),
    projects : new dao("projects", "id", cl),
    logs : new dao("logs", "id", cl),
    icons : new dao("icons", "id", cl),
    auditIcons : new dao("audit_icons", "id", cl)
}
