<template>
	<view class="detailContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 详情 -->
		<view class="mainContaienr">
			<view class="userCard">
				<view class="avatar" :style="{'background-image':`url(${userInfo.img})`}">
				</view>
				<view class="detail">
					<view class="title">
						<view class="name">
							{{userInfo.name}}
						</view>
						<view class="position">
							{{userInfo.position}}
						</view>
					</view>
					<view class="place">
						<text class="iconfont icon-weizhi"></text>
						{{userInfo.place}}
					</view>
				</view>
			</view>
			<view class="userDetail container">
				<view class="birth common">
					<text class="name">生日</text>
					{{userInfo.birth}}
				</view>
				<view class="work common">
					<text class="name">工作单位</text>
					{{userInfo.work}}
				</view>
				<view class="polity common">
					<text class="name">政治面貌</text>
					{{userInfo.polity}}
				</view>
			</view>
			<view class="education container">
				<view class="school common">
					<text class="name">学校</text>
					{{userInfo.school}}
				</view>
				<view class="major common">
					<text class="name">专业</text>
					{{userInfo.major}}
				</view>
				<view class="grade common" v-if="flag==2">
					<text class="name">年级</text>
					{{userInfo.grade}}
				</view>
			</view>
			<view class="intro container">
				{{userInfo.introduce}}
			</view>
		</view>
		<view class="operate" v-if="identity!=0">
			<view class="chat" @click="copy(userInfo.email)">
				<view class="iconfont icon-youxiang">
				</view>
				<view class="text">
					邮箱
				</view>
			</view>
			<view class="phone" @click="callPhone(userInfo.phone)">
				<view class="iconfont icon-dianhua">
				</view>
				<view class="text">
					电话
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "会员详情",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 会员id
				id: "",
				// 会员详情
				userInfo: {},
				// 是否会员
				flag: 1,
				identity: 0
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
				this.flag = options.flag
			}
			this.checkIdentity()
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
					this.getUserInfo()
				}
			},
			// 获取用户信息
			async getUserInfo() {
				let data = {
					openid: this.id
				}
				let res = await this.$api.getUserDetail(data)
				console.log(res)
				let userInfo = res.data.userDetailInfo
				for (let key in userInfo) {
					if (!userInfo[key])
						userInfo[key] = ""
				}
				this.userInfo = userInfo
			},
			// 打电话
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.userInfo.phone
				})
			},
			// 信息复制到剪切板
			copy(value) {
				if (this.identity == 0) {
					uni.showModal({
						title: "暂无权限",
						content: "请申请入会",
						showCancel: false,
						success() {
							uni.reLaunch({
								url: "/pages/HomePage/HomePage"
							})
						}
					})
				} else {
					uni.showModal({
						content: value,
						confirmText: '复制内容',
						success: res => {
							if (res.confirm) {
								uni.setClipboardData({
									data: value,
									success: () => {
										uni.showToast({
											title: '复制成功'
										})
									}
								});
							} else if (res.cancel) {
								return
							}
						}
					});
				}
			},
		}

	}
</script>

<style lang="scss" scoped>
	.detailContainer {
		min-height: 100vh;
		background-color: #F5f5f5;
		user-select: text;
		-webkit-user-select: text;
		overflow-y: scroll;
		padding-bottom: 120rpx;

		.mainContaienr {
			width: 94%;
			margin: auto;

			.userCard {
				width: 90%;
				margin: 20rpx auto;
				padding: 30rpx 5%;
				background: linear-gradient(to right, #36c1ba 0%, #36c1ba66 100%);
				border-radius: 20rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
				color: #fff;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.avatar {
					width: 120rpx;
					height: 120rpx;
					border-radius: 60rpx;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}

				.detail {
					margin-left: 50rpx;

					.title {
						display: flex;
						align-items: baseline;

						.name {
							font-size: 38rpx;
						}

						.position {
							color: #eee;
							font-size: 24rpx;
							margin-left: 20rpx;
						}
					}

					.place {
						display: flex;
						align-items: center;

						.iconfont {
							font-size: 24rpx;
							margin-right: 10rpx;
						}

						margin-top: 10rpx;
						font-size: 24rpx;
					}
				}
			}

			.container {
				width: 90%;
				margin: 20rpx auto;
				padding: 30rpx 5%;
				background-color: #fff;

				.common {
					margin-bottom: 16rpx;
					display: flex;

					.name {
						width: 160rpx;
						margin-right: 20rpx;
						color: #666;
					}
				}

				.common:last-child {
					margin-bottom: 0;
				}
			}
		}

		.operate {
			background-color: #fff;
			box-sizing: border-box;
			position: fixed;
			bottom: 20rpx;
			left: 2%;
			width: 96%;
			height: 120rpx;
			border-radius: 14rpx;
			padding: 20rpx;
			display: flex;
			justify-content: space-around;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			.chat,
			.phone {
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.iconfont {
					margin-right: 10rpx;
					font-size: 40rpx;
				}

				.text {
					font-size: 34rpx;
				}
			}

			.chat {
				border-right: 1rpx solid #eee;
			}
		}

	}
</style>
