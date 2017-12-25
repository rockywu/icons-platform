<template>
    <router-link class="block" :to="route || {}">
        <div class="small-box small-box_project">
            <div class="inner">
                <div class="row inner_row_project">
                    <div class="col-xs-2" v-for="(icon, index) in icons.slice(0,35)">
                        <i class="fa fa-folder-o"></i>
                    </div>
                </div>
            </div>
            <div class="small-box-footer small-box-footer_project">
                <i class="platform-icons platform-icons_middle">&#xea09;</i>
                {{name}}
                <a class="pull-right">（{{cnt}}）</a>
            </div>
        </div>
    </router-link>

</template>

<script>

export default {
    props : ['icons', 'cnt', 'name', 'route'],
}
</script>
<style>
@import "./Project.vue.css";
</style>
