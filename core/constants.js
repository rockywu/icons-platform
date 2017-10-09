"use strict";
/**
 * Created by rocky on 2017/7/27.
 */

const EXCEPTION_ARGUMENTS = "EXCEPTION_ARGUMENTS"; //参数错误
const PERMISSION_GATHER_UPLOAD = 1; //上传集合图标
const PERMISSION_GATHER_MODIFY = 2; //编辑集合图标
const PERMISSION_GATHER_AUDIT = 3; //审核集合图标
const PERMISSION_GATHER_PUBLISH = 4; //集合发布操作
const PERMISSION_GATHER_ADMIN = 5; //集合权限管理
const COOKIE_USER_INFO = "auth_user_info"; //用户cookiename
const EXCEPTION_NONE_RESULT = "EXCEPTION_NONE_RESULT";//空结果

module.exports = {
   EXCEPTION_NONE_RESULT,
   EXCEPTION_ARGUMENTS,
   PERMISSION_GATHER_UPLOAD,
   PERMISSION_GATHER_MODIFY,
   PERMISSION_GATHER_AUDIT,
   PERMISSION_GATHER_PUBLISH,
   PERMISSION_GATHER_ADMIN,
   COOKIE_USER_INFO
}
