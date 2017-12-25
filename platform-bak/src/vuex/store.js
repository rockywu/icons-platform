"use strict";
/**
 * Created by rocky on 2017/7/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
Vue.use(Vuex);

//数据状态
const state = {};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
