<template>
	<view class="infoContainer">
		<view class="title">
			社交主页
		</view>
		<view class="list">
			<view class="common">
				<input type="text" v-model="info.socicalIndex" placeholder="请填写社交主页" />
			</view>
		</view>
		<view class="btn" @click="addResume()">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
			};
		},
		created() {
			this.getResume()
		},
		methods: {
			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				this.info = res.data.resume
			},
			// 添加简历
			async addResume() {
				let res = await this.$api.addResume(this.info)
				console.log(res)
				if (res.code == 20000) {
					uni.showToast({
						icon: "none",
						title: "保存成功"
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 300)
				} else {
					uni.showToast({
						icon: "none",
						title: "保存失败"
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.infoContainer {
		padding: 30rpx 5%;
		background-color: #fff;

		.title {
			font-size: 38rpx;
			font-weight: bold;
		}

		.list {
			margin-top: 30rpx;

			.common {
				padding: 20rpx 0;
				border-bottom: 1rpx #eee solid;

				.name {
					font-size: 28rpx;
					color: #666;
					margin-bottom: 10rpx;
				}

				input,
				picker {
					width: 100%;
					height: 40rpx;
				}
			}
		}

		.btn {
			width: 100%;
			margin: 30rpx auto 0;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background-color: #36c1ba;
			color: #fff;
			border-radius: 10rpx;
			letter-spacing: 1rpx;
		}
	}
</style>
