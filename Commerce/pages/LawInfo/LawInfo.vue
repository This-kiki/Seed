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
		<!-- 操作栏 -->
		<view class="operateContainer">
			<view class="lawyer" @click="goPage('LawyerList')">
				<text class="iconfont icon-law"></text>
				律师
			</view>
			<view class="me" @click="goPage('LawInfoMe')" v-if="identity==2">
				<text class="iconfont icon-geren"></text>
				我的
			</view>
			<view class="submit" @click="goPage('LawRelease')" v-if="identity==2">
				<text class="iconfont icon-submit"></text>
				发布
			</view>
		</view>
		<!-- 法律常识 -->
		<view class="lawList">
			<view class="lawBox" v-for="item in lawList" :key="item.id">
				<view class="title">
					{{item.title}}
				</view>
				<view class="content">
					{{item.content}}
				</view>
				<view class="date">
					{{item.createTime }}
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
					navTitle: "法律援助",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 常识列表
				lawList: [],
				// 是否显示按钮
				showBtn: false,
				// 输入
				inputValue: '',
				// 当前页
				current: 1,
				// 身份
				identity: 0
			};
		},
		onShow() {	
			this.checkIdentity()
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			// 检查身份
			checkIdentity() {
				let identity = uni.getStorageSync("identity")
				this.identity = identity
				if (identity == 0) {
					uni.showModal({
						title: "暂无权限",
						content: "请申请入会",
						showCancel: false,
						success() {
							uni.navigateBack()
						}
					})
				} else {
					this.clearBtn()
				}
			},
			// 获取法律常识
			async getLawInfo() {
				let data = {
					current: this.current,
					key: this.inputValue
				}
				let res = await this.$api.getLawInfo(data)
				// console.log(res)
				let nowList = res.data.list
				this.lawList.push.apply(this.lawList, nowList)
			},
			goPage(page) {
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			},
			// 搜索工作
			searchList() {
				this.lawList = []
				this.current = 1
				this.getLawInfo()
			},
			// 清除搜索
			clearBtn() {
				this.inputValue = ""
				this.lawList = []
				this.current = 1
				this.getLawInfo()
			},
			// 加载更多
			loadMore() {
				this.current++
				this.getLawInfo()
			},
		}
	}
</script>

<style lang="scss">
	.lawContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.operateContainer {
			width: 96%;
			margin: 100rpx auto 0;
			background-color: #fff;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 14rpx;
			display: flex;

			.iconfont {
				color: blue;
				font-size: 40rpx;
				margin-right: 6rpx;
				font-weight: bold;
			}

			.lawyer,
			.me,
			.submit {
				margin-right: 18rpx;
				background-color: #eee;
				padding: 10rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
			}
		}

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

		.lawList {
			width: 96%;
			margin: 20rpx auto 0;

			.lawBox {
				background-color: #fff;
				padding: 20rpx;
				margin-bottom: 20rpx;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
				letter-spacing: 1rpx;

				.title {
					font-size: 30rpx;
					font-weight: bold;
					color: #000;
					position: relative;
					margin-left: 20rpx;
				}

				.title:before {
					content: "";
					position: absolute;
					width: 8rpx;
					height: 36rpx;
					background-color: lightblue;
					top: 3rpx;
					left: -20rpx;
					border-radius: 5rpx;
				}

				.content {
					margin-top: 20rpx;
					color: #141414;
					font-size: 28rpx;
					word-break: break-all;
					line-height: 48rpx;
				}

				.date {
					color: #333;
					font-size: 26rpx;
					padding-top: 16rpx;
					margin-top: 16rpx;
					border-top: 1rpx #ccc solid;
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
