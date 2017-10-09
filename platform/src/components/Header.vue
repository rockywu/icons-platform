<template>
    <header class="main-header clearfix">
        <div class="header-iconic">I<span>cons</span></div>
        <div class="header-nav clearfix">
            <el-input class="header-input" v-model="input" placeholder="请输入内容" icon="search">
            </el-input>
        </div>
    </header>
</template>

<script>

export default {
    data() {
        return {
            activeIndex: '1',
            input: '11'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}

</script>

<style>
@import "./Header.vue.css";
</style>
