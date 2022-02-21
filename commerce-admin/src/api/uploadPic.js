import axios from 'axios';
import URL from './api';

import router from '../router/router.js';

import { getHeader } from '../utils/header';
import { Message } from 'element-ui';

let baseURL = URL.BASE_URL_DEV;

// 创建axios实例
const servicePic = axios.create({
  baseURL: baseURL, // api 的 base_url
  timeout: 180000, // 请求超时时间
});

// request拦截器
servicePic.interceptors.request.use(
  (config) => {
    let code = config.code;
    config.headers = getHeader(code); // 让每个请求携带自定义签名
    return config;
  },
  (error) => {
    console.log('requset错误:', error); // for debug 11
    Promise.reject(error);
  }
);

// response 拦截器
servicePic.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (
      res.code === 20000 ||
      response.config.url == '/admin/company/getAllCompanyDtlInfoToExcel'
    ) {
      return response.data;
    } else if (res.code == 312) {
      console.log('Token失效跳转登陆页面');
      Message({
        message: 'token失效，请重新登录',
        type: 'error',
      });
      router.push({ path: '/login' });
    } else {
      Message({
        message: res.message,
        type: 'error',
      });
      return Promise.reject('请求失败');
    }
    // }
  },
  (error) => {
    // console.log('response错误:',JSON.stringify(error)) // for debug
    console.log(error);
    Message({
      message: error.message,
      type: 'error',
      duration: 1500,
    });
    return Promise.reject(error);
  }
);

export default servicePic;
