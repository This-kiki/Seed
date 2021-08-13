<template>
	<view class="detailContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 详情 -->
		<view class="mainContainer">
			<view class="img">
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

			.img {
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
			.mainInfo{
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 1rpx #ccc solid;
				.left{
					.name{
						font-size: 32rpx;
						font-weight: bold;
					}
					.address{
						margin-top: 10rpx;
						font-size: 26rpx;
						color: #333;
					}
				}
				.right{
					display: flex;
					.iconfont{
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

		}
	}
</style>
