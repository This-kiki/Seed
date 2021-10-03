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
						<text class="iconfont icon-xiugai" v-if="flag!=2"></text>
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
			<view class="advantage common" @click="goPage('advantage')">
				<view class="title">
					个人优势
					<view class="iconfont icon-xiugai" v-if="flag!=2">
					</view>
				</view>
				<view class="content">
					{{info.personAdvantage}}
				</view>
			</view>
			<view class="hope common" @click="goPage('hope')">
				<view class="title">
					求职期望
					<view class="iconfont icon-xiugai" v-if="flag!=2">
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
			<view class="work common" @click="goPage('work')">
				<view class="title">
					工作经历
					<view class="iconfont icon-xiugai" v-if="flag!=2">
					</view>
				</view>
				<view class="content">
					<view class="item">
						<view class="item_left">
							<view class="name">
								{{info.companyName}}
							</view>
							<view class="industy">
								{{info.industyName}}
							</view>
						</view>
						<view class="item_right">
							{{info.jobTime}}
						</view>
					</view>
					<view class="jobContent item">
						内容：
						{{info.jobContent}}
					</view>
					<view class="jobContent item">
						{{info.jobIndustry}}
					</view>
				</view>
			</view>
			<view class="project common" @click="goPage('project')">
				<view class="title">
					项目经历
					<view class="iconfont icon-xiugai" v-if="flag!=2">
					</view>
				</view>
				<view class="content">
					<view class="detail">
						<view class="detail_left">
							<view class="name">
								{{info.projectName}}
							</view>
							<view class="role">
								{{info.role}}
							</view>
						</view>
						<view class="time">
							{{info.projectTime}}
						</view>
					</view>
					<view class="info">
						<text>内容：</text>
						{{info.projectDesc}}
					</view>
					<view class="info">
						<text>业绩：</text>
						{{info.projectPerformance}}
					</view>
					<view class="info">
						<text>项目链接：</text>
						{{info.projectUrl}}
					</view>
				</view>
			</view>
			<view class="education common" @click="goPage('education')">
				<view class="title">
					教育经历
					<view class="iconfont icon-xiugai" v-if="flag!=2">
					</view>
				</view>
				<view class="content">
					<view class="school">
						<view class="name">
							{{info.school}}
						</view>
						<view class="pro">
							{{info.education}} {{info.profession}}
						</view>
					</view>
					<view class="time">
						{{info.schoolTime}}
					</view>
				</view>
			</view>
			<view class="certificate common" @click="goPage('certificate')">
				<view class="title">
					资格证书
					<view class="iconfont icon-xiugai" v-if="flag!=2">
					</view>
				</view>
				<view class="content">
					<view class="box" v-for="(item,index) in info.certificate" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			<view class="socical common" @click="goPage('socical')">
				<view class="title">
					社交主页
					<view class="iconfont icon-xiugai" v-if="flag!=2">
					</view>
				</view>
				<view class="content">
					{{info.socicalIndex}}
				</view>
			</view>
			<view class="volunteer common" @click="goPage('volunteer')">
				<view class="title">
					志愿者服务经历
					<view class="iconfont icon-xiugai" v-if="flag!=2">
					</view>
				</view>
				<view class="content">
					<view class="volun">
						<view class="volun_left">
							<view class="name">
								{{info.volunteerName}}
							</view>
							<view class="long">
								{{info.volunteerLong}}
							</view>
						</view>
						<view class="time">
							{{info.volunteerTime}}
						</view>
					</view>
					<view class="volunInfo">
						{{info.volunteerDesc}}
					</view>
				</view>
			</view>
			<view class="btn" @click="getResumePdf()">
				简历导出
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
				info: {},
				flag: 1,
				id: ""
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
				this.flag = 2
				this.setNav.navTitle = "详细简历"
			}
		},
		onShow() {
			this.getResume()
		},
		methods: {
			// 获取简历详情
			async getResumeDetail() {
				let res = await this.$api.getResumeDetail({
					id: this.id
				})
				this.info = res.data.row
				for (let key in this.info) {
					if (!this.info[key]) {
						this.info[key] = ""
					}
				}
				this.info.certificate = JSON.parse(this.info.certificate)
			},
			// 获取自己的简历
			async getResume() {
				if (this.flag == 2) {
					this.getResumeDetail()
					return
				}
				let res = await this.$api.getResume()
				this.info = res.data.resume
				for (let key in this.info) {
					if (!this.info[key]) {
						this.info[key] = ""
					}
				}
				this.info.certificate = JSON.parse(this.info.certificate)
			},
			// 跳转个人资料
			goUserInfo() {
				if (this.flag == 2) {
					return
				}
				uni.navigateTo({
					url: "/pages/Mine/MineMsg/MineMsg"
				})
			},
			// 跳转页面
			goPage(page) {
				if (this.flag == 2) {
					return
				}
				uni.navigateTo({
					url: `/pages/JobResume/${page}`
				})
			},
			// 导出简历
			async getResumePdf() {
				uni.showLoading()
				let res = await this.$api.getResumePdf({
					openid: this.info.openId
				})
				console.log(res)
				let url = res.data.url
				uni.hideLoading()
				uni.showModal({
					title: "简历链接",
					content: url,
					confirmText: "复制",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.setClipboardData({
								data: url,
								success: () => {
									uni.showToast({
										icon: "none",
										title: '复制成功'
									})
								}
							});
						}
					}
				})
			}
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
							color: #36c1ba;
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

					.iconfont {
						color: #36c1ba;
					}
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

			.work {
				.content {
					font-size: 28rpx;

					.item {
						font-size: 28rpx;
						margin-top: 10rpx;
						display: flex;
						justify-content: space-between;

						.item_left {
							.industy {
								color: #666;
								font-size: 24rpx;
							}
						}

						.item_right {
							color: #666;
							font-size: 24rpx;
						}

						.item_right {
							color: #666;
						}
					}
				}
			}

			.project {
				.content {
					.detail {
						display: flex;
						justify-content: space-between;

						.detail_left {
							font-size: 28rpx;

							.role {
								color: #666;
								font-size: 24rpx;
							}
						}

						.time {
							color: #666;
							font-size: 24rpx;
						}
					}

					.info {
						display: flex;
						flex-direction: column;
						font-size: 28rpx;
						margin-top: 10rpx;
					}
				}
			}

			.education {
				.content {
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;

					.pro,
					.time {
						color: #666;
						font-size: 24rpx;
					}
				}
			}

			.certificate {
				.content {
					margin-top: 20rpx;
					display: flex;
					flex-wrap: wrap;
					font-size: 24rpx;

					.box {
						padding: 4rpx 10rpx;
						border-radius: 8rpx;
						border: 1rpx solid #36c1ba;
						color: #36c1ba;
						margin: 0 14rpx 16rpx 0;
					}
				}
			}

			.volunteer {
				.content {
					font-size: 28rpx;

					.volun {
						display: flex;
						justify-content: space-between;
					}

					.long,
					.time {
						color: #666;
						font-size: 24rpx;
					}

					.volunInfo {
						margin-top: 10rpx;
					}
				}
			}

			.btn {
				width: 90%;
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
	}
</style>
