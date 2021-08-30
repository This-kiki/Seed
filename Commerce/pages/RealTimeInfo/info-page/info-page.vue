<template>
	<view>
		<!-- <loading ref="loadRefresh" :currentPage="current.currentPage" :totalPages="current.totalPages"
			@loadMore="loadMore" @refresh="refresh">
			<view slot="content-list" class="page">
			</view>
		</loading> -->

		<!-- 数据列表 -->
		<view class="infoList" v-for="(item, index) in list" :key="index" @click="go(item.id)">
			<news-card :item="item" :ref="item.id"></news-card>
		</view>
	</view>
</template>

<script>
	import loading from '@/components/info_Com/load-refresh/load-refresh.vue';
	import newsCard from '@/pages/RealTimeInfo/infoCard/index.vue';
	export default {
		props: ['pageType'],
		components: {
			loading,
			newsCard
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
					url: 'DetailedInfo/DetailedInfo?infoId=' + id,
				});
				// console.log(this.$refs[id][0])
				this.$refs[id][0].viewsAdd();
			},
			async init() {
				let resp
				var getAPI = {
					current: 1,
					limit: 20
				}
				switch (this.pageType) {
					case 0:
						await this.$api.getSeedInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 1:
						await this.$api.getCompanyInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 2:
						await this.$api.getMemberInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 3:
						await this.$api.getCountryInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
				}
				if (resp) {
					this.current.totalPages = resp.data.total
					this.list = resp.data.rows
				}
			},
			// 上划加载更多
			async loadMore() {
				let resp
				var getAPI = {
					current: this.current.currentPage,
					limit: 20
				}
				switch (this.pageType) {
					case 0:
						await this.$api.getSeedInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 1:
						await this.$api.getCompanyInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 2:
						await this.$api.getMemberInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 3:
						await this.$api.getCountryInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
				}
				if (resp) {
					this.current.totalPages = resp.data.total
					for (var i = 0; i < resp.data.rows.length; i++) {
						this.list.push(resp.data.rows[i])
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

<style lang="scss">
	.page {
		padding-top: 10rpx;
		min-height: 50rpx;
		background-color: rgb(255, 255, 255);
	}

	.infoList {
		width: 94%;
		margin: 0rpx auto;
	}
</style>
