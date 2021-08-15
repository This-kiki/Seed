<template>
	<view class="lawContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体 -->
		<view class="mainContainer">
			<view class="title">
				<text>标题</text>
				<input type="text" v-model="title" />
			</view>
			<view class="content">
				<text>内容</text>
				<textarea type="text" v-model="content" />
			</view>
			<view class="release" @click="release()">
				<text class="iconfont icon-submit"></text>
				发布
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
					navTitle: "发布法律常识",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 修改的id
				id: '',
				title: "",
				content: ""
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
				this.title = options.title
				this.content = options.content
				this.setNav.navTitle = "修改法律常识"
			}
		},
		methods: {
			async release() {
				let data = {
					id: this.id,
					title: this.title,
					content: this.content
				}
				let res = await this.$api.releaseLaw(data)
				if (res.code == 20000) {
					uni.showToast({
						title: '发布成功'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 200)
				}
			}
		}
	}
</script>

<style lang="scss">
	.lawContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.mainContainer {
			width: 94%;
			margin: 20rpx auto 0;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #fff;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			border-radius: 14rpx;

			.title {
				input {
					background-color: #f1f1f1;
					margin-top: 20rpx;
					border-radius: 10rpx;
					padding: 20rpx;
					letter-spacing: 1rpx;
				}
			}

			.content {
				margin-top: 30rpx;

				textarea {
					background-color: #f1f1f1;
					margin-top: 20rpx;
					border-radius: 10rpx;
					padding: 20rpx;
					letter-spacing: 1rpx;
				}
			}

			.release {
				width: 120rpx;
				margin: 30rpx 40rpx 0 0;
				padding: 10rpx;
				background-color: #eee;
				border-radius: 10rpx;

				.iconfont {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
