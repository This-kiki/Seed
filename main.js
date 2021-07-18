import Vue from 'vue'
import App from './App'

// 请求封装
import Api from './api/api'
Vue.prototype.$api = Api

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
