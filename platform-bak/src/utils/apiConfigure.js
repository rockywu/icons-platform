"use strict";
/**
 * Created by rocky on 2017/7/3.
 */
/**
 * 请求基本结构
 * @param uri
 * @param params
 * @param method
 * @param dataType
 * @return {{uri: string, params: {}, method: string, dataType: string}}
 */
function apiStruct(uri = "", params = {}, method = "GET", dataType = "json") {
    return {
        uri,
        params,
        method,
        dataType
    }
}

export default {
    ajaxSvgUpload : apiStruct(
        "/ajax/svg/upload",
        {

        },
        "POST"
    )
}
