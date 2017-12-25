<template>
    <div class="container">
        <el-header></el-header>
        <el-nav></el-nav>
        <el-footer></el-footer>
    </div>
</template>
<script>

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default {
    components : {
        "el-header" : Header,
        "el-footer" : Footer,
        "el-nav" : Nav
    }
}

</script>

<style>
@import "./reset.css";
@import "./App.vue.css";

</style>
