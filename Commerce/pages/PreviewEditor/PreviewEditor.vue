<template>
	<view class="richContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<view class="container">
			<rich-text :nodes="richText"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "预览",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 富文本内容
				richText: '',
			}
		},
		onLoad(options) {
			this.richText = decodeURIComponent(options.rich);
			// console.log(this.richText)
		},
		methods: {}
	}
</script>

<style lang="scss">
	.richContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.container {
			width: 94%;
			margin: 30rpx auto 0;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			min-height: 400rpx;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
		}

	}
</style>
