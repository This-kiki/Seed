<template>
	<view class="detailContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 详情 -->
		<view class="mainContainer">
			<view class="companyImg">
				<image :src="companyInfo.img" mode=""></image>
			</view>
			<view class="mainInfo">
				<view class="left">
					<view class="name">
						{{companyInfo.companyName}}
					</view>
					<view class="address iconfont icon-weizhi" @click="copy(companyInfo.address)">
						{{companyInfo.address}}
					</view>
				</view>
				<view class="right">
					<view class="phone iconfont icon-dianhua" @click="callPhone()">
					</view>
					<view class="email iconfont icon-youxiang" @click="copy(companyInfo.email)">
					</view>
				</view>
			</view>
			<view class="detail">
				<view class="common">
					<text>行业</text>
					{{companyInfo.industry}}
				</view>
				<view class="common">
					<text>经营范围</text>
					{{companyInfo.manageArea}}
				</view>
				<view class="common">
					<text>经营状态</text>
					{{companyInfo.manageStatus}}
				</view>
				<view class="common">
					<text>注册资金</text>
					{{companyInfo.money}}
				</view>
				<view class="common">
					<text>企业人数</text>
					{{companyInfo.num}}
				</view>
				<view class="common">
					<text>法人代表</text>
					{{companyInfo.representative}}
				</view>
				<view class="common license">
					<text>营业执照照片</text>
					<view class="img">
						<image :src="companyInfo.img" mode=""></image>
					</view>
				</view>
				<view class="common">
					<text>公司介绍</text>
					<view class="intro">
						{{companyInfo.content}}
					</view>
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
					navTitle: "会员单位详情",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 会员单位id
				id: "test",
				// 会员单位详情
				companyInfo: {
					companyName: "武汉市洪山区阿里巴巴集团",
					address: "武汉市洪山区和平大道77号",
					phone: "11011001100",
					email: "110@aa.com"
				}
			};
		},
		onLoad(options) {
			this.id = options.id
			this.seeDetail()
		},
		methods: {
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

		}
	}
</script>

<style lang="scss" scoped>
	.detailContainer {
		margin-bottom: 50rpx;

		.mainContainer {
			width: 92%;
			margin: 20rpx auto 0;

			.companyImg {
				width: 100%;
				height: 400rpx;
				border-radius: 14rpx;
				background-color: lightblue;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				image {
					width: 100%;
					height: 100%;
					border-radius: 14rpx;
				}

			}

			.mainInfo {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 1rpx #ccc solid;

				.left {
					.name {
						font-size: 32rpx;
						font-weight: bold;
					}

					.address {
						margin-top: 10rpx;
						font-size: 26rpx;
						color: #333;
					}
				}

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

			.detail {
				margin-top: 20rpx;

				.common {
					margin-bottom: 10rpx;
					font-size: 28rpx;

					text {
						font-size: 24rpx;
						color: #333;
						margin-right: 20rpx;
					}
					.intro{
						letter-spacing: 1rpx;
						text-indent: 2em;
						line-height: 48rpx;
					}
				}

				.license {
					.img {
						background-color: lightblue;
						margin-top: 10rpx;
						border-radius: 10rpx;

						image {
							width: 100%;
							border-radius: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
