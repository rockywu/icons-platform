"use strict";
/**
 * Created by rocky on 2017/10/12.
 * 系统管理员有直接创建/删除公开集合权限的权限，个人用户拥有删除私有集合权限
 */
const express = require('express');
const router = express.Router();

/**
 * 创建(公开/私有)集合
 */
router.use("/create", (req, res, next) => {
    let params = res.getParams("gid", "name", "alias", "category", "type");

    if(params.category === 0) { //公开集合

    } else { //私有集合

    }
});

/**
 * 删除(公开/私有)集合
 */
router.use("/remove", () =>{

});

/**
 * 审核集合（系统管理员审核新增公开集合）
 */
router.use("/audit", () => {

});


module.exports = router;
