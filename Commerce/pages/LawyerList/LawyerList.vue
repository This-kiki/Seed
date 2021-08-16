<template>
	<view class="lawContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 搜索框 -->
		<view class="inputLine">
			<input class="input" type="text" v-model="inputValue" placeholder="请输入关键字" @focus="showBtn=true"
				@blur="showBtn=false" />
			<view class="searchBtn" v-if="showBtn" @click="searchList()">
				搜索
			</view>
			<view class="clearBtn" v-if="showBtn" @click="clearBtn()">
				清除搜索
			</view>
		</view>
		<!-- 律师列表 -->
		<view class="mainContainer">
			<view class="lawyerBox" v-for="item in lawList" :key="item.id">
				<view class="detail">
					<view class="img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="info">
						<view class="name">
							{{item.name}}
						</view>
						<view class="phone">
							<text>电话</text>
							{{item.phone}}
						</view>
						<view class="num">
							<text>执业证号</text>
							{{item.workNum}}
						</view>
						<view class="place">
							<text>执业律所</text>
							{{item.workplace}}
						</view>
					</view>
				</view>
				<view class="intro">
					{{item.introduce}}
				</view>
				<view class="chat" @click="chat(item)">
					<text class="iconfont icon-chat"></text>
					微聊
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<view class="loadMore" @click="loadMore()">
			下滑(点击)加载更多
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "律师",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 律师列表
				lawList: [],
				// 是否显示按钮
				showBtn: false,
				// 输入
				inputValue: '',
				// 当前页
				current: 1
			};
		},
		created() {
			this.getLawyerList()
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			// 获取律师列表
			async getLawyerList() {
				let data = {
					current: this.current,
					key: this.inputValue,
				}
				let res = await this.$api.getLawyerList(data)
				console.log(res)
				let nowList = res.data.rows
				this.lawList.push.apply(this.lawList, nowList)
			},
			// 搜索工作
			searchList() {
				this.lawList = []
				this.current = 1
				this.getLawyerList()
			},
			// 清除搜索
			clearBtn() {
				this.inputValue = ""
				this.lawList = []
				this.current = 1
				this.getLawyerList()
			},
			// 加载更多
			loadMore() {
				this.current++
				this.getLawyerList()
			},
			// 聊天
			chat(item) {
				uni.navigateTo({
					url: `/pages/Chat/Chat?openid=${item.openId}&name=${item.name}&img=${item.img}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.lawContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.inputLine {
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			padding: 0 3%;
			background-color: #fff;
			padding-bottom: 20rpx;
			border-bottom: 4rpx solid #f1f1f1;
			display: flex;
			justify-content: space-between;
			z-index: 99;

			.input {
				width: 100%;
				height: 60rpx;
				margin: 0 auto;
				padding: 0 20rpx;
				background-color: #f1f1f1;
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
				color: #4e8df6;
			}

			.clearBtn {
				font-size: 24rpx;
				width: 180rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #4e8df6;
			}
		}

		.mainContainer {
			margin-top: 100rpx;

			.lawyerBox {
				width: 96%;
				margin: 20rpx auto 0;
				background-color: #fff;
				border-radius: 14rpx;
				padding: 20rpx;
				box-sizing: border-box;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				.detail {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.img {
						width: 200rpx;
						height: 250rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}

					.info {
						margin-left: 30rpx;

						.name {
							font-size: 30rpx;
							font-weight: bold;
							margin-bottom: 20rpx;
						}

						text {
							font-size: 24rpx;
							color: #333;
							margin-right: 20rpx;
						}

						.phone,
						.num,
						.place {
							font-size: 26rpx;
							margin-top: 10rpx;
						}
					}
				}

				.intro {
					padding-top: 20rpx;
					margin-top: 20rpx;
					border-top: 1rpx #ccc solid;
					text-indent: 2em;
					word-break: break-all;
					letter-spacing: 1rpx;
					line-height: 48rpx;
					font-size: 28rpx;
				}

				.chat {
					margin-top: 16rpx;
					padding-top: 16rpx;
					border-top: 1rpx #ccc solid;
					padding: 10rpx;
					background-color: #117bd1;
					border-radius: 10rpx;
					color: #fff;
					display: flex;
					justify-content: center;

					text {
						margin-right: 10rpx;
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
