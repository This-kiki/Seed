<template>
	<view>
		<view class="navbar">
			<view class="header"
				:style="{'height':titleBarHeight,'padding-top':statusBarHeight,'background':'#36c1ba'}">
				<view class="iconfont back" @click="back">
					&#xe613;
				</view>
				<view class="search">
					<view class="search-bar">
						<input focus="true" style="width: 90%;" type="text" v-model="content" placeholder="搜索你感兴趣的~~" />
						<span class="iconfont" @click="init">&#xe775;</span>
					</view>
				</view>
			</view>
			<view :style="'height:' + titleBarHeight + ';'"></view>
		</view>
		<scroll-view ref="scroll" :style="'height:' + 1000 + 'px;'" class="page" scroll-y="true"
			:refresher-triggered="loading" @refresherrefresh="refresh" @scrolltolower="loadMore">
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
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import newsCard from '@/pages/RealTimeInfo/infoCard/index.vue';
	export default {
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

				content: '',
				contentT: '',

				dialog: false,

				statusBarHeight: 0,
				titleBarHeight: 0,
				height: 0
			};
		},
		created() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					if (res.model.indexOf('iPhone') !== -1) {
						that.titleBarHeight = 44 + 'px';
						that.height = res.statusBarHeight + 44
					} else {
						that.titleBarHeight = 48 + 'px';
						that.height = res.statusBarHeight + 48
					}
					that.statusBarHeight = res.statusBarHeight + 'px'
				},

			})
		},
		methods: {
			shareInfo() {
				this.dialog = false
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					title: '张立辛',
					summary: '张立辛'
				});
				console.log('000')
			},
			back() {
				uni.navigateBack({})
			},
			dialogFather(id) {
				this.shareId = id
				this.dialog = true
			},
			go(id) {
				uni.navigateTo({
					url: '../DetailedInfo/DetailedInfo?infoId=' + id,
				});
				// console.log(this.$refs[id][0])
				this.$refs[id][0].viewsAdd();
			},
			async init() {
				var that = this;
				let resp;
				this.contentT = this.content
				this.current = {
					currentPage: 1, // 当前页码
					totalPages: 0 // 总页数
				}
				var postAPI = {
					current: this.current.currentPage,
					content: this.contentT
				}
				await this.$api.searchIfo(postAPI).then((res) => {
					// console.log('searchResult', res)
					resp = res
					this.current.currentPage = this.current.currentPage + 1
				})
				if (resp) {
					this.current.totalPages = Math.ceil(resp.data.total / 20);
					if (resp.data.rows.length == 0) {
						this.loadmore = false;
						this.$refs.uToast.show({
							title: '无对应搜索数据',
							// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
							type: 'warning',
						})
						setTimeout(function() {
							uni.navigateBack({})
						}, 1000)
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
				var postAPI = {
					current: this.current.currentPage,
					content: this.contentT
				}
				await this.$api.searchIfo(postAPI).then((res) => {
					resp = res
					console.log('searchResult', res)

					this.current.currentPage = this.current.currentPage + 1
				})
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
		}
	};
</script>

<style lang="scss" scoped>
	.header {
		box-sizing: content-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		top: 0;
		position: fixed;
		width: 100%;
		z-index: 5;
	}

	.back {
		width: 10%;
		font-weight: 1000;
		font-size: 35rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search {
		z-index: 6;
		width: 90%;
		height: 75rpx;
		display: flex;
		align-items: center;

		.search-bar {
			width: 65%;
			height: 55rpx;
			border-radius: 40rpx;
			background-color: rgb(248, 248, 248);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 25rpx;
			color: #adadad;
			font-size: 24rpx;
			font-weight: 500;
			letter-spacing: 3rpx;
		}
	}

	.page {
		margin-top: 85rpx;
		// min-height: 100vh;
		background-color: rgb(255, 255, 255);
		width: 100%;
	}

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
</style>
