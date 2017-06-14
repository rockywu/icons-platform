#!/usr/bin/env node
"use strict";
/**
 * Created by rocky on 16/7/1.
 */
var fs = require("fs");
var fontBunder = require("use-iconfonts").fontBunder;
var iconPath = __dirname + "/platform-ions/";
var fb = new fontBunder();
var mkdirp = require("mkdirp");
var path = require("path");
var dirs = fs.readdirSync(iconPath);
var fonts = [];
dirs.forEach(function(v, k) {
    if(v.indexOf(".") == 0) {
        return;
    }
    fonts.push({
        file : iconPath + v,
    })
});
//fb.setHasDemo(false);// 是否输出demo
fb.setIsZip(false).setCleanCss(false);
// fb.resetViewBoxSize(false); //重新设置viewBox宽高
fb.generate(fonts, {
    className : "platform-icons",
    fontName : "pf-icons",
    iconPrefix: "i",
    prependUnicode : true, //自动生成unicode
    startUnicode : 0xEA01 //自动开始编号
},function (rs, fonts) {
    var p = path.normalize(__dirname + "/public/icons/");
    mkdirp.sync(p);
    if(rs instanceof Array) {
        console.log(fonts)
        rs.map(function(val) {
            fs.writeFileSync(p + val.name, val.content);
        })
    }
});


