<template>
	<view class="resumeContainer">
		<scroll-view class="resumeList" :style="{'height':height+'px'}" scroll-y="true" refresher-enabled="true"
			:refresher-triggered="loading" @refresherrefresh="refresh" @scrolltolower="loadMore">
			<slot slot="content" class="resumeList">
				<view class="resumeBox" v-for="item in resumeList" :key="item.id">
					<view class="img" :style="{'backgroundImage':`url(${item.img})`}">
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
				<view v-if="loadmore" class="loadMore" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-show="springback" class="loadMore">已经到底啦~~</view>
			</slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: ['height'],
		data() {
			return {
				// 当前页
				current: 1,
				// 简历列表
				resumeList: [],
				loading: false,
				loadmore: true,
				loadmoreText: "加载更多",
				springback: false
			};
		},
		created() {
			this.getResumeList()
		},
		methods: {
			refresh() {
				this.loading = true
				this.current = 1
				this.resumeList = []
				this.springback = false
				this.loadmore = true
				this.loadmoreText = "加载更多"
				this.getResumeList()
			},
			loadMore() {
				this.current++
				this.loadmoreText = "正在加载中"
				this.getResumeList()
			},
			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				let resumeInfo = res.data.resume
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
								return
							}
						}
					})
				} else {
					this.release()
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
				if (list.length == 0) {
					this.loadmore = false
					this.springback = true
					setTimeout(() => {
						this.springback = false
					}, 800)
				} else {
					this.resumeList.push.apply(this.resumeList, list)
				}
				setTimeout(() => {
					this.loading = false
				}, 300)
			},
			// 查看详情
			seeDetail(id) {
				uni.navigateTo({
					url: `/pages/ResumeDetail/ResumeDetail?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.resumeContainer {
		background-color: #f5f5f5;

		.resumeList {
			margin: 0 auto;

			.resumeBox {
				padding: 20rpx 4% 0;
				box-sizing: border-box;
				border-bottom: 1rpx solid #eee;
				display: flex;
				justify-content: space-between;
				background-color: #fff;
				margin-bottom: 14rpx;

				.img {
					width: 90rpx;
					height: 90rpx;
					border-radius: 45rpx;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
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
							color: #36c1ba;
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
					color: #36c1ba;
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
			background-color: #fff;
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
			background-color: #fff;
		}

		.loadMore {
			width: 100%;
			text-align: center;
			height: 80rpx;
			font-size: 25rpx;
			letter-spacing: 5rpx;
			color: rgb(175, 175, 175);
			margin-top: 30rpx;
		}
	}
</style>
