import Vue from 'vue'
import App from './App.vue'

// Element UI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 权限控制
import './permission.js'

// Router
import router from './router/router.js'
// vuex
import store from './store/index'

// 封装的请求体
import http from './api/http.js'
Vue.prototype.$http = http


const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
