<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<!-- 主体 -->
		<view class="mainContainer">
			<view class="userInfo" @click="goUserInfo()">
				<view class="left">
					<view class="name">
						{{info.name}}
						<text class="iconfont icon-xiugai"></text>
					</view>
					<view class="detail">
						<view class="age">
							{{info.age}}
						</view>
						<view class="education">
							{{info.education}}
						</view>
					</view>
				</view>
				<view class="right">
					<view class="avatar" :style="{'backgroundImage':`url(${info.img})`}">
					</view>
				</view>
			</view>
			<view class="advantage common">
				<view class="title">
					个人优势
					<view class="iconfont icon-xiugai">
					</view>
				</view>
				<view class="content">
					{{info.personAdvantage}}
				</view>
			</view>
			<view class="hope common">
				<view class="title">
					求职期望
					<view class="iconfont icon-xiugai">
					</view>
				</view>
				<view class="content">
					<view class="top">
						<view class="position">
							{{info.position}}
						</view>
						<view class="pay">
							{{info.pay}}
						</view>
					</view>
					<view class="bottom">
						<view class="city">
							{{info.city}}
						</view>
						<view class="industry">
							{{info.industry}}
						</view>
					</view>
				</view>
			</view>
			<view class="work common">
				<view class="title">
					工作经历
					<view class="iconfont icon-xiugai">
					</view>
				</view>
				<view class="content">
					{{info.personAdvantage}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "我的简历",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 简历信息
				info: {}
			}
		},
		created() {
			this.getResume()
		},
		methods: {
			// 获取自己的简历
			async getResume() {
				if (this.flag == 1) {
					return
				}
				let res = await this.$api.getResume()
				this.info = res.data.resume
				// console.log(this.resumeInfo)
			},
			// 跳转个人资料
			goUserInfo() {
				uni.navigateTo({
					url: "/pages/Mine/MineMsg/MineMsg"
				})
			},
			// 会员删除简历
			async deleteResume() {
				if (this.resumeInfo == null) {
					uni.showToast({
						icon: "none",
						title: "请先添加简历"
					})
					return
				}
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定删除?',
					success: async function(res) {
						if (res.confirm) {
							let res = await that.$api.deleteResume({
								id: that.resumeInfo.id
							})
							console.log(res)
							if (res.code == 20000) {
								uni.showToast({
									title: "删除成功"
								})
								that.getResume()
							}
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			// 添加/修改简历
			async addResume() {
				if (this.resumeInfo)
					uni.navigateTo({
						url: `/pages/JobResumeAdd/JobResumeAdd?id=${this.resumeInfo.id}`
					})
				else
					uni.navigateTo({
						url: `/pages/JobResumeAdd/JobResumeAdd`
					})
			},
		}
	}
</script>

<style lang="scss">
	.jobContainer {
		padding-bottom: 150rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #fff;

		.mainContainer {
			.userInfo {
				padding: 30rpx 6%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx #eee solid;

				.left {
					.name {
						font-size: 48rpx;

						// font-weight: bold;
						.iconfont {
							margin-left: 20rpx;
							font-size: 38rpx;
							color: #666;
						}
					}

					.detail {
						display: flex;
						font-size: 28rpx;
						margin-top: 10rpx;

						.age {
							margin-right: 20rpx;
						}
					}
				}

				.right {
					display: flex;
					justify-content: center;
					align-items: center;

					.avatar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 60rpx;
						background-position: center;
						background-repeat: no-repeat;
						background-size: cover;
					}
				}
			}

			.common {
				padding: 30rpx 6%;
				border-bottom: 1rpx #eee solid;

				.title {
					font-size: 32rpx;
					font-weight: bold;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.content {
					margin-top: 20rpx;
					font-size: 28rpx;
				}
			}

			.hope {
				.top {
					display: flex;

					.position {
						margin-right: 20rpx;
					}
				}

				.bottom {
					font-size: 26rpx;
					display: flex;
					color: #666;

					.city {
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
