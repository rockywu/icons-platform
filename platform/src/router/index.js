import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Upload from '@/pages/Upload'
import List from '@/pages/List'
import Verify from '@/pages/Verify'
import Authority from '@/pages/Authority'

Vue.use(Router)

export let routes = [
    {
        path: '/',
        name: 'Home',
        label: "项目集",
        component: Home
    },
    {
        path: '/projects/:id',
        name: 'Project',
        label: "项目",
        component: Home
    },
    {
        path: '/upload',
        name: 'Upload',
        label : "上传字体",
        component: Upload
    },
    {
        path: '/list',
        name: 'List',
        label : "全部字体",
        component: List
    },
    {
        path: '/verify',
        name: 'Verify',
        label : "审核字体",
        component: Verify

    },
    {
        path: '/authority',
        name: 'Authority',
        label : "用户权限",
        component: Authority
    },
    {
        path: '/ajax/authority',
        name: 'AjaxAuthority',
        label : "用户权限操作",
        component: Authority
    }
]
let router = new Router({
    mode: 'history',
    base : "/",
    routes
})
//router.beforeEach((to, from, next) => {
//    console.log(to, from)
//    next();
//});
export default router;
