<template>
	<view class="lawCommon" :style="{height:height+'px'}">
		<!-- 搜索框 -->
		<view class="inputLine">
			<input class="input" type="text" v-model="inputValue" placeholder="请输入关键字" @focus="showBtn=true" />
			<view class="searchBtn" v-if="showBtn" @click="searchList()">
				搜索
			</view>
			<view class="clearBtn" v-if="showBtn" @click="clearBtn()">
				清除搜索
			</view>
		</view>
		<!-- 法律常识 -->
		<view class="lawList" :style="{height:height+'px'}">
			<view class="lawBox" v-for="item in lawList" :key="item.id">
				<view class="title">
					{{item.title.trim()}}
					<text class="iconfont icon-gengduo1"></text>
				</view>
				<view class="content" @click="seeDetail(item.id)">
					{{item.brief.trim()}}
				</view>
				<view class="bottom" @click="seeDetail(item.id)">
					<view class="view">
						<text class="iconfont icon-view"></text>
						{{item.view}}
					</view>
					<view class="date">
						{{item.createTime.slice(5,10) }}
					</view>
				</view>
			</view>
			<!-- 加载 -->
			<view class="loadMore" @click="loadMore()">
				下滑(点击)加载更多
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['height'],
		data() {
			return {
				// 常识列表
				lawList: [],
				// 当前页
				current: 1,
				// 是否显示按钮
				showBtn: false,
				// 输入
				inputValue: '',
				// 身份
				identity: 0,
			};
		},
		created() {
			this.getLawInfo()
		},
		methods: {
			// 获取法律常识
			async getLawInfo() {
				let data = {
					current: this.current,
					key: this.inputValue
				}
				let res = await this.$api.getLawInfo(data)
				console.log(res)
				let nowList = res.data.list
				this.lawList.push.apply(this.lawList, nowList)
			},
			// 查看详情
			seeDetail(id) {
				uni.navigateTo({
					url: `/pages/LawInfoDetail/LawInfoDetail?id=${id}`
				})
			},
			// 加载更多
			loadMore() {
				this.current++
				this.getLawInfo()
			},
			// 搜索工作
			searchList() {
				setTimeout(() => {
					this.showBtn = false
				}, 400)
				this.lawList = []
				this.current = 1
				this.getLawInfo()
			},
			// 清除搜索
			clearBtn() {
				setTimeout(() => {
					this.showBtn = false
				}, 400)
				this.inputValue = ""
				this.lawList = []
				this.current = 1
				this.getLawInfo()
			},
		}
	}
</script>

<style lang="scss">
	.lawCommon {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		background-color: #f5f5f5;
		position: relative;

		.inputLine {
			box-sizing: border-box;
			position: fixed;
			top: 0;
			left: 0;
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

		.lawList {
			width: 100%;
			margin: auto;
			padding-top: 90px;
			overflow-y: scroll;

			.lawBox {
				background-color: #fff;
				padding: 20rpx 4%;
				margin-bottom: 14rpx;
				letter-spacing: 1rpx;

				.title {
					font-size: 30rpx;
					font-weight: bold;
					color: #000;
					position: relative;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.iconfont {
						font-size: 40rpx;
						font-weight: normal;
					}
				}

				.content {
					margin-top: 20rpx;
					color: #141414;
					font-size: 28rpx;
					word-break: break-all;
					line-height: 48rpx;
				}

				.bottom {
					color: #999;
					font-size: 22rpx;
					padding-top: 16rpx;
					margin-top: 16rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.date {}

					.view {
						display: flex;
						align-items: center;

						.iconfont {
							margin-right: 8rpx;
						}
					}
				}
			}
		}

		.loadMore {
			text-align: center;
			font-size: 26rpx;
			color: #999;
			margin-top: 16rpx;
		}

	}
</style>
