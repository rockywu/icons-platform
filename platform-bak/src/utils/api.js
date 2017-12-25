"use strict";
/**
 * Created by rocky on 2017/7/3.
 */
import {isString, isObject, forEach, extend, isFunction} from "lodash";
import config  from "./apiConfigure";
let $ = window.jQuery;
let baseUrl = "iconfonts.corp.anjuke.com";
/**
 * 组装Url
 * @param string url
 * @param object querys
 * @return string
 */
function buildUrl(url, querys) {
    url = isString(url) ? url : "";
    querys = isObject(querys) ? querys : {};
    let qs = [];
    forEach(querys, (val, key) => {
        qs.push(encodeURIComponent(key) + "=" + encodeURIComponent(val));
    });
    if(qs.length > 0) {
        qs = qs.join("&");
    }
    var last = url.indexOf("?");
    if(last >=0 ) {
        url += (last == url.length -1 ? "" : "&") + qs;
    } else {
        url += "?" + qs;
    }
    return url;
}

/**
 * 封装ajax请求
 * @param options
 */
function fetch(options = {}, cb = () => {}) {
    if(isFunction(cb)) {
        $.ajax({
            url : options.url || "",
            data : options.params || {},
            dataType : options.dataType || "json",
            success : (rs) => {
                cb(null, rs);
            },
            error : (e) => {
                cb(e);
            }
        });
    }
}

/**
 * 获取fetch函数
 * @param apiName
 */
function getFetch(apiName) {
    let api = null;
    if(config && apiName && config[apiName]) {
        return (options, cb) => {
            fetch(extend({}, config[apiName], options), cb);
        }
    } else {
        throw new Error(`该api：${apiName}不存在`);
    }
}

export default getFetch;







