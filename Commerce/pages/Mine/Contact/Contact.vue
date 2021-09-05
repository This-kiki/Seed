<template>
	<view class="">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<view class="contactContainer infoContainer">
			<!-- <view class="titleLine">
			<view class="title">
				联系我们
			</view>
		</view> -->
			<view class="main">
				<view class="address" @click="goMap()">
					<view class="title">
						商会地址
					</view>
					<view class="info">
						<view class="text">
							{{address}}
						</view>
						<view class="iconfont icon-weizhi"></view>
					</view>
				</view>
				<view class="phone">
					<view class="title">
						联系电话
					</view>
					<view class="info" v-for="(item,index) in phoneList" :key="index">
						<view class="text">
							{{item.phone}} {{item.name}}
						</view>
						<view class="iconfont icon-dianhua" @click="callPhone(item.phone)"></view>
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
					navTitle: "联系我们",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 地址
				address: "",
				// 电话
				phoneList: [],
			}
		},
		created() {
			this.getIntro()
		},
		methods: {
			// 获取种子会介绍
			async getIntro() {
				let res = await this.$api.getIntroduction()
				// console.log(res)
				let data = res.data.intro
				this.address = data.address
				this.phoneList = data.contact
			},
			// 跳转地图
			goMap(){
				uni.navigateTo({
					url: "/pages/Map/Map"
				})
			},
			// 打电话
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contactContainer {
		margin-top: 0;

		.main {
			margin-top: 20rpx;

			.address,
			.phone {
				margin: 0rpx auto 40rpx;
				background-color: #fefefe;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
				padding: 30rpx 20rpx;
				border-radius: 10rpx;

				.title {
					color: #999;
					font-size: 24rpx;
				}

				.info {
					margin-top: 10rpx;
					display: flex;
					justify-content: space-between;

					.text {
						font-size: 28rpx;
						font-weight: bold;
						letter-spacing: 1rpx;
					}

					.iconfont {
						font-size: 40rpx;
						color: #add8e6;
						padding-left: 30rpx;
						border-left: 4rpx solid #eee;
					}
				}
			}

			.phone {
				.info {
					margin-top: 40rpx;
				}
			}
		}
	}

	.infoContainer {
		width: 92%;
		margin: 20rpx auto 0;
		position: relative;

		.titleLine {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				font-size: 28rpx;
				font-weight: bold;
				letter-spacing: 1rpx;
				margin-left: 20rpx;
				position: relative;
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

			.more {
				font-size: 24rpx;
				color: #ccc;
			}
		}

		.intro {
			margin-top: 20rpx;
			padding: 40rpx 30rpx 80rpx;
			background-color: #fefefe;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			font-size: 28rpx;
			letter-spacing: 1rpx;
			line-height: 46rpx;
			border-radius: 10rpx;
			text-indent: 2em;
			overflow-y: hidden;
		}

		.showMore {
			font-size: 24rpx;
			color: #999;
			position: absolute;
			bottom: 50rpx;
			right: 0;
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background-color: #fff;
			border-radius: 10rpx;
		}
	}
</style>
