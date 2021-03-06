import Vue from 'vue'
import App from './App'

// 请求封装
import Api from './api/api'
Vue.prototype.$api = Api

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// vuex
import store from './store/index.js'
// mixins
import share from "./util/share.js"
Vue.mixin(share)


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
