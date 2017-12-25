<template>

<div class="block col_icon">
    <div :class="'small-box small-box_icon ' + (actived ? 'small-box_icon_active' : '')">
        <div class="inner" >
            <div class="icon_img">
                <i class="fa fa-fw fa-internet-explorer"></i>
            </div>
            <div class="icon_img-name ellipsis">{{name}}</div>
            <div class="icon_img-unicode" v-if="theme != 2">{{unicode.toUpperCase()}}</div>
        </div>
        <div class="inner_float" v-if="theme == 1 || theme == 2">
            <div v-if="theme == 1">
                <div class="inner_float-choose" @click="actived = !actived;e_choose(actived, id, type)">
                    <i class="platform-icons platform-icons_middle" v-if="!actived">&#xea0c;</i>
                    <i class="platform-icons platform-icons_middle" v-if="actived">&#xea0d;</i>
                </div>
                <div class="inner_float-look" @click="e_look(id, type)">
                    <i class="platform-icons platform-icons_middle">&#xea0e;</i>
                </div>
                <div class="inner_float-download" @click="e_download(id, type)">
                    <i class="platform-icons platform-icons_middle">&#xea0b;</i>
                </div>
            </div>
            <div class="inner_float-delete" @click="e_delete(id, type)" v-if="theme == 2">
                <i class="platform-icons platform-icons_middle">&#xea03;</i>
            </div>
        </div>
        <div class="inner_active">
            <i class="platform-icons platform-icons_middle">&#xea0f;</i>
        </div>
    </div>
</div>

</template>

<script>

export default {
    props : {
        unicode: {
            required: true,
            type : String
        },
        name : {
            required : true,
            type : String
        },
        active : {
            required: false,
            type : Boolean,
            default : false
        },
        id : {
            required: true,
            type : Number,
        },
        type : {
            type : String,
            default: "", //默认分类
        },
        e_choose : {
            type : Function,
            default : () => {
                console.log("e_choose", arguments);
            }
        },
        e_look : {
            type : Function,
            default : () => {
                console.log("e_look", arguments);
            }
        },
        e_download : {
            type : Function,
            default : () => {
                console.log("e_download", arguments);
            }
        },
        e_delete : {
            type : Function,
            default : () => {
                console.log("e_delete", arguments);
            }
        },
        /**
         * 标准样式
         * 0 -> 无浮层样式
         * 1 -> 选中、查看、下载
         * 2 -> 删除样式
         */
        theme : {
            type : Number,
            default : 0, //默认样式
        }
    },
    data() {
        return {
            actived : !!this.active,
        }
    }
}

</script>
<style>

@import "./Icon.vue.css";

</style>
