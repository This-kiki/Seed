import Vue from 'vue'
import App from './App'

// 请求封装
import Api from './api/api'
Vue.prototype.$api = Api

// vuex
import store from './store/index.js'

// 引入基础样式
import "./static/base.css"
import "./static/iconfont.css"

import topBar from "./components/topBar.vue"
Vue.component('topBar', topBar)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
