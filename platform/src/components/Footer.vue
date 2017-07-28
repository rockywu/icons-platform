<template>

<footer class="main-footer">
    <div class="footer-version"><b>版本</b>1.2.14</div>
    <div class="footer-contact">如有使用问题，<a href="mailto:wjl19890427@hotmail.com">请联系管理员</a></div>
</footer>

</template>

<script>

export default {
    data() {
        return {};
    }
}

</script>
<style>
@import "./Footer.vue.css";
.main-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width:100%;
    background-color: #FFF;
    height: 30px;
    box-sizing: border-box;
    line-height:30px;
    padding: 0 15px;
    color: #8590a6;
    font-size: 14px;
}
.footer-version {
    float: left;
}
.footer-contact {
    float: right;
}
.footer-contact a{
    color: #5e9bff;
}
</style>
