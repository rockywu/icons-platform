<template>

<div class="page_home">
    <div class="row row-home">
        <Project v-for="(row, index) in list" :key="index"
             :class="'col-lg-3 col-sm-4 col-xs-6'"
             :icons="row.icons" :name="row.name"
             :cnt="row.cnt" :route="row.route || {}"></Project>
    </div>
</div>


</template>

<script>
import Project from "@/components/Project.vue"
export default {
    components : {
        Project
    },
    data () {
        return {
            list : [
                {
                    icons : [1,2,3,4,5,6,7,8,9],
                    name : "新房阿斯顿发",
                    cnt : "55",
                    route : {
                        name : "Project",
                        params : {id : 2}
                    }
                },
                {
                    icons : [1,2,3,4,5,6,7,8,9],
                    name : "新房阿斯顿发",
                    cnt : "55",
                },
                {
                    icons : [1,2,3,4,5,6,7,8,9],
                    name : "新房阿斯顿发",
                    cnt : "55"
                },
                {
                    icons : [1,2,3,4,5,6,7,8,9],
                    name : "新房阿斯顿发",
                    cnt : "55"
                },
                {
                    icons : [1,2,3,4,5,6,7,8,9],
                    name : "新房阿斯顿发",
                    cnt : "55"
                },
            ]
        }
    }
}

</script>

<style>

@import "./Home.vue.css";

</style>
