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
						<input :focus="true" style="width: 90%;" type="text" v-model="content" placeholder="搜索你感兴趣的~~" />
						<span class="iconfont" @click="init">&#xe775;</span>
					</view>
				</view>
			</view>
			<view :style="'height:' + titleBarHeight + ';'"></view>
		</view>
		<scroll-view @scrolltolower="loadMore" ref="scroll" :style="'height:' + height.screenHeight + 'px;'" class="page" scroll-y="true">
			<slot name="content">
				<view class="infoList" v-for="(item, index) in list" :key="index">
					<news-card :item="item" :ref="item.id"></news-card>
				</view>
				<view v-show="springback" class="bottom">已经到底啦~~</view>
			</slot>
		</scroll-view>
		<u-popup v-model="dialog" height="100" mode="bottom" border-radius="15">
			<view class="share" @click="uninterested">
				<view class="iconfont share-icon">
					&#xe8b6;
				</view>
				<view class="share-content">
					不感兴趣
				</view>
			</view>
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
			this.height = uni.getStorageSync('height')
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					if (res.model.indexOf('iPhone') !== -1) {
						that.titleBarHeight = 44 + 'px';
					} else {
						that.titleBarHeight = 48 + 'px';
					}
					that.statusBarHeight = res.statusBarHeight + 'px'
				},

			})
		},
		methods: {
			uninterested() {
				var getAPI = {
					id: this.shareId
				}
				this.$api.uninterestedInfo(getAPI).then((res) => {
					// console.log(res)
					for(let i=0;i<this.list.length;i++) {
						if(this.list[i].id == this.shareId) {
							// console.log(this.shareId,'删除了',this.list[i])
							this.list.splice(i,1);
						}
					}
				})
				this.dialog = false
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
				this.springback = true
				var that = this;
				let resp;
				var postAPI = {
					keyword: this.content
				}
				// console.log(postAPI)
				await this.$api.searchIfo(postAPI).then((resp) => {
					if (resp) {
						if (resp.data.list.length == 0) {
							// this.loadmore = false;
							this.$refs.uToast.show({
								title: '无对应搜索数据',
								type: 'warning',
							})
							setTimeout(function() {
								uni.navigateBack({})
							}, 1000)
						} else {
							this.list = resp.data.list;
							setTimeout(function() {
								// console.log('结束了', that.loading);
								that.loading = false;
							}, 500);
							// console.log(this.list)
						}
					}
				})
			},
			loadMore() {
				var that = this
				that.springback = true;
				setTimeout(function() {
					that.springback = false;
				}, 1000);
			}
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
			// color: #adadad;
			font-size: 24rpx;
			font-weight: 500;
			letter-spacing: 3rpx;
		}
	}

	.page {
		margin-top: 44rpx;
		// min-height: 100vh;
		// width: 100%;
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
