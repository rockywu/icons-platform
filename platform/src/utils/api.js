"use strict";
/**
 * Created by rocky on 2017/7/3.
 */
import {isString, isObject, forEach} from "lodash";
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
function fetch(options = {}) {

}

function getFetch(apiName) {

}


