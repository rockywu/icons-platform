<template>

<div class="page-upload">
    <section class="invoice upload-svg" id="dropzone-svg">
    <form class="dz-message" method="post" enctype="multipart/form-data" action="/">
        <div class="upload-center">
            <i class="platform-icons">&#xea04;</i>
            <div>将SVG文件拖拽至上传<br />或<br /><a>点击上传</a></div>
        </div>
    </form>
    <input type="file" multiple="multiple" class="dz-hidden-input" />
    </section>

</div>

</template>

<script>
var namespace = {};
;(function($, Dropzone) {
    /**
     * 拖拽上传控件
     * processQueue 可以批量提交
     */
    function dropzone(elem, options) {
        var defOptions = {
            maxFiles : 20, //最大同时上传文件个数
            maxFilesize: 1, //单位mb
            acceptedFiles : ".svg", //文件类型
            addRemoveLinks : true, //添加删除选项
            paramName : "file", //设置上传文件名
            url : "" //图片上传url
        };
        options = $.extend({}, defOptions, options);
        if(!options.url) {
            throw new Error("上传地址必填");
        }
        return new window.Dropzone(elem, options);
    }
    namespace.dropzone = dropzone;
})(window.jQuery, window.Dropzone);

export default {
}

</script>

<style>

@import "./Upload.vue.css";

</style>
