<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体 -->
		<view class="mainContainer">
			<view class="jobBox" v-for="item in jobList" :key="item.id">
				<view class="top">
					<view class="title">
						{{item.job}}
						<text class="category">{{getCate(item.classfication)}}</text>
					</view>
					<view class="money">
						{{item.reward}}
					</view>
				</view>
				<view class="need">
					{{item.need}}
				</view>
				<view class="company">
					<view class="name">
						{{item.companyName}}
					</view>
					<view class="num">
						{{item.num}}人
					</view>
				</view>
				<view class="bottom">
					<view class="date">
						{{item.createTime.split(' ')[0]}}
					</view>
					<view class="address">
						{{item.place}}
					</view>
				</view>
				<view class="operate">
					<view class="delete" @click="cancelResume(item.id)">
						撤回
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
				this.jobList = []
				let res = await this.$api.getGoJobList()
				// console.log(res)
				let list = res.data.com
				list.forEach(item => {
					if (item) {
						this.jobList.push(item)
					}
				})
			},
			// 取消投递简历
			async cancelResume(id) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定取消投递简历？',
					success: async function(res) {
						if (res.confirm) {
							let res = await that.$api.cancelResume({
								companyInterviewId: id
							})
							// console.log(res)
							if (res.code == 20000) {
								uni.showToast({
									title: "成功取消投递"
								})
								setTimeout(() => {
									that.getGoJobList()
								}, 300)
							} else {
								uni.showToast({
									icon: "none",
									title: "取消投递失败"
								})

							}
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			// 查看详情
			seeDetail(id) {
				uni.navigateTo({
					url: `/pages/JobDetail/JobDetail?id=${id}`
				})
			},
			// 获取类别
			getCate(id) {
				switch (id) {
					case 0:
						return "兼职";
					case 1:
						return "实习";
					case 2:
						return "校招";
					case 3:
						return "社招";
				}
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
		user-select: text;
		-webkit-user-select: text;

		.mainContainer {
			width: 96%;
			margin: 20rpx auto 0;

			.jobBox {
				background-color: #fff;
				padding: 30rpx 4%;
				margin-bottom: 14rpx;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						display: flex;
						align-items: center;
						font-size: 30rpx;
						font-weight: bold;

						.category {
							font-size: 22rpx;
							color: #d17846;
							padding: 1rpx;
							border: 1rpx solid #d17846;
							border-radius: 6rpx;
							margin-left: 10rpx;
						}
					}

					.money {
						font-size: 30rpx;
						color: #36c1ba;
					}
				}

				.need {
					margin-top: 16rpx;
					font-size: 22rpx;
					color: #666;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.company {
					font-size: 26rpx;
					margin-top: 10rpx;
					display: flex;
					justify-content: flex-start;

					.name {
						margin-right: 10rpx;
					}
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					margin-top: 16rpx;
					font-size: 22rpx;
					color: #999;
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

		.noData {
			margin: 300rpx auto;
			text-align: center;
			color: #999;
		}
	}
</style>
