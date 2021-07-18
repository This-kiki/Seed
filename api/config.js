var Fly = require('../lib/wx.umd.min.js')//npm install flyio --save
var fly = new Fly;

var Api = require('./api.js')
// var {platform,env,localhostUrl,onlineUrl,stableUrl,loadingModal} = require('../config/index')
// var errorFly = new Fly
// var newFly = new Fly;
// var managerFly = new Fly
// 配置请求根域名
import store from '../store/index.js'
// localhostUrl 本地后台地址
// onlineUrl 线上后台地址
export const url ='https://gjwstudy.xyz/yjs'
fly.config.baseURL = 'https://gjwstudy.xyz/yjs'
fly.config.timeout = 10 * 1000
// 配置响应拦截器
// newFly.config = fly.config;

// errorFly.config.baseURL = 'http://localhost:4002'
// errorFly.config.timeout = 10 *1000

// managerFly.config.baseURL = 'https://wusthelper.wustlinghang.cn/' + 'wusthelperadminapi'
// managerFly.config.timeout = 10 * 1000

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

// fly.interceptors.response.use(
// 	// 这里是对后端请求返回数据的一个统一拦截，经过这里处理，再返回到你调用接口那个地方的回调res里面。
//     async function (response) {
// 		store.dispatch('sethideLoading')
// 		// loadingModal.isshow = false
//             // 10001请求报错,未知异常
// 			if(response.data.code == 20001){
// 				// 外部调用登录接口成功，存储token
// 				uni.setStorageSync('token',response.data.data);
// 			}
//             if (response.data.code != 10001) {
// 				//10000 小程序登录态过期/无效
//                 if(response.data.code == 10000){ 
// 					if(response.request.headers['Again'] == 1){
// 						// 本次请求为重发请求  不重发，不登录
// 						return response
// 					}
// 					// 所著所有请求，先重新登录
// 					fly.lock();
// 					//重新登录，重新获取token
// 					// 从官方获取临时code
// 					let code = await tempLogin();	
// 					console.log("code",code)
// 					// 给后台发送登录请求，携带code与platform（qq or wechat）
// 					// store.dispatch('setShowLoading','登录小程序中')
// 					return newFly.post("/login", {code: code},{headers:{'platform':platform}}).then((d) => {
// 						console.log("d",d)
// 						// 成功获取，将token 存入本地
// 						uni.setStorageSync('token',d.data.data);
// 						// 获取用户信息
// 						// uni.getUserInfo({
// 						//       success: function (infoRes) {
// 						//         console.log('用户信息：' , infoRes.userInfo);
// 						//       }
// 						// });
// 					}).finally(() => fly.unlock()) //解锁后，会继续发起请求队列中的任务 
// 					 .then(() => {
// 						console.log(`重新请求：path:${response.request.url}，baseURL:${response.request.baseURL}`)
// 						//设置标识位，表明这是重新登录后重新发起的请求
// 						response.request.headers['Again'] = 1
// 						return fly.request(response.request);
// 					})

//                 }

// 				//30000 教务登录态过期/无效
// 				if(response.data.code == 30000){ 
// 					// 防止登录与其他接口返回调用进入死循环，
// 					if(response.request.headers['again'] == 1){
// 						// 本次请求为重发请求  不重发,不登录
// 						return response
// 					}
// 					fly.lock();
// 					//重新获取教务登录态 从本地获取教务账号密码，与小程序登录态token
// 					const jwcinfo = uni.getStorageSync('jwcInfo');
// 					if(jwcinfo == ''){
// 						console.log("教务信息为空")
// 						uni.navigateTo({
// 							url:'../jwclogin/jwclogin?type=1'
// 						})
// 					}
// 					const token = uni.getStorageSync('token')
// 					// 携带以上信息请求教务登录接口
// 					store.dispatch('setShowLoading','登录教务中')
// 					return newFly.post("/jwc/login", jwcinfo,{headers:{'platform':platform,'token':token}}).then((d) => {
// 						console.log("d",d)
// 						let data = d.data
// 						if(data.code == 30033){
// 							uni.showModal({
// 								title:'错误',
// 								content: data.data,
// 								confirmText:'去登录',
// 								showCancel: true,
// 								cancelText: '算了',
// 								success:function(res){
// 									if(res.confirm){
// 										uni.redirectTo({
// 											url:'../jwclogin/jwclogin?type=0'
// 										})
// 									}
// 								}
// 							})
// 						} else if(data.code == 30032){
// 							uni.showModal({
// 								title:'错误',
// 								content: data.data,
// 								confirmText:'知道了',
// 								showCancel: false,
// 							})
// 						} else if(data.code == 30033){
// 							uni.showModal({
// 								title:'错误',
// 								content: data.data,
// 								confirmText:'知道了',
// 								showCancel: false,
// 							})
							
// 						} else if (data.data.union == 0){
// 							// 没有关联
// 							uni.navigateTo({
// 								url:'../union/union'
// 							})
// 						}
					
// 					}).finally(() => fly.unlock()) //解锁后，会继续发起请求队列中的任务 
// 					 .then(() => {
// 						console.log(`重新请求：path:${response.request.url}，baseURL:${response.request.baseURL}`)
// 						response.request.headers['again']=1
// 						return fly.request(response.request);
// 					})
				
// 				}
				
// 				//40000 图书馆登录态过期/无效
// 				if(response.data.status == 40000){ 
// 					// 防止登录与其他接口返回调用进入死循环，
// 					if(response.request.headers['again'] == 1){
// 						// 本次请求为重发请求  不重发,不登录
// 						return response
// 					}
// 					fly.lock();
// 					//重新获取图书馆登录态 从本地获取账号密码，与小程序登录态token
// 					const libinfo = uni.getStorageSync('libInfo');
// 					if(libinfo == ''){
// 						console.log("图书馆信息为空")
// 						uni.navigateTo({
// 							url:'../liblogin/liblogin?type=1'
// 						})
// 					}
// 					const token = uni.getStorageSync('token')
// 					// 携带以上信息请求教务登录接口
// 					store.dispatch('setShowLoading','登录图书馆中')
// 					return newFly.post({
// 					  method: "post",
// 					  url: "/wustlib/login",
// 					  params: {
// 						stuNum: libinfo.stuNum,
// 						password: libinfo.password,
// 					  },
// 					}).then((d) => {
// 						console.log("d",d)
// 						let data = d.data
// 						if(data.status == 40042){
// 							uni.showModal({
// 								title:'错误',
// 								content: '图书馆账号不存在或密码错误，请重新登录！',
// 								confirmText:'去登录',
// 								showCancel: true,
// 								cancelText: '算了',
// 								success:function(res){
// 									if(res.confirm){
// 										uni.redirectTo({
// 											url:'../liblogin/liblogin?type=1'
// 										})
// 									}
// 								}
// 							})
// 						} else if(data.status == 40043){
// 							uni.showModal({
// 								title:'错误',
// 								content: '图书馆登录服务异常（网络错误）,请稍后错峰重试！',
// 								confirmText:'知道了',
// 								showCancel: false,
// 							})
// 						}
// 					}).finally(() => fly.unlock()) //解锁后，会继续发起请求队列中的任务 
// 					 .then(() => {
// 						console.log(`重新请求：path:${response.request.url}，baseURL:${response.request.baseURL}`)
// 						response.request.headers['again']=1
// 						return fly.request(response.request);
// 					})
// 				}
// 				//70005 研究生登录态过期/无效
// 				if(response.data.code == 70005){
// 					// 防止登录与其他接口返回调用进入死循环，
// 					if(response.request.headers['again'] == 1){
// 						// 本次请求为重发请求  不重发,不登录
// 						return response
// 					}
// 					fly.lock();
// 					//重新获取教务登录态 从本地获取教务账号密码，与小程序登录态token
// 					const jwcinfo = uni.getStorageSync('jwcInfo');
// 					if(jwcinfo == ''){
// 						console.log("教务信息为空")
// 						uni.navigateTo({
// 							url:'../jwclogin/jwclogin?type=1'
// 						})
// 					}
// 					const token = uni.getStorageSync('token')
// 					// 携带以上信息请求教务登录接口
// 					store.dispatch('setShowLoading','登录中')
// 					return newFly.post("/yjs/login", jwcinfo,{headers:{'platform':platform,'token':token}}).then((d) => {
// 						console.log("d",d)
// 						let data = d.data
// 						if(data.code == 70002){
// 							uni.showModal({
// 								title:'错误',
// 								content: data.data,
// 								confirmText:'去登录',
// 								showCancel: true,
// 								cancelText: '算了',
// 								success:function(res){
// 									if(res.confirm){
// 										uni.redirectTo({
// 											url:'../jwclogin/jwclogin?type=0'
// 										})
// 									}
// 								}
// 							})
// 						} else if(data.code == 70003){
// 							uni.showModal({
// 								title:'错误',
// 								content: data.data,
// 								confirmText:'知道了',
// 								showCancel: false,
// 							})
// 						} else if(data.code == 70004){
// 							uni.showModal({
// 								title:'错误',
// 								content: data.data,
// 								confirmText:'知道了',
// 								showCancel: false,
// 							})
							
// 						} else if(data.code == 70006){
// 							uni.showModal({
// 								title:'错误',
// 								content: data.data,
// 								confirmText:'知道了',
// 								showCancel: false,
// 							})
							
// 						}
					
// 					}).finally(() => fly.unlock()) //解锁后，会继续发起请求队列中的任务 
// 					 .then(() => {
// 						console.log(`重新请求：path:${response.request.url}，baseURL:${response.request.baseURL}`)
// 						response.request.headers['again']=1
// 						return fly.request(response.request);
// 					})
				
// 				}
// 				console.log('拦截',response.data)
// 				// 研究生登录直接请求
// 				if(response.data.code == 70002 || response.data.code == 70003 || response.data.code == 70004 || response.data.code == 70005 || response.data.code == 70006){
// 					uni.showModal({
// 						title:'错误',
// 						content: response.data.data,
// 						confirmText:'知道了',
// 						showCancel: false,
// 					})
// 				}
				
// 				// 本科教务登录直接请求
// 				if(response.data.code == 30033 || response.data.code == 30032){
// 					// 本地教务信息与实际不匹配，可能在其他地方修改了教务密码
// 					uni.showModal({
// 						title:'错误',
// 						content:response.data.data,
// 						confirmText:'知道了',
// 						showCancel: false
// 					})
// 				}
// 				else if(response.data.code == 30034){
// 					// 修改默认密码
// 					uni.showModal({
// 						content: response.data.data,
// 						confirmText:'复制网址',
// 						showCancel: false,
// 						success:function(res){
// 							if(res.confirm){
// 								uni.setClipboardData({
// 								    data: 'http://bkjx.wust.edu.cn'
// 								});
// 							}
// 						}
						
// 					})
// 				}
//             }else{
//                 //只将请求结果的data字段返回
//                 return response.data.data
//             }
// 			return response;
//         },
//         (err) => {
// 			store.dispatch('sethideLoading')
// 			uni.showToast({
// 				icon:'none',
// 				duration:2000,
// 				title:'请求失败，请检查网络连接！'
// 			})
// 			errorFly.post('/mp/neterror');
			
//             //发生网络错误后会走到这里
//             return Promise.resolve("网络请求：ERROR！")
//         }
// )
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
	// if(flag == 0){
	// 	// 只有不在白名单的才显示加载中
	// 	store.dispatch('setShowLoading','加载中')
	// }
	// console.log(url)
	// request.headers["platform"] = platform
	// request.headers["openid"] = uni.getStorageSync('openid');
	request.headers["openid"] = store.state.openid;
	
	// request.headers["user-type"] = store.state.loginType;
	request.headers["content-type"]="application/json"
	console.log('发送请求：',request.url)
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

//获取临时code
//  var tempLogin = async ()=>{
//     return await new Promise((resolve, reject) => {
//         uni.login({
//             success(res) {
//                 if (res.code) {
//                     resolve(res.code)
//                 }
//             }
//         })
//     })
// }
export const flyio = fly;
// export const managerio = managerFly