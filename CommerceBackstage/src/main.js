import Vue from 'vue'
import App from './App.vue'

// Element UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI);

// 权限控制
import './permission.js'

// Router
// import VueRouter from 'vue-router'
import router from './router/router.js'
// Vue.use(VueRouter);
// const router = new VueRouter({routes: routerMap})

// vuex
import store from './store/index'

// 封装的请求体
import http from './api/http.js'
Vue.prototype.$http = http


const app = new Vue({
  store,
  router,
}).$mount('#app');
