<template>

<div class="row row_home">
    <Project v-for="(row, index) in list"
        :icons="row.icons" :name="row.name"
        :cnt="row.cnt" :link="row.link"></Project>
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
