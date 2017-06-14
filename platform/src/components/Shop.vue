<template>
<div class="block block-shop">
    <div class="box box-shop">
        <div class="box-header">
            <div class="box-title">
                共<span>11</span>个字体
            </div>
            <div class="box-tools pull-right">
                <a class="shop-tool"><i class="platform-icons platform-icons_middle">&#xea02;</i>添加到项目</a>
                <a class="shop-tool"><i class="platform-icons platform-icons_middle">&#xea03;</i>删除字体</a>
                <a class="shop-tool"><i class="platform-icons platform-icons_middle">&#xea0b;</i>下载字体</a>
            </div>
        </div>
        <div class="box-body">
            <div class="row">
                <Icon v-for="(icon, index) in icons"
                      :class="'col-xs-3 col-sm-2 col-md-2 col-lg-1'"
                      :key="index"
                      :name="icon.name"
                      :active="icon.active"
                      :id="icon.id"
                      :type="icon.type"
                      :theme="2"
                      :unicode="icon.unicode"></Icon>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Icon from "@/components/Icon.vue"
let icons = [{
    name : "i1",
    active : false,
    type : "aaa",
    id : 999,
    unicode: "ea01"
}];
for(let i = 0; i< 200;i++) {
    icons.push({
        id: i+1,
        type : "aaa",
        name : "奥斯卡的积分卡束带结发",
        active : false,
        unicode: "ea01"
    })
};
export default {
    data() {
        return {
            icons
        }
    },
    components : {
        Icon
    }
}
</script>
<style>
@import "./Shop.vue.css";
</style>
