/**
 * Created by rocky on 2017/6/18.
 */
import {mapValues} from "lodash";
var Cas58 = require("58node-cas/cas58")
// cas配置项实例化
var cas = new Cas58({
    testFlag: false, // 是否是在测试true为是
    service: 'http://iconfonts.corp.anjuke.com'
});

/**
 * 格式化58userinfo
 * @param extend
 */
function formatUserInfo(extend) {
    var attrs = extend.attributes;

    return {
        username: extend.username,
        ...mapValues(attrs, (v) => {
            return Buffer.from(v[0], "base64").toString()
        })
    };
}


module.exports = function (app) {
    //退出
    app.use(function(req, res, next) {
        cas.handleSingleSignout(req, res, function(status, result) {
            switch (status) {
                case "success":
                    console.log("ticket:" + result);
                    console.log("服务端清除当前Tiket的session");
                    break;
                case "err":
                    console.log("err:" + result);
                    break;
                case "noquit":
                    console.log("noquit");
                next();
                    break;
            }
        });
    });

    // 登陆 中间件
    app.use(function(req, res, next) {
        cas.authenticate(req, res, function(err, status, username, extended) {
            if(err) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                res.locals.userInfo = formatUserInfo(extended);
                res.locals.replaceTicket = true;
                next();
            }
        });
    })
}

