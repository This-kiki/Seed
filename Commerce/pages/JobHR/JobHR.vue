<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 操作栏 -->
		<view class="operateContainer">
			<view class="submit" @click="goPage('JobRelease')">
				<text class="iconfont icon-submit"></text>
				发布招聘
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
					navTitle: "HR管理",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},

			};
		},
		methods: {
			// 跳转页面
			goPage(page) {
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.jobContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.operateContainer {
			width: 96%;
			margin: 20rpx auto 0;
			background-color: #fff;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 14rpx;
			display: flex;

			.iconfont {
				color: blue;
				font-size: 40rpx;
				margin-right: 6rpx;
				font-weight: bold;
			}

			.submit {
				margin-right: 18rpx;
				background-color: #eee;
				padding: 10rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
			}
		}
	}
</style>
