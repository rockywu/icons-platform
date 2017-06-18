/**
 * Created by rocky on 2017/6/18.
 */
var Cas58 = require("58node-cas/cas58")
// cas配置项实例化
var cas = new Cas58({
    testFlag: false, // 是否是在测试true为是
    service: 'http://iconfonts.corp.anjuke.com'
});

module.exports = function (app) {
    // 登陆 中间件
    app.use(function(req, res, next) {
        cas.authenticate(req, res, function(err, status, username, extended) {
            next();
        });
    })

    // 退出
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

}

