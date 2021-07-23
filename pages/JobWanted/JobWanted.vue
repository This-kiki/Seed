<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<!-- 搜索框 -->
		<view class="inputLine">
			<input class="input" type="text" :value="inputValue" placeholder="搜索" />
		</view>
		<!-- 职场列表 -->
		<view class="jobList">
			<view class="jobBox" v-for="index in 10" :key="index">
				<view class="left">
					<view class="title">
						智能二维码市场推广
					</view>
					<view class="address">
						武汉 | 销售代表
					</view>
					<view class="company">
						武汉领航科技有限公司
					</view>
					<view class="money">
						15000-30000
						<text>元</text>
					</view>
				</view>
				<view class="right">
					<view class="btn">
						投递
					</view>
					<view class="date">
						07-20
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import topBar from "../../components/topBar.vue"
	export default {
		components: {
			topBar,
		},
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "求职",
					bgColor: "white"
				},
				// 输入框内容
				inputValue: ""
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.jobContainer {
		padding-bottom: 50rpx;

		.inputLine {
			position: fixed;
			width: 100%;
			background-color: #fff;
			padding-bottom: 20rpx;
			border-bottom: 4rpx solid #f1f1f1;

			.input {
				width: 94%;
				height: 60rpx;
				margin: 0 auto;
				background-color: #f1f1f1;
				text-align: center;
				border-radius: 14rpx;
				letter-spacing: 1rpx;
			}
		}

		.jobList {
			margin: 100rpx auto 0;
			width: 94%;

			.jobBox {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 4rpx solid #f1f1f1;

				.left {
					letter-spacing: 1rpx;

					.title {
						font-size: 28rpx;
						font-weight: bold;
					}

					.address {
						color: #999;
						font-size: 22rpx;
						margin-top: 10rpx;
					}

					.company {
						margin-top: 4rpx;
						color: #999;
						font-size: 22rpx;
					}

					.money {
						font-size: 34rpx;
						color: orange;
						margin-top: 6rpx;

						text {
							font-size: 22rpx;
							margin-left: 6rpx;
						}
					}
				}
				.right{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					text-align: center;
					.btn{
						color: orange;
						font-size: 24rpx;
						padding: 6rpx 15rpx;
						border: 2rpx solid orange;
						border-radius: 8rpx;
					}
					.date{
						color: #999;
						font-size: 22rpx;
					}
				}
			}
		}
	}
</style>
