import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex
// 通过vuex构造函数创建store对象
const store = new Vuex.Store({  
    state: {
		openid: '',
		userMsg: ''
    },
    mutations: {
		setOpenidSync(state, openid) {
			// console.log('Openid:',openid)
			state.openid = openid
		},
		setUserMsg(state, userMsg) {
			// console.log('userMsg',userMsg)
			state.userMsg = userMsg
		}
    },
	actions: {
		setOpenid(context, openid) {
			context.commit('setOpenidSync',openid)
		}
	},
	getters:{
		// 获得token
	}
}) 
export default store //导出store对象