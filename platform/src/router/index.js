import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Upload from '@/pages/Upload'
import List from '@/pages/List'
import Verify from '@/pages/Verify'
import Authority from '@/pages/Authority'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/upload',
            name: 'Upload',
            Component: Upload
        },
        {
            path: '/list',
            name: 'List',
            Component: List
        },
        {
            path: 'verify',
            name: 'Verify',
            Component: Verify

        },
        {
            path: 'authority',
            name: 'Authority',
            Component: Authority
        }
    ]
})
