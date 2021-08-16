<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体 -->
		<view class="mainContainer">
			<view class="jobBox" v-for="item in jobList" :key="item.id">
				<view class="job">
					{{item.job}}
				</view>
				<view class="require">
					{{item.brief}}
				</view>
				<view class="company">
					{{item.companyName}}
				</view>
				<view class="place">
					{{item.place}}
				</view>
				<view class="money">
					{{item.reward}}
				</view>
				<view class="date">
					{{item.createTime}}
				</view>
				<view class="operate">
					<view class="delete" @click="cancelResume(item.id)">
						删除
					</view>
					<view class="detail" @click="seeDetail(item.id)">
						查看详情
					</view>
				</view>
			</view>
		</view>
		<view class="noData" v-if="jobList.length == 0">
			暂无求职
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "我的求职",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 招聘列表
				jobList: []
			};
		},
		created() {
			this.getGoJobList()
		},
		methods: {
			// 获取简历列表
			async getGoJobList() {
				let res = await this.$api.getGoJobList()
				console.log(res)
				this.jobList = res.data.com
			},
			// 取消投递简历
			async cancelResume(id) {
				let res = await this.$api.cancelResume({
					companyInterviewId: id
				})
				console.log(res)
				if (res.code == 20000) {
					uni.showToast({
						title: "成功取消投递"
					})
					this.getGoJobList()
				} else {
					uni.showToast({
						icon: "none",
						title: "取消投递失败"
					})

				}
			},
			// 查看详情
			seeDetail(id) {
				uni.navigateTo({
					url: `/pages/JobDetail/JobDetail?id=${id}`
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

		.mainContainer {
			width: 96%;
			margin: 20rpx auto 0;

			.jobBox {
				background-color: #fff;
				margin-bottom: 20rpx;
				border-radius: 14rpx;
				padding: 20rpx 30rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				.job {
					font-size: 30rpx;
					font-weight: bold;
					position: relative;
					margin-left: 20rpx;
				}

				.job:before {
					content: "";
					position: absolute;
					width: 8rpx;
					height: 36rpx;
					background-color: lightblue;
					top: 3rpx;
					left: -20rpx;
					border-radius: 5rpx;
				}

				.require {
					margin-top: 20rpx;
					font-size: 26rpx;
					color: #333;
				}

				.company {
					margin-top: 10rpx;
					font-size: 26rpx;
				}

				.place {
					margin-top: 10rpx;
					letter-spacing: 1rpx;
					font-size: 28rpx;
				}

				.money {
					margin-top: 20rpx;
					font-size: 36rpx;
					color: red;
					font-weight: bold;
				}

				.date {
					margin-top: 16rpx;
					padding-top: 10rpx;
					border-top: 1rpx #ccc solid;
					font-size: 24rpx;
					color: #333333;
				}

				.operate {
					padding-top: 20rpx;
					margin-left: 400rpx;
					display: flex;
					justify-content: space-between;

					.detail {
						padding: 10rpx;
						background-color: #56b6c2;
						color: #fff;
						border-radius: 10rpx;
					}

					.delete {
						padding: 10rpx;
						background-color: #e06c75;
						color: #fff;
						border-radius: 10rpx;
					}
				}
			}
		}
	
		.noData{
			margin: 300rpx auto;
			text-align: center;
			color: #999;
		}
	}
</style>
