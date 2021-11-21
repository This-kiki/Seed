<template>
	<view class="mainContaienr">
		<view class="navbar">
			<view class="header"
				:style="{'height':titleBarHeight,'padding-top':statusBarHeight,'background':'#36c1ba'}">
				<view class="iconfont back" @click="back">
					&#xe613;
				</view>
				<view class="search">
					<view class="inputLine" v-if="current!=4">
						<input class="input" type="text" v-model="content" placeholder="请输入关键字" @focus="showBtn=true"
							@blur="showBtn=false" />
						<view class="searchBtn" v-if="showBtn" @click="init()">
							搜索
						</view>
						<view class="clearBtn" v-if="showBtn" @click="clearBtn()">
							清除搜索
						</view>
					</view>
					<!-- <view class="search-bar">
						<input :focus="true" style="width: 90%;" type="text" v-model="content"
							placeholder="搜索你感兴趣的~~" />
						<span class="iconfont" @click="init">&#xe775;</span>
					</view> -->
				</view>
			</view>
			<view :style="'height:' + titleBarHeight + ';'"></view>
		</view>
		<scroll-view @scrolltolower="loadMore" ref="scroll" :style="'height:' + height.screenHeight + 'px;'"
			class="page" scroll-y="true">
			<slot name="content">
				<view class="infoList" v-for="(item, index) in list" :key="index">
					<news-card :item="item" :ref="item.id" @tap="go(item.id)"></news-card>
				</view>
				<view v-show="springback" class="bottom">已经到底啦~~</view>
			</slot>
		</scroll-view>
		<u-popup v-model="dialog" height="150" mode="bottom" border-radius="15">
			<!-- <button open-type="share" class="share" @click="uninterested">
				<view class="iconfont share-icon">
					&#xe8b6;
				</view>
				<view class="share-content">
					不感兴趣
				</view>
			</button> -->
			<view style="height: 100%;width: 100%;padding: 30rpx 0;">
				<view class="share" @click="uninterested">
					<view class="iconfont share-icon">
						&#xe8b6;
					</view>
					<view class="share-content">
						<view>
							不感兴趣
						</view>
						<view style="color: #bcbcbc;font-size: 24rpx;font-weight: 600;">
							减少此类推荐
						</view>
					</view>
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
				height: 0,
				
				showBtn: false
			};
		},
		created() {
			this.height = uni.getStorageSync('height')
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					if (res.model.indexOf('iPhone') !== -1) {
						that.titleBarHeight = 84 + 'px';
					} else {
						that.titleBarHeight = 88 + 'px';
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
					for (let i = 0; i < this.list.length; i++) {
						if (this.list[i].id == this.shareId) {
							// console.log(this.shareId,'删除了',this.list[i])
							this.list.splice(i, 1);
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
			clearBtn() {
				this.content = ''
				this.current = {
					currentPage: 1, // 当前页码
					totalPages: 2 // 总页数
				}
				this.contentT = ''
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
	.mainContaienr {
		background-color: rgb(245, 245, 245);
		user-select: text;
		-webkit-user-select: text;
	}

	.header {
		box-sizing: content-box;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		top: 0;
		position: fixed;
		width: 100%;
		z-index: 5;
	}

	.back {
		height: 40px;
		width: 10%;
		font-weight: 1000;
		font-size: 35rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search {
		z-index: 6;
		width: 100%;
		height: 45px;
		display: flex;
		align-items: center;
		
		
		// -------------
		.inputLine {
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			height: 40px;
			padding: 0 3%;
			background-color: #36c1ba;
			padding-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			z-index: 99;
		
			.input {
				width: 100%;
				height: 60rpx;
				margin: 0 auto;
				padding: 0 20rpx;
				background-color: #fff;
				text-align: center;
				border-radius: 14rpx;
				letter-spacing: 1rpx;
				transition: 0.2s ease-in-out;
			}
		
			.searchBtn {
				font-size: 24rpx;
				width: 100rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #fff;
			}
		
			.clearBtn {
				font-size: 24rpx;
				width: 180rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #fff;
			}
		}
		// -------------

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
			margin: 0 30rpx 0 50rpx;
		}
	
		.share-content {
			font-size: 30rpx;
			font-weight: 800;
			color: rgb(91, 91, 91);
		}
	}
</style>
