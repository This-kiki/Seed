<template>
	<view>
		<topBar :nav="setNav"></topBar>
		<view class="container">
			<view class="line">
				<view class="title">
					当前版本
				</view>
				<view class="content">
					22.3.2
				</view>
			</view>
			<view class="line" @click="go('/pages/ServiceAgreement/ServiceAgreement')">
				<view class="title">
					用户服务协议
				</view>
				<view class="content">
					<view class="iconfont icon-xiangyou-copy">
					</view>
				</view>
			</view>
			<view class="line" @click="go('/pages/PrivacyPolicy/PrivacyPolicy')">
				<view class="title">
					隐私政策
				</view>
				<view class="content">
					<view class="iconfont icon-xiangyou-copy">
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
					titleColor: "#fff",
					navTitle: "关于我们",
					bgColor: "#36c1ba",
					isShowBackBtn: true,
					backBtnColor: "#fff"
				},
			};
		},
		methods: {
			go(path) {
				uni.navigateTo({
					url: path
				});
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx 4%;

		.line {
			margin: 10px 0;
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32rpx;

			.content {
				color: #999;
			}
		}
	}
</style>
