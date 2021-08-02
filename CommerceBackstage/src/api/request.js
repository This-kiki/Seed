import axios from 'axios'
import URL from './api'

// import Vue from 'vue'
// import VueRouter from 'vue-router'
import router from '../router/router.js'
// Vue.use(VueRouter);
// const router = new VueRouter({routes: routerMap})

import { getHeader } from '../utils/header'
import { Message } from 'element-ui'

let baseURL = URL.BASE_URL_DEV;


// 创建axios实例
const service = axios.create({
  baseURL: baseURL, // api 的 base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    let url = config.url.replace(config.baseURL,'');
    let code = config.code;
    config.headers = getHeader(code) // 让每个请求携带自定义签名
    console.log('configer',config)
    return config
  },
  error => {
    console.log('requset错误:',error) // for debug 11
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    if(response.config.responseType=='blob'){
      if(response.status==200){
        return response;
      }else{
        return Promise.reject(error);
      }
    }else{
      const res = response.data;
      if (res.code === 20000) {
        return response.data
      } else if(res.state == false){
        console.log("Token失效跳转登陆页面");
        router.push({path: '/login'})
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 800
        })
        return Promise.reject('请求失败')
      }
    }
  },
  error => {
    // console.log('response错误:',JSON.stringify(error)) // for debug
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 1500
    })
    return Promise.reject(error)
  }
)

export default service