<template>
	<view class="detailContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 详情 -->
		<view class="mainContaienr">
			<view class="img">
				<image :src="userInfo.img" mode=""></image>
			</view>
			<view class="name">
				{{userInfo.name}}
			</view>
			<view class="position">
				{{userInfo.position}}
			</view>
			<view class="mainInfo">
				<view class="place iconfont icon-weizhi" @click="copy(userInfo.place)">
					{{userInfo.place}}
				</view>
				<view class="right">
					<view class="chat iconfont icon-chat" @click="chat()">
					</view>
					<view class="phone iconfont icon-dianhua" @click="callPhone()">
					</view>
					<view class="email iconfont icon-youxiang" @click="copy(userInfo.email)">
					</view>
				</view>
			</view>
			<view class="common">
				<text>生日</text>
				{{userInfo.birth}}
			</view>
			<view class="common">
				<text>政治面貌</text>
				{{userInfo.polity}}
			</view>
			<view class="common">
				<text>学校</text>
				{{userInfo.school}}
			</view>
			<view class="common">
				<text>专业</text>
				{{userInfo.major}}
			</view>
			<view class="common">
				<text>工作单位</text>
				{{userInfo.work}}
			</view>
			<view class="common">
				<text>自我介绍</text>
				<view class="intro">
					{{userInfo.introduce}}
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
				userInfo: {}
			};
		},
		onLoad(options) {
			this.id = options.id
			this.checkIdentity()
		},
		methods: {
			// 检查身份
			checkIdentity() {
				let identity = uni.getStorageSync("identity")
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
				this.userInfo = res.data.userDetailInfo
			},
			// 打电话
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.userInfo.phone
				})
			},
			// 信息复制到剪切板
			copy(value) {
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
			},
			// 聊天
			chat(item) {
				let link = encodeURIComponent(JSON.stringify(this.userInfo.img))
				uni.navigateTo({
					url: `/pages/Chat/Chat?openid=${this.id}&name=${this.userInfo.name}&img=${link}`
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.detailContainer {
		margin-bottom: 50rpx;

		.mainContaienr {
			width: 94%;
			margin: 20rpx auto 0;

			.img {
				margin: 20rpx auto 0;
				width: 200rpx;
				height: 250rpx;
				background-color: lightblue;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				image {
					width: 100%;
					height: 100%;
					border-radius: 14rpx;
				}
			}

			.name {
				text-align: center;
				font-size: 32rpx;
				font-weight: bold;
				margin-top: 10rpx;
			}

			.position {
				text-align: center;
				margin-top: 10rpx;
				color: #333;
				font-size: 26rpx;
				padding-bottom: 20rpx;
				border-bottom: 1rpx #ccc solid;
			}

			.mainInfo {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;

				.right {
					display: flex;

					.iconfont {
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 50rpx;
						margin-right: 10rpx;
						padding: 10rpx;
						border-radius: 30rpx;
						text-align: center;
						background-color: #eee;
					}
				}
			}

			.common {
				margin-top: 10rpx;

				text {
					font-size: 26rpx;
					color: #333;
					margin-right: 20rpx;
				}

				.intro {
					font-size: 28rpx;
					margin-top: 10rpx;
					text-indent: 2em;
					letter-spacing: 1rpx;
				}
			}
		}
	}
</style>
