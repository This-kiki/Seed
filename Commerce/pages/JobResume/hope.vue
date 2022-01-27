<template>
	<view class="infoContainer">
		<view class="title">
			编辑求职期望
		</view>
		<view class="list">
			<view class="common">
				<text class="name">求职状态</text>
				<picker @change="statePicker" range-key="name" :range="stateList">
					<view class="text">{{info.state==0?"已经离职":"在职"}}</view>
				</picker>
			</view>
			<view class="common">
				<text class="name">工作城市</text>
				<picker class="picker" mode="region" v-model="info.city" @change="cityPicker">
					<view class="picker">{{ info.city }}</view>
				</picker>
			</view>
			<view class="common" @click="goPage('hopeJobList')">
				<text class="name">期望职位</text>
				<input type="text" v-model="info.position" placeholder="请填写期望职位" disabled />
			</view>
			<view class="common" @click="goPage('industryList')">
				<text class="name">期望行业</text>
				<input type="text" v-model="info.industry" placeholder="请填写期望行业" disabled />
			</view>
			<view class="common">
				<text class="name">期望薪资</text>
				<picker class="picker" @change="selectReward" :value="index" :range="rewardList" mode='multiSelector'>
					<view class="picker">{{info.pay?info.pay:"请选择期望薪资"}}</view>
				</picker>
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
				info: {
					state: 0,
					city: "",
					position: "",
					industry: "",
					pay: ""
				},
				// 状态列表
				stateList: [{
						name: "已经离职",
						id: 0
					},
					{
						name: "在职",
						id: 1
					},
				],
				rewardList: [
					['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k', '10k', '11k', '12k', '13k', '14k', '15k',
						'16k', '17k', '18k', '19k', '20k', '其他'
					],
					['2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k', '10k', '11k', '12k', '13k', '14k', '15k', '16k',
						'17k', '18k', '19k', '20k', '21k', '其他'
					],
					['12薪', '13薪', '14薪', '15薪', '16薪', '17薪', '18薪', '其他']
				],
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
					this.info.position = uni.getStorageSync('hopeJob')
				}
				if (uni.getStorageSync('hopeIndustry')) {
					this.info.industry = uni.getStorageSync('hopeIndustry')
				}
				if (uni.getStorageSync('state')) {
					this.info.state = parseInt(uni.getStorageSync('state'))
				}
				if (uni.getStorageSync('city')) {
					this.info.city = uni.getStorageSync('city')
				}
				if (!this.info.city) {
					this.info.city = "北京市-北京市-东城区"
				}
				await this.$api.addResume(this.info)
			},
			selectReward(e) {
				this.info.pay =
					`${this.rewardList[0][e.detail.value[0]]}-${this.rewardList[1][e.detail.value[1]]} ${this.rewardList[2][e.detail.value[2]]}`
			},
			statePicker(e) {
				this.info.state = parseInt(e.detail.value)
				uni.setStorageSync('state', this.info.state.toString())
			},
			cityPicker(e) {
				console.log(e.detail.value)
				this.info.city = e.detail.value.join("-")
				uni.setStorageSync('city', this.info.city)
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
					uni.removeStorageSync('state')
					uni.removeStorageSync('city')
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
