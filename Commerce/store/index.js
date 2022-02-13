import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex
// 通过vuex构造函数创建store对象
const store = new Vuex.Store({
	state: {
		openid: '',
		userMsg: '',
		isSubmit: false,
		jobStatus: 3,
	},
	mutations: {
		setOpenidSync(state, openid) {
			// console.log('Openid:',openid)
			state.openid = openid
		},
		setUserMsg(state, userMsg) {
			// console.log('userMsg',userMsg)
			state.userMsg = userMsg
		},
		setSubmit(state, bool) {
			state.isSubmit = bool
		},
		setJobStatus(state, jobStatus) {
			state.jobStatus = jobStatus
		}
	},
	actions: {
		setOpenid(context, openid) {
			context.commit('setOpenidSync', openid)
		},
		setSubmit(context, bool) {
			context.commit('setSubmit', bool)
		},
		setJobStatus(context, jobStatus) {
			context.commit('setJobStatus', jobStatus)
		}
	},
	getters: {}
})
export default store //导出store对象
