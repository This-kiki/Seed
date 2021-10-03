<template>
	<view class="jobContainer">
		<view class="left">
			<view class="item" v-for="(item,index) in jobList" :key="index" :class="item.name==job.name?'active':''"
				@click="selectJob(item)">
				{{item.name}}
			</view>
		</view>
		<view class="right">
			<view class="jobBox" v-for="(item,index) in job.subLevel">
				<view class="title">
					{{item.name}}
				</view>
				<view class="inner">
					<view class="innerItem" v-for="(ele,i) in item.subLevel" :key="i" @click="selectItem(ele)">
						{{ele}}
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
				jobList: [],
				job: {}
			};
		},
		created() {
			this.getHopeJobList()
		},
		methods: {
			selectJob(item) {
				this.job = item
			},
			async getHopeJobList() {
				let res = await this.$api.getHopeJobList()
				// console.log(res)
				this.jobList = res.data.job.res
				this.job = this.jobList[0]
			},
			selectItem(ele) {
				uni.setStorageSync('hopeJob', ele)
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
			width: 30%;
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
			width: 70%;
			overflow-y: scroll;

			.jobBox {
				padding: 20rpx 0 30rpx;

				.title {
					font-size: 38rpx;
					font-weight: bold;
				}

				.inner {
					margin-top: 20rpx;
					display: flex;
					flex-wrap: wrap;
					font-size: 24rpx;

					.innerItem {
						width: 45%;
						background-color: #F5f5f5;
						border-radius: 10rpx;
						margin: 0 5% 20rpx 0;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>
