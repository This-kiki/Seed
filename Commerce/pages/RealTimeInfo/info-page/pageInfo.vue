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
			<slot name="content">
				<view class="infoList" v-for="(item, index) in list" :key="index"><news-card :item="item" :ref="item.id"></news-card></view>
				<view v-if="loadmore" class="bottom" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-if="!loadmore" class="bottom">已经到底啦~~</view>
			</slot>
		</scroll-view>
	</view>
</template>

<script>
import newsCard from '@/pages/RealTimeInfo/infoCard/index.vue';
export default {
	props: ['pageType', 'contentHeight'],
	components: {
		newsCard
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
		this.init();
	},
	methods: {
		go(id) {
			uni.navigateTo({
				url: 'DetailedInfo/DetailedInfo?infoId=' + id
			});
			// console.log(this.$refs[id][0])
			this.$refs[id][0].viewsAdd();
		},
		async init() {
			var that = this;
			let resp;
			var getAPI = {
				current: 1,
				limit: 20
			};
			switch (this.pageType) {
				case 0:
					await this.$api.getSeedInfo(getAPI).then(res => {
						// console.log('种子会资讯',res)
						resp = res;
						this.current.currentPage = this.current.currentPage + 1;
					});
					break;
				case 1:
					await this.$api.getCompanyInfo(getAPI).then(res => {
						// console.log('种子会资讯',res)
						resp = res;
						this.current.currentPage = this.current.currentPage + 1;
					});
					break;
				case 2:
					await this.$api.getMemberInfo(getAPI).then(res => {
						// console.log('种子会资讯',res)
						resp = res;
						this.current.currentPage = this.current.currentPage + 1;
					});
					break;
				case 3:
					await this.$api.getCountryInfo(getAPI).then(res => {
						// console.log('种子会资讯',res)
						resp = res;
						this.current.currentPage = this.current.currentPage + 1;
					});
					break;
				case 4:
					await this.$api.getTopHomeInfo(getAPI).then(res => {
						// console.log('种子会资讯',res)
						resp = '';
						this.current.totalPages = 1;
						this.current.currentPage = this.current.currentPage + 1;
						this.loadmore = false
						if (res.data.AllDynamic.length == 0) {
							this.loadmore = false;
						} else {
							this.list = res.data.AllDynamic;
							setTimeout(function() {
								// console.log('结束了', that.loading);
								that.loading = false;
							}, 500);
						}
					});
					break;
			}
			if (resp) {
				this.current.totalPages = Math.ceil(resp.data.total / 20);
				if (resp.data.rows.length == 0) {
					this.loadmore = false;
				} else {
					this.list = resp.data.rows;
					setTimeout(function() {
						// console.log('结束了', that.loading);
						that.loading = false;
					}, 500);
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
			let resp;
			var getAPI = {
				current: this.current.currentPage,
				limit: 20
			};
			switch (this.pageType) {
				case 0:
					await this.$api.getSeedInfo(getAPI).then(res => {
						// console.log('种子会资讯',res)
						resp = res;
						this.current.currentPage = this.current.currentPage + 1;
					});
					break;
				case 1:
					await this.$api.getCompanyInfo(getAPI).then(res => {
						// console.log('种子会资讯',res)
						resp = res;
						this.current.currentPage = this.current.currentPage + 1;
					});
					break;
				case 2:
					await this.$api.getMemberInfo(getAPI).then(res => {
						// console.log('种子会资讯',res)
						resp = res;
						this.current.currentPage = this.current.currentPage + 1;
					});
					break;
				case 3:
					await this.$api.getCountryInfo(getAPI).then(res => {
						// console.log('种子会资讯',res)
						resp = res;
						this.current.currentPage = this.current.currentPage + 1;
					});
					break;
			}
			if (resp) {
				this.current.totalPages = Math.ceil(resp.data.total / 20);
				if (resp.data.rows.length == 0) {
					setTimeout(function() {
						that.loadmore = false;
					}, 500);
				} else {
					for (var i = 0; i < resp.data.rows.length; i++) {
						this.list.push(resp.data.rows[i]);
						this.loadmoreText = '加载更多';
					}
				}
				this.loadmoreIng = false;
			} else {
				return;
			}
		},
		// 下拉刷新数据列表
		async refresh() {
			this.loading = true;
			this.current.currentPage = 1;
			this.loadmore = true;
			this.loadmoreIng = false;
			this.loadmoreText = '加载更多';
			await this.init();
		}
	}
};
</script>

<style lang="scss">
.page {
	width: 100%;
	background-color: rgb(255, 255, 255);
}
.infoList {
	width: 94%;
	margin: 0rpx auto;
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
