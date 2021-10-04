<template>
	<view>
		<scroll-view ref="scroll" :style="'height:' + contentHeight + 'px;'" class="page" scroll-y="true"
			refresher-enabled="true" :refresher-triggered="loading" @refresherrefresh="refresh"
			@scrolltolower="loadMore">
			<slot name="content">
				<view class="infoList" v-for="(item, index) in list" :key="index">
					<news-card :item="item" :ref="item.id"></news-card>
				</view>
				<view v-if="loadmore" class="bottom" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-show="springback" class="bottom">已经到底啦~~</view>
			</slot>
		</scroll-view>
		<u-popup v-model="dialog" height="100" mode="bottom" border-radius="15">
			<button open-type="share" class="share" @click="shareInfo">
				<view class="iconfont share-icon">
					&#xe63f;
				</view>
				<view class="share-content">
					分享
				</view>
			</button>
		</u-popup>
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
				loadmoreText: '加载更多',
				springback: false,

				dialog: false,
				shareId: ''
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			shareInfo() {
				var getAPI = {
					id: this.shareId
				}
				this.$api.getOneInfo(getAPI).then((res) => {
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 0,
						title: res.data.info.title,
						summary: res.data.info.simpleContent,
						href: '../DetailedInfo/DetailedInfo?infoId=' + res.data.info.id
					});
				})
				this.dialog = false
			},
			dialogFather(id) {
				this.shareId = id
				this.dialog = true
			},
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
					pageType: this.pageType
				};
				await this.$api.getAllInfo(getAPI).then(res => {
					// console.log('种子会资讯',res)
					resp = res;
					this.current.currentPage = this.current.currentPage + 1;
				});
				if (resp) {
					this.current.totalPages = Math.ceil(resp.data.total / 20);
					if (resp.data.rows.length == 0) {
						this.loadmore = false;
						this.springback = true;
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
				this.springback = true
				var that = this
				if (this.loadmore == false || this.loadmoreIng == true) {
					console.log('滚');
					setTimeout(function() {
						that.springback = false;
					}, 1000);
					return;
				} else {
					this.loadmoreIng = true;
				}
				this.loadmoreText = '拼命加载中...';
				let resp;
				var getAPI = {
					current: this.current.currentPage,
					pageType: this.pageType
				};
				await this.$api.getAllInfo(getAPI).then(res => {
					// console.log('种子会资讯',res)
					resp = res;
					this.current.currentPage = this.current.currentPage + 1;
				});
				if (resp) {
					this.current.totalPages = Math.ceil(resp.data.total / 20);
					if (resp.data.rows.length == 0) {
							that.loadmore = false;
							that.springback = true;
							setTimeout(function() {
								that.springback = false;
							}, 1000);
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
				this.springback = false
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
		background-color: rgb(245, 245, 245);
	}

	.infoList {
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

	.share {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100%;
		width: 100%;
		border: 0 !important;
		outline: none;
		background-color: rgb(255, 255, 255);

		.share-icon {
			font-size: 40rpx;
			font-weight: 800;
			color: rgb(130, 130, 130);
			margin: 0 30rpx 0 40rpx;
		}

		.share-content {
			font-size: 30rpx;
			font-weight: 800;
			color: rgb(91, 91, 91);
		}
	}

	.share:active {
		background-color: rgb(227, 227, 227);
	}
</style>
