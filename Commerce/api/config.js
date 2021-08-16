var Fly = require('../lib/wx.umd.min.js')//npm install flyio --save
var fly = new Fly;

var Api = require('./api.js')
// 配置请求根域名
import store from '../store/index.js'
// export const url ='http://47.116.130.99:21587/seed'
export const url ='http://119.45.18.3/seed'
// fly.config.baseURL = 'http://47.116.130.99:21587/seed'
fly.config.baseURL = 'http://119.45.18.3/seed'
fly.config.timeout = 10 * 1000

// 配置响应拦截器

const whiteLoadingUrl = [
	'/login'
]
Promise.prototype.finally = function(callback){
	let P = this.constructor;
	return this.then(
		value => {
			P.resolve(callback()).then(() => value)
		},
		reason => {
			P.resolve(callback()).then(() => { throw reason })
		}
	)
}

// 配置请求拦截器
fly.interceptors.request.use((request) => {
	
	// 在发送请求前先在这里处理 再发送
	let url = request.url
	let flag = 0
	for(let i = 0 ;i <whiteLoadingUrl.length ; i++){
		if(whiteLoadingUrl[i] == url){
			flag = 1
			break
		}
	}
	request.headers["openid"] = uni.getStorageSync('openid');
	// request.headers["openid"] = store.state.openid;
	
	// request.headers["user-type"] = store.state.loginType;
	request.headers["content-type"]="application/json"
	// console.log('发送请求：',request.url)
    return request;
})

// managerFly.interceptors.request.use((request) => {
// 	request.headers["Platform"] = 'mp'
// 	request.headers["token"] = uni.getStorageSync('token');
// 	request.headers["user-type"] = store.state.loginType;
// 	request.headers["content-type"]="application/json"
// 	console.log('发送请求：',request.url)
// 	return request
// })

export const flyio = fly;
