<template>
    <div id="app" class="skin-blue fixed layout-top-nav">
        <div class="wrapper">
            <IHeader></IHeader>
            <div class="content-wrapper">
                <div class="container">
                    <section class="content-header">
                        <Tabs :data="tabs"></Tabs>
                    </section>
                    <section class="content">
                        <router-view></router-view>
                    </section>
                </div>
            </div>
            <Shop v-if="shopVisible"></Shop>
            <IFooter></IFooter>
        </div>
    </div>
</template>

<script>

import {filter,} from "lodash";
import IHeader from "@/components/Header.vue"
import Tabs from "@/components/Tabs.vue"
import IFooter from "@/components/Footer.vue"
import Shop from "@/components/Shop.vue"
import {routes} from "@/router"
let conf = ["Home", "List", "Upload", "Verify", "Authority"];
let tabs = conf.map((r) => {
    let tp = routes.filter((v, k) => {
        return v.name == r;
    });
    return tp.length ? tp[0] : null;
});
export default {
    name: 'app',
    data() {
        return {
            tabs : tabs,
            shopVisible : true
        }
    },
    components : {
        IHeader,
        Tabs,
        IFooter,
        Shop
    }

}

</script>

<style>

@import "./App.vue.css";

</style>
