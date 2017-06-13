<template>
    <a class="col-lg-3 col-sm-4 col-xs-6" :href="link">
        <div class="small-box small-box_project">
            <div class="inner">
                <div class="row inner_row_project">
                    <div class="col-xs-2" v-for="(icon, index) in icons.slice(0,35)">
                        <i class="fa fa-fw fa-gg-circle"></i>
                    </div>
                </div>
            </div>
            <div class="small-box-footer small-box-footer_project">
                <i class="fa fa-folder-o"></i>
                {{name}}
                <a class="pull-right">（{{cnt}}）</a>
            </div>
        </div>
    </a>

</template>

<script>

export default {
    props : ['icons', 'cnt', 'name', 'link'],
    data ()
    {
        return {}
    }
}
</script>
<style>
@import "./Project.vue.css";
</style>
