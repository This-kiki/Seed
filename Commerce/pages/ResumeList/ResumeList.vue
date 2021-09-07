<template>
	<view class="resumeContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<!-- 发布 -->
		<view class="release" @click="release()">
			发布
		</view>
		<!-- 撤回 -->
		<view class="norelease" @click="norelease()">
			撤回
		</view>
		<!-- 简历列表 -->
		<view class="resumeList">
			<view class="resumeBox" v-for="item in resumeList" :key="item.id">
				<view class="img">
					<image :src="item.img" mode=""></image>
				</view>
				<view class="info">
					<view class="name">
						{{item.name}}
					</view>
					<view class="common">
						<view class="text">
							求职职位
						</view>
						{{item.position}}
					</view>
					<view class="common">
						<view class="text">
							工作经验
						</view>
						{{item.experienceTime}}
					</view>
					<view class="common">
						<view class="text">
							期望薪资
						</view>
						{{item.pay}}
					</view>
					<view class="common">
						<view class="text">
							求职区域
						</view>
						{{item.area}}
					</view>
					<view class="common">
						{{item.experience}}
					</view>
					<view class="bottom">
						<view class="view">
							{{item.view}}人浏览
						</view>
						<view class="time">
							{{item.createTime.slice(0,10)}}
						</view>
					</view>
				</view>
				<view class="detail" @click="seeDetail(item.id)">
					查看详情
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<view class="loadMore" @click="loadMore()">
			下滑(点击)加载更多
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "简历列表",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 当前页
				current: 1,
				// 简历列表
				resumeList: []
			};
		},
		onShow() {
			this.getResume()
			this.current = 1
			this.resumeList = []
			this.getResumeList()
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				let resumeInfo = res.data.resume
				// console.log(this.resumeInfo)
				if (resumeInfo == null) {
					uni.showModal({
						title: '提示',
						content: '请先添加简历！',
						success: async function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/JobResume/JobResume"
								})
							} else if (res.cancel) {
								uni.navigateBack()
							}
						}
					})
				}
			},
			// 获得简历列表
			async getResumeList() {
				let data = {
					current: this.current,
					limit: 10
				}
				let res = await await this.$api.getResumeList(data)
				// console.log(res)
				let list = res.data.list
				this.resumeList.push.apply(this.resumeList, list)
			},
			// 加载更多
			loadMore() {
				this.current++
				this.getResumeList()
			},
			// 查看详情
			seeDetail(id) {
				uni.navigateTo({
					url: `/pages/ResumeDetail/ResumeDetail?id=${id}`
				})
			},
			// 发布简历
			release() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定发布简历？',
					success: async function(res) {
						if (res.confirm) {
							let res = await that.$api.releaseResume({
								publish: 1
							})
							if (res.code == 20000) {
								uni.showToast({
									title: '发布成功！'
								});
								that.current = 1
								that.resumeList = []
								that.getResumeList()
							}
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			// 撤回
			norelease() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定撤回简历？',
					success: async function(res) {
						if (res.confirm) {
							let res = await that.$api.releaseResume({
								publish: 0
							})
							if (res.code == 20000) {
								uni.showToast({
									title: '撤回成功！'
								});
								that.current = 1
								that.resumeList = []
								that.getResumeList()
							}
						} else if (res.cancel) {
							return
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.resumeContainer {

		.resumeList {
			width: 94%;
			margin: 0 auto 50rpx;
			margin-bottom: 20rpx;

			.resumeBox {
				padding: 20rpx 0 0;
				box-sizing: border-box;
				border-bottom: 1rpx solid #eee;
				display: flex;
				justify-content: space-between;

				.img {
					image {
						width: 90rpx;
						height: 90rpx;
						border-radius: 45rpx;
					}
				}

				.info {
					flex: 1;
					padding: 20rpx;
					letter-spacing: 1rpx;

					.name {
						font-size: 30rpx;
						font-weight: bold;
					}

					.common {
						font-size: 26rpx;
						margin-top: 10rpx;
						display: flex;

						.text {
							margin-right: 10rpx;
							color: #4e8df6;
						}
					}

					.bottom {
						display: flex;
						font-size: 22rpx;
						color: #999;
						margin-top: 30rpx;

						.time {
							margin-left: 20rpx;
						}
					}
				}

				.detail {
					color: #4e8df6;
					font-size: 24rpx;
					margin-top: 30rpx;
					letter-spacing: 1rpx;
				}
			}
		}

		.release {
			position: fixed;
			bottom: 240rpx;
			right: 60rpx;
			font-size: 30rpx;
			width: 100rpx;
			height: 100rpx;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			border-radius: 50rpx;
			text-align: center;
			line-height: 100rpx;
			color: #666;
		}

		.norelease {
			position: fixed;
			bottom: 120rpx;
			right: 60rpx;
			font-size: 30rpx;
			width: 100rpx;
			height: 100rpx;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			border-radius: 50rpx;
			text-align: center;
			line-height: 100rpx;
			color: #666;
		}

		.loadMore {
			text-align: center;
			font-size: 26rpx;
			color: #999;
			margin-top: 16rpx;
		}
	}
</style>
