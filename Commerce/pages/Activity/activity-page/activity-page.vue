<template>
	<view>
		<loading ref="loadRefresh" :currentPage="current.currentPage" :totalPages="current.totalPages" @loadMore="loadMore" @refresh="refresh">
			<view slot="content-list" class="page">
				<!-- 数据列表 -->
				<view v-for="(item, index) in list" :key="index" @click="go(item.id)"><activity-card :options="item"></activity-card></view>
			</view>
		</loading>
	</view>
</template>

<script>
import loading from '@/components/info_Com/load-refresh/load-refresh.vue';
import activityCard from '@/pages/Activity/activity-card/index.vue';
export default {
	components: {
		loading,
		activityCard
	},
	data() {
		return {
			list: [], // 数据集
			current: {				
				currentPage: 1, // 当前页码
				totalPages: 2 // 总页数
			}
		};
	},
	mounted() {
		this.init()
	},
	methods: {
		go(id) {
			uni.navigateTo({
				url: 'ActivityInfo/ActivityInfo?activityId='+id,
			});
		},
		async init() {
			let resp
			var getAPI = {current: 1,limit: 20}
			await this.$api.getActivity(getAPI).then((res)=> {
				// console.log('种子会资讯',res)
				resp = res.data
				this.current.currentPage=this.current.currentPage+1
			})
			if(resp){
				this.current.totalPages = resp.data.total
				this.list = resp.data.act
			}
		},
		// 上划加载更多
		async loadMore() {
			let resp
			var getAPI = {current: this.current.currentPage,limit: 20}
			await this.$api.getActivity(getAPI).then((res)=> {
				// console.log('种子会资讯',res)
				resp = res.data
				this.current.currentPage=this.current.currentPage+1
			})
			if(resp){
				this.current.totalPages = resp.data.total
				for(var i=0;i<resp.data.act.length;i++){
					this.list.push(resp.data.act[i])
				}
			}
			this.$refs.loadRefresh.completed()
		  },
		// 下拉刷新数据列表
		async refresh() {
			this.current.currentPage = 1
			await this.init()
			this.$refs.loadRefresh.completed()
		},
		// 代码触发下拉刷新方法
		runRefresh() {
			this.$refs.loadRefresh.runRefresh()
		}
	}
};
</script>

<style>
.page {
	min-height: 50rpx;
	background-color: rgb(255, 255, 255);
}
</style>
