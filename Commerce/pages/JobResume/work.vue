<template>
	<view class="infoContainer">
		<view class="title">
			编辑工作经历
		</view>
		<view class="list">
			<view class="common">
				<text class="name">公司名称</text>
				<input type="text" v-model="info.companyName" placeholder="请填写公司名称" />
			</view>
			<view class="common" @click="goPage('industryList')">
				<text class="name">所在行业</text>
				<input type="text" v-model="info.jobIndustry" placeholder="请填写所在行业" disabled />
			</view>
			<view class="common">
				<text class="name">在职时间</text>
				<input type="text" v-model="info.jobTime" placeholder="请填写在职时间" />
			</view>
			<view class="common" @click="goPage('hopeJobList')">
				<text class="name">职位名称</text>
				<input type="text" v-model="info.industyName" placeholder="请填写职位名称" disabled />
			</view>
			<view class="common">
				<text class="name">工作内容</text>
				<textarea v-model="info.jobContent" placeholder="请填写工作内容" />
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
		onShow() {
			this.getResume()
		},
		methods: {
			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				this.info = res.data.resume
				if (uni.getStorageSync('hopeJob')) {
					this.info.industyName = uni.getStorageSync('hopeJob')
				}
				if (uni.getStorageSync('hopeIndustry')) {
					this.info.jobIndustry = uni.getStorageSync('hopeIndustry')
				}
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
					uni.removeStorageSync('hopeJob')
					uni.removeStorageSync('hopeIndustry')
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
			// 跳转页面
			goPage(page) {
				uni.navigateTo({
					url: `/pages/JobResume/${page}`
				})
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
