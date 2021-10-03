<template>
	<view class="infoContainer">
		<view class="title">
			职位描述
		</view>
		<view class="input">
			<textarea v-model="info.need" placeholder="请填写职位描述(150字以内)" maxlength="150" />
		</view>
		<view class="btn" @click="add()">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		created() {
			this.info = uni.getStorageSync('jobRelease')
		},
		methods: {
			add() {
				uni.setStorageSync('jobRelease', this.info)
				uni.showToast({
					icon: "none",
					title: "保存成功"
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 300)
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

		.input {
			margin-top: 20rpx;

			textarea {
				width: 100%;
				height: 300rpx;
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
