import Vue from 'vue'

// Element UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI);

import App from './App.vue'

// Router
import VueRouter from 'vue-router'
import routerMap from './router/router.js'
Vue.use(VueRouter);

// vuex
import store from './store/index'

// 封装的请求体
import http from './api/http.js'
Vue.prototype.$http = http


const router = new VueRouter({routes: routerMap})

const app = new Vue({
  store,
  router
}).$mount('#app');
