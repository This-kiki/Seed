<template>
	<view class="detailContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 详情 -->
		<view class="mainContaienr">
			<view class="userCard">
				<view class="avatar" :style="{'background-image':`url(${companyInfo.img})`}">
				</view>
				<view class="detail">
					<view class="title">
						<view class="name">
							{{companyInfo.companyName}}
						</view>
					</view>
					<view class="place">
						<text class="iconfont icon-weizhi"></text>
						{{companyInfo.address}}
					</view>
				</view>
			</view>
			<view class="container">
				<view class="common">
					<text class="name">行业</text>
					{{companyInfo.industry}}
				</view>
				<view class="common">
					<text class="name">经营范围</text>
					{{companyInfo.manageArea}}
				</view>
				<view class="common">
					<text class="name">经营状态</text>
					{{companyInfo.manageStatus}}
				</view>
				<view class="common">
					<text class="name">注册资金</text>
					{{companyInfo.money}}
				</view>
				<view class="common">
					<text class="name">企业人数</text>
					{{companyInfo.num}}
				</view>
				<view class="common">
					<text class="name">法人代表</text>
					{{companyInfo.representative}}
				</view>
				<view class="common license">
					<text class="name">营业执照照片</text>
					<view class="img" :style="{'backgroundImage':`url(${companyInfo.license})`}">
					</view>
				</view>
			</view>
			<view class="intro container">
				{{companyInfo.content}}
			</view>
		</view>
		<view class="operate" v-if="identity!=0">
			<view class="chat" @click="copy(companyInfo.email)">
				<view class="iconfont icon-youxiang">
				</view>
				<view class="text">
					邮箱
				</view>
			</view>
			<view class="phone" @click="callPhone(companyInfo.phone)">
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
					navTitle: "单位会员详情",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				id: "",
				companyInfo: {},
				identity: 0
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
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
					this.seeDetail()
				}
			},
			// 查看详情
			async seeDetail() {
				let data = {
					openid: this.id
				}
				let res = await this.$api.getCompanyDetail(data)
				// console.log(res)
				this.companyInfo = res.data.companyDetailInfo
			},
			// 打电话
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.companyInfo.phone
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
							font-size: 30rpx;
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
						width: 180rpx;
						margin-right: 20rpx;
						color: #666;
					}
				}

				.license {
					flex-direction: column;

					.img {
						width: 100%;
						margin: 20rpx auto 0;
						height: 350rpx;
						background-position: center;
						background-repeat: no-repeat;
						background-size: cover;
						border-radius: 10rpx;
						border: 1rpx #eee solid;
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
