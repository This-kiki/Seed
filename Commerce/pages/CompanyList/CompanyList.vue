<template>
	<view class="CompanyListContainer">
		<!-- 管理层 -->
		<view class="mainContaienr">
			<view class="title">
				会员单位介绍
			</view>
			<view class="imgContainer">
				<view class="imgBox" v-for="item in companyList" :key="item.openId" @click="checkIdentity(item.openId)">
					<view class="img" :style="{'background-image':'url('+item.img+')'}">
					</view>
					<view class="name">
						{{item.companyName}}
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
				// 会员单位列表
				companyList: []
			};
		},
		created() {
			this.getCompanyList()
		},
		methods: {
			// 会员单位列表
			async getCompanyList() {
				let data = {
					current: 1,
					limit: 200
				}
				let res = await this.$api.getCompanyList(data)
				// console.log(res)
				this.companyList = res.data.rows
			},
			// 查看详情
			seeDetail(openId) {
				uni.navigateTo({
					url: `/pages/CompanyListDetail/CompanyListDetail?id=${openId}`
				})
			},
			// 检查身份
			checkIdentity(openId) {
				let identity = uni.getStorageSync("identity")
				this.identity = identity
				if (identity == 0) {
					uni.showModal({
						title: "暂无权限",
						content: "请申请入会",
						showCancel: false
					})
				}else{
					this.seeDetail(openId)
				}
			},
		}
	}
</script>

<style lang="scss">
	.CompanyListContainer {
		padding-bottom: 50rpx;

		.mainContaienr {
			width: 96%;
			margin: 20rpx auto 0;

			.title {
				font-size: 32rpx;
				font-weight: bold;
				position: relative;
				margin-left: 20rpx;
			}

			.title:before {
				content: "";
				position: absolute;
				width: 8rpx;
				height: 36rpx;
				background-color: #36c1ba;
				top: 5rpx;
				left: -20rpx;
				border-radius: 5rpx;
			}

			.imgContainer {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.imgBox {
					width: 46%;

					.img {
						width: 100%;
						height: 230rpx;
						background-color: #36c1ba;
						border-radius: 14rpx;
						box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
						background-position: center;
						background-repeat: no-repeat;
						background-size: cover;
					}

					.name {
						text-align: center;
						font-size: 28rpx;
						margin: 15rpx 0 20rpx;
						letter-spacing: 1rpx;
					}
				}
			}
		}
	}
</style>
