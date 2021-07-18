import {
	flyio,
	url
} from './config.js';
// var {platform} = require('../config/index')
//公共链接
//接口列表
export class Api {
	tempLogin = async () => {
		return await new Promise((resolve, reject) => {
			uni.login({
				success(res) {
					if (res.code) {
						resolve(res.code)
					}
				}
			})
		})
	}
	post = async (code) => {
		let res = await flyio.post("user/getOpenid", {'code':code})
		// console.log("data:",data)
		return res;
	}
	
	// 获取地区省份
	getAreaList = async () => {
		let res = await flyio.get("school/areaList")
		return res
	}
	
	// 发布帖子
	postPost = async (data) => {
		let res = await flyio.post("post/save",data)
		return res;
	}
}



export default new Api();
