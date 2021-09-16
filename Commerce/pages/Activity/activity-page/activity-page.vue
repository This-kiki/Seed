<template>
	<view>
		<scroll-view
			:style="'height:' + contentHeight + 'px;'"
			class="page"
			scroll-y="true"
			refresher-enabled="true"
			:refresher-triggered="loading"
			@refresherrefresh="refresh"
			@scrolltolower="loadMore"
		>
			<slot slot="content" class="page">
				<!-- 数据列表 -->
				<view v-for="(item, index) in list" :key="index" @click="go(item.id)"><activity-card :options="item"></activity-card></view>
				<view v-if="loadmore" class="bottom" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-if="!loadmore" class="bottom">已经到底啦~~</view>
			</slot>
		</scroll-view>
	</view>
</template>

<script>
import activityCard from '@/pages/Activity/activity-card/index.vue';
export default {
	props: ['contentHeight'],
	components: {
		activityCard
	},
	data() {
		return {
			list: [], // 数据集
			current: {				
				currentPage: 1, // 当前页码
				totalPages: 2 // 总页数
			},
			loading: false,
			loadmore: true,
			loadmoreIng: false,
			loadmoreText: '加载更多'
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
			var that = this
			let resp
			var getAPI = {current: 1,limit: 20}
			await this.$api.getActivity(getAPI).then((res)=> {
				// console.log('活动',res.data)
				resp = res.data
				this.current.currentPage=this.current.currentPage+1
			})
			if(resp){
				this.current.totalPages = Math.ceil(resp.data.total / 20);
				// console.log('活动',resp.data.act)
				if (resp.data.act.length == 0) {
					this.loadmore = false;
				} else {
					this.list = resp.data.act;
					setTimeout(function() {
						// console.log('结束了', that.loading);
						that.loading = false;
					}, 500);
					console.log(this.list)
				}
			}
		},
		// 上划加载更多
		async loadMore() {
			var that = this
			if (this.loadmore == false || this.loadmoreIng == true) {
				console.log('滚');
				return;
			} else {
				this.loadmoreIng = true;
			}
			this.loadmoreText = '拼命加载中...';
			let resp
			var getAPI = {current: this.current.currentPage,limit: 20}
			await this.$api.getActivity(getAPI).then((res)=> {
				// console.log('活动',res)
				resp = res.data
				this.current.currentPage=this.current.currentPage+1
			})
			if(resp){
				this.current.totalPages = Math.ceil(resp.data.total / 20);
				console.log()
				if (resp.data.act.length == 0) {
					setTimeout(function() {
						that.loadmore = false;
					}, 500);
				} else {
					for(var i=0;i<resp.data.act.length;i++){
						this.list.push(resp.data.act[i])
						this.loadmoreText = '加载更多';
					}
				}
				this.loadmoreIng = false;
			} else {
				return
			}
		  },
		// 下拉刷新数据列表
		async refresh() {
			this.loading = true;
			this.current.currentPage = 1;
			this.loadmore = true;
			this.loadmoreIng = false;
			this.loadmoreText = '加载更多';
			await this.init()
		},
	}
};
</script>

<style scoped>
.page {
	background-color: rgb(243, 243, 243);
}
.bottom {
	width: 100%;
	text-align: center;
	height: 60rpx;
	font-size: 25rpx;
	letter-spacing: 5rpx;
	color: rgb(175, 175, 175);
	margin-top: 30rpx;
}
</style>
