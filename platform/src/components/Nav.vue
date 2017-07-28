<template>
    <el-tabs class="main-nav" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目集" name="first">
            <el-container></el-container>
        </el-tab-pane>
        <el-tab-pane label="全部字体" name="second">
        </el-tab-pane>
        <el-tab-pane label="上传字体" name="third">
        </el-tab-pane>
        <el-tab-pane label="审核字体" name="fourth">
        </el-tab-pane>
        <el-tab-pane label="用户权限" name="fifth">
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import Container from "./Container.vue";
/**
 * navs结构
 * navs = [{
 *  label : "项目集",
 *  content: {VueObject}
 * },{
 *  label : "全部字体",
 *  content: {VueObject}
 * }];
 */
export default {
    components : {
        "el-container" : Container
    },
    props : ["navs", "handleClick"],
    data() {
        return {
            activeName: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style>
@import "./Nav.vue.css";
</style>