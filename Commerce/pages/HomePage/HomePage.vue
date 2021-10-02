<template>
	<view class="homeContainer">
		<!-- 顶部操作 -->
		<view class="topLine" :style="{'height':titleBarHeight+'px','padding-top':statusBarHeight+'px'}">
			<view class="select">
				<view class="title">
					濠江区珠浦种子会
				</view>
				<view class="common" v-for="item in tapList" :key="item.id" @click="setActive(item.id)"
					:class="item.id==active?'active':''">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 去除留白 -->
		<view class="helpWhite" :style="{'height':titleBarHeight+'px','padding-top':statusBarHeight+'px'}">
		</view>
		<!-- 申请入会 -->
		<view class="submitSeed" v-if="flag==0">
			<view class="left">
				<view class="title">
					申请入会
				</view>
				<view class="light">
					查看会员信息，资源交互
				</view>
			</view>
			<view class="right">
				<view class="btn" @click="goPage('joinPage')">
					立即申请
				</view>
			</view>
		</view>
		<!-- swiper -->
		<view class="swiperContainer">
			<swiper class="swiper" :current="active" @change="changeSwiper" :style="{'height':swiperHeight+'px'}">
				<swiper-item class="swiperItem">
					<HomeInfo :height='swiperHeight' />
				</swiper-item>
				<swiper-item class="swiperItem">
					<SeedInfo :height='swiperHeight' />
				</swiper-item>
			</swiper>
		</view>
		<!-- 发布按钮 -->
		<view class="addBtn" @click="openSubmit()" v-if="active!=1">
			<view class="iconfont icon-tianjia">
			</view>
		</view>
		<!-- 发布 -->
		<uni-popup ref="popup" type="bottom" :mask-click="false">
			<view class="submitContainer">
				<view class="join" v-if="flag==0" @click="goPage('joinPage')&closeSubmit()">
					立即入会 <text class="iconfont icon-xiangyou-copy"></text>
				</view>
				<view class="submitList">
					<view class="common info" @click="goPage('InfoSubmit')&closeSubmit()">
						<image src="../../static/icon/1.png" mode=""></image>
						<text>资讯</text>
					</view>
					<view class="common law" @click="goPage('LawRelease')&closeSubmit()" v-if="flag==2||flag==0">
						<image src="../../static/icon/2.png" mode=""></image>
						<text>法律</text>
					</view>
				</view>
				<view class="close" @click="closeSubmit()">
					<view class="iconfont icon-quxiao">
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import HomeInfo from "../HomeInfo/HomeInfo"
	import SeedInfo from "../SeedInfo/SeedInfo"
	import LawInfo from "../LawInfo/LawInfo"
	export default {
		components: {
			HomeInfo,
			SeedInfo,
			LawInfo
		},
		data() {
			return {
				// tap
				tapList: [{
						id: 0,
						name: "推荐"
					},
					{
						id: 1,
						name: "种子会"
					}
				],
				// 当前选择
				active: 0,
				// 是否会员
				flag: 0,
				// 状态栏高度
				titleBarHeight: 0,
				// 状态栏距离顶部高度
				statusBarHeight: 0,
				// 屏幕高度
				screenHeight: 0,
				swiperHeight: 0
			}
		},
		created() {
			this.checkUser()
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					// console.log(res)
					if (res.model.indexOf('iPhone') !== -1) {
						that.titleBarHeight = 44 + 44;
					} else {
						that.titleBarHeight = 48 + 48;
					}
					that.statusBarHeight = res.statusBarHeight
					that.screenHeight = res.windowHeight
				},
			})
		},
		onShow() {
			setTimeout(() => {
				uni.showTabBar()
			}, 400)
		},
		methods: {
			// 判断是否为会员
			async checkUser() {
				let res = await this.$api.getUserMsg()
				this.flag = res.data.userBaseInfo.identity
				console.log("身份", this.flag)
				if (this.flag == 0) {
					this.swiperHeight = this.screenHeight - this.titleBarHeight - 90
				} else {
					this.swiperHeight = this.screenHeight - this.titleBarHeight
				}
				let swiperHeight = this.screenHeight - this.titleBarHeight
				let data = {
					titleBarHeight: this.titleBarHeight,
					statusBarHeight: this.statusBarHeight,
					screenHeight: this.screenHeight,
					swiperHeight
				}
				uni.setStorageSync("height", data)
			},
			// 选择
			setActive(id) {
				this.active = id
			},
			// 当swiper滑动时
			changeSwiper(e) {
				let detail = e.detail
				this.active = detail.current
			},
			// 查看更多
			seeMore(flag) {
				if (flag == 'ManagerList')
					uni.navigateTo({
						url: `/pages/UserList/UserList?flag=1`
					})
				else
					uni.navigateTo({
						url: `/pages/${flag}/${flag}?flag=2`
					})
			},
			// 跳转页面
			goPage(page) {
				if (page == 'joinPage') {
					uni.navigateTo({
						url: `/pages/Mine/${page}/${page}`
					})
				}
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			},
			// 弹出发布框
			openSubmit() {
				uni.hideTabBar()
				this.$refs.popup.open('bottom')
			},
			// 关闭发布框
			closeSubmit() {
				this.$refs.popup.close('bottom')
				setTimeout(() => {
					uni.showTabBar()
				}, 400)
			},
		}
	}
</script>
<style lang="scss">
	.homeContainer {
		height: 100vh;
		background-color: #ffffff;
		position: relative;
		overflow-y: hidden;

		.topLine {
			position: fixed;
			box-sizing: border-box;
			background-color: #36c1ba;
			display: flex;
			justify-content: space-between;
			width: 100%;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			.title {
				font-size: 32rpx;
				font-weight: bold;
				color: #fff;
				margin-right: 30rpx;
			}

			.select {
				font-size: 26rpx;
				padding: 20rpx;
				// width: 60%;
				display: flex;
				align-items: center;
				// justify-content: space-around;
				background-color: #36c1ba;

				.common {
					margin-right: 40rpx;
					text-align: center;
					color: #eee;
					font-size: 26rpx;
					transition: 0.2s ease-in-out;
				}

				.active {
					font-weight: bold;
					color: #fff;
					position: relative;
					font-size: 32rpx;
					transition: 0.2s ease-in-out;
				}
			}
		}

		.submitSeed {
			box-sizing: border-box;
			width: 94%;
			height: 70px;
			margin: 10px 3%;
			border-radius: 14rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			background: url(../../static/img/5.jpeg)center center;
			background-size: 100% auto;

			.left {
				background-color: #ffffffaa;
				padding: 30rpx 110rpx 30rpx 70rpx;

				.title {
					font-weight: bold;
					font-size: 28rpx;
				}

				.light {
					font-size: 24rpx;
					margin-top: 10rpx;
				}
			}

			.right {
				display: flex;
				justify-content: center;
				align-items: center;

				.btn {
					font-size: 28rpx;
					padding: 10rpx 20rpx;
					background-color: #36c1ba;
					color: #fff;
					border-radius: 14rpx;
					letter-spacing: 1rpx;
				}
			}
		}

		.swiperContainer {
			.swiper {
				// height: 80vh;

				.swiperItem {
					// overflow-y: scroll;
				}
			}
		}

		.addBtn {
			position: fixed;
			bottom: 60rpx;
			right: 40rpx;
			height: 100rpx;
			width: 100rpx;
			background-color: #36c1ba;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			.iconfont {
				color: #ffff;
				font-size: 60rpx;
				font-weight: bold;
			}
		}

		.submitContainer {
			background-color: #fff;
			width: 100%;
			margin: 0 auto;
			border-radius: 10rpx;
			padding: 60rpx 30rpx 30rpx;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			border-top-left-radius: 40rpx;
			border-top-right-radius: 40rpx;

			.join {
				font-size: 28rpx;
				color: #36c1ba;

				.iconfont {
					font-size: 24rpx;
					margin-left: 10rpx;
				}
			}

			.submitList {
				display: flex;
				padding: 60rpx 0 40rpx;
				border-bottom: 10rpx solid #f8f8f8;

				.common {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 60rpx;

					image {
						width: 80rpx;
						height: 80rpx;
					}

					text {
						font-size: 26rpx;
						letter-spacing: 1rpx;
						margin-top: 12rpx;
					}
				}
			}

			.close {
				padding: 40rpx 0;
				text-align: center;
				color: #999;

				.iconfont {
					font-size: 60rpx;
				}
			}
		}
	}
</style>
