<template>
	<view class="jobContainer">
		<view class="left">
			<view class="item" v-for="(item,index) in jobList" :key="index" :class="item.name==job.name?'active':''"
				@click="selectJob(item)">
				{{item.name}}
			</view>
		</view>
		<view class="right">
			<view class="jobBox" v-for="(item,index) in job.subLevel" @click="selectItem(item.name)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobList: [],
				job: {}
			};
		},
		created() {
			this.getIndustryList()
		},
		methods: {
			selectJob(item) {
				this.job = item
			},
			async getIndustryList() {
				let res = await this.$api.getIndustryList()
				// console.log(res)
				this.jobList = res.data.job.res
				this.job = this.jobList[0]
			},
			selectItem(ele) {
				uni.setStorageSync('hopeIndustry', ele)
				setTimeout(() => {
					uni.navigateBack()
				}, 300)
			}
		}
	}
</script>

<style lang="scss">
	.jobContainer {
		display: flex;
		padding: 30rpx 20rpx 0;
		height: 100vh;
		overflow-y: hidden;

		.left {
			width: 40%;
			overflow-y: scroll;
			font-size: 28rpx;

			.item {
				padding: 20rpx 0;
			}

			.active {
				color: #36c1ba;
			}
		}

		.right {
			width: 60%;
			overflow-y: scroll;
			font-size: 28rpx;

			.jobBox {
				width: 68%;
				background-color: #F5f5f5;
				border-radius: 10rpx;
				margin: 0 2% 20rpx 0;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
			}
		}
	}
</style>
