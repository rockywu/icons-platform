"use strict";
/**
 * Created by rocky on 2017/10/9.
 */
const express = require('express');
const router = express.Router();

router.use("/permissions", require("./permissions")); //权限管理接口
router.use("/users", require("./users")); //用户管理接口
router.use("/gathers", require("./gathers")); //集合管理接口
router.use("/relations", require("./relations")); //关系管理接口

module.exports = router;
