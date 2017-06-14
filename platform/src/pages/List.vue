<template>
    <div class="page_list">
        <div class="row row-list">
            <Icon v-for="(icon, index) in icons"
                  :class="'col-xs-3 col-sm-2 col-md-2 col-lg-1'"
                  :key="index"
                  :name="icon.name"
                  :active="icon.active"
                  :id="icon.id"
                  :type="icon.type"
                  :theme="1"
                  :unicode="icon.unicode"></Icon>
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
            icons,
        }
    },
    components : {
        Icon
    }
}

</script>

<style>

@import "./List.vue.css";

</style>
