<template>
    <div id="app" class="skin-blue layout-top-nav">
        <div class="wrapper">
            <Header></Header>
            <div class="content-wrapper">
                <div class="container">
                    <section class="content-header">
                        <Tabs></Tabs>
                    </section>
                    <section class="content">
                        <router-view></router-view>
                    </section>
                </div>
            </div>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>

import Header from "@/components/Header.vue"
import Tabs from "@/components/Tabs.vue"
import Footer from "@/components/Footer.vue"
export default {
    name: 'app',
    components : {
        Header,
        Tabs,
        Footer
    }

}

</script>

<style>

@import "./App.vue.css";

</style>
