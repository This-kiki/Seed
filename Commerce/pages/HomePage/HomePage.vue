<template>
	<view class="homeContainer">
		<topBar :nav="setNav"></topBar>
		<!-- 顶部操作 -->
		<view class="topLine">
			<view class="common" v-for="item in tapList" :key="item.id" @click="setActive(item.id)"
				:class="item.id==active?'active':''">
				{{item.name}}
			</view>
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
			<swiper class="swiper" :current="active" @change="changeSwiper" :style="{'height':swiperHeight-40+'px'}">
				<swiper-item class="swiperItem">
					<HomeInfo :height='swiperHeight-40' />
				</swiper-item>
				<swiper-item class="swiperItem">
					<SeedInfo :height='swiperHeight-40' />
				</swiper-item>
			</swiper>
		</view>
		<!-- 发布按钮 -->
		<view class="addBtn" @click="openSubmit()" v-if="active!=1">
			<view class="iconfont icon-tianjiadingdan1">
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
	export default {
		components: {
			HomeInfo,
			SeedInfo
		},
		data() {
			return {
				setNav: {
					titleColor: "#fff",
					navTitle: "濠江区珠浦种子会",
					bgColor: "#36c1ba",
					titleAlign: "center",
					isShowBackBtn: false
				},
				// tap
				tapList: [{
						id: 0,
						name: "资讯推荐"
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
				// 轮播图高度
				swiperHeight: 0,

				// Socket连接状态
				IsOpen: false,
				// SocketTask监听状态
				SocketTask: {},
				// 是否上线
				IsOnline: false,
				// 心跳
				heartTimer: "",
				// 自己的id
				openid: "",
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
			this.openid = uni.getStorageSync('openid')
			this.getLeaveNotice()
			this.openSocket()
		},
		onShow() {
			setTimeout(() => {
				uni.showTabBar()
			}, 400)
		},
		beforeDestroy() {
			// 关闭
			this.SocketTask.close()
			// 清除心跳
			clearInterval(this.heartTimer)
		},
		methods: {
			// 获取离线消息
			async getLeaveNotice() {
				let res = await this.$api.getLeaveNotice()
				// console.log(res)
				let list = res.data.msg.reverse()
				list.forEach(item => {
					let newMsg = {
						cate: item.cate,
						time: item.createTime,
						name: item.userName,
						img: item.userImg,
						id: item.otherId,
						title: item.title,
						content: item.content ? item.content : ''
					}
					this.loadNotice(newMsg)
				})
				if (res.code == 20000 && list.length) {
					let del = await this.$api.clearLeaveNotice()
					// console.log(del)
				}
			},
			// 用户上线  接受消息
			openSocket() {
				// 防止重复连接
				if (this.IsOpen) return
				// 连接
				this.SocketTask = uni.connectSocket({
					url: `wss://hjzpzzh.com/seed/websocket/${this.openid}`,
					complete: () => {}
				});
				if (!this.SocketTask) return;
				// 监听开启
				this.SocketTask.onOpen(() => {
					// 将连接状态设为已连接
					console.log('将连接状态设为已连接');
					this.IsOpen = true
				})
				// 心跳
				let that = this
				this.heartTimer = setInterval(() => {
					that.SocketTask.send({
						data: "heart"
					})
				}, 5000)
				// 监听关闭
				this.SocketTask.onClose(() => {
					console.log('连接已关闭');
					this.IsOpen = false;
					this.SocketTask = false;
					this.IsOnline = false
					clearInterval(this.heartTimer)
					// 清空会话列表
					// 更新未读数提示
				})
				// 监听错误
				this.SocketTask.onError(() => {
					console.log('连接错误');
					this.IsOpen = false;
					this.SocketTask = false;
					this.IsOnline = false
					clearInterval(this.heartTimer)
					uni.showToast({
						title: '网络错误，您已掉线，请重新打开小程序。'
					})
				})
				// 监听接收信息
				this.SocketTask.onMessage(async (e) => {
					console.log('接收消息', e);
					let arr = e.data.split('**msg**')
					let newMsg = {
						cate: parseInt(arr[0]),
						time: arr[2],
						name: arr[3],
						img: arr[4],
						id: arr[5],
						title: arr[6],
						content: arr.length == 9 ? arr[7] : '',
					}
					this.loadNotice(newMsg)
				})
			},
			// 消息加载到本地并提醒
			loadNotice(newMsg) {
				let msgList = []
				if (uni.getStorageSync('msgList')) {
					msgList = uni.getStorageSync('msgList')
				}
				msgList.push(newMsg)
				uni.setStorageSync('msgList', msgList)
				this.$store.dispatch('setNewMsg', true)
				// tabber 我的 显示红点
				uni.showTabBarRedDot({
					index: 4
				})
				uni.showToast({
					icon: "none",
					title: '您有新的消息'
				})
			},
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
				} else {
					if (!this.flag) {
						uni.showModal({
							title: "提示",
							content: "请先申请入会",
							success: (res) => {
								if (res.confirm) {
									this.goPage('joinPage')
								} else {
									return
								}
							}
						})
						return
					}
					uni.navigateTo({
						url: `/pages/${page}/${page}`
					})
				}
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
		user-select: text;
		-webkit-user-select: text;

		.topLine {
			font-size: 26rpx;
			display: flex;
			align-items: center;
			width: 100%;
			justify-content: space-around;
			background-color: #f5f5f5;
			height: 40px;
			line-height: 40px;

			.common {
				text-align: center;
				color: #36c1baee;
				font-size: 26rpx;
				transition: 0.2s ease-in-out;
				width: 40%;
				height: 36px;
				line-height: 40px;
			}

			.active {
				font-weight: bold;
				color: #36c1ba;
				font-size: 32rpx;
				transition: 0.2s ease-in-out;
				border-bottom: 4rpx solid #36c1ba;
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
				font-size: 40rpx;
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
