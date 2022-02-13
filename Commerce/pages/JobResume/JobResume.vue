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
							{{info.age?info.age:""}}岁
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
					{{info.personAdvantage?info.personAdvantage:"暂无"}}
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
							{{info.position?info.position:"暂无"}}
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
								{{info.companyName?info.companyName:"暂无"}}
							</view>
							<view class="industy">
								{{info.industyName}}
							</view>
						</view>
						<view class="item_right">
							{{info.jobTime}}
						</view>
					</view>
					<view class="jobContent item" v-if="info.jobContent">
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
								{{info.projectName?info.projectName:"暂无"}}
							</view>
							<view class="role">
								{{info.role}}
							</view>
						</view>
						<view class="time">
							{{info.projectTime}}
						</view>
					</view>
					<view class="info" v-if="info.projectDesc">
						<text>内容：</text>
						{{info.projectDesc}}
					</view>
					<view class="info" v-if="info.projectPerformance">
						<text>业绩：</text>
						{{info.projectPerformance}}
					</view>
					<view class="info" v-if="info.projectUrl">
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
							{{info.school?info.school:"暂无"}}
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
					<view class="name" v-if="!info.certificate">
						暂无
					</view>
					<view class="box" v-for="(item,index) in info.certificate" :key="index" v-if="info.certificate">
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
					{{info.socicalIndex?info.socicalIndex:"暂无"}}
				</view>
			</view>
			<view class="volunteer common" @click="goPage('volunteer')">
				<view class="title">
					志愿者服务经历
					<view class="iconfont icon-xiugai" v-if="flag!=2">
					</view>
				</view>
				<view class="content">
					<view class="volun" v-if="info.volunteerList">
						<view class="volun_left">
							<view class="name">
								{{info.volunteerList[0].volunteerName}}
							</view>
							<view class="long">
								{{info.volunteerList[0].volunteerLong}}
							</view>
						</view>
						<view class="time">
							{{info.volunteerList[0].volunteerTime}}
						</view>
					</view>
					<view class="volunInfo">
						{{info.volunteerList?info.volunteerList[0].volunteerDesc:"暂无"}}
					</view>
				</view>
			</view>
			<view class="btn" @click="getResumePdf()">
				导出PDF简历
			</view>
			<view class="btn" style="background-color: #e06c75;" @click="deleteResume()" v-if="flag==1">
				删除当前简历
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "#fff",
					navTitle: "我的简历",
					bgColor: "#36c1ba",
					isShowBackBtn: true,
					backBtnColor: "#fff"
				},
				// 简历信息
				info: {
					age: 0,
					area: "",
					attachment: "",
					certificate: "",
					city: "",
					companyName: "",
					education: "",
					email: "",
					experienceTime: "",
					img: "",
					industry: "",
					industyName: "",
					jobContent: "",
					jobIndustry: "",
					jobTime: "",
					name: "",
					openId: "",
					pay: "",
					personAdvantage: "",
					phone: "",
					position: "",
					profession: "",
					projectDesc: "",
					projectName: "",
					projectPerformance: "",
					projectTime: "",
					projectUrl: "",
					publish: 0,
					role: "",
					school: "",
					schoolExperience: "",
					schoolTime: "",
					sex: "",
					socicalIndex: "",
					state: 0,
					view: 0,
					volunteerDesc: "",
					volunteerLong: "",
					volunteerName: "",
					volunteerTime: ""
				},
				flag: 1,
				id: "",
				// 个人资料
				baseInfo: {},
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
			// 获取个人信息
			async getBaseInfo() {
				let res = await this.$api.getUserMsg()
				// console.log(res)
				this.baseInfo = res.data.userBaseInfo
				this.info.name = this.baseInfo.name
				this.info.img = this.baseInfo.img
				let time = parseInt(this.baseInfo.birth.split("-")[0])
				let date = new Date
				let now = date.getFullYear()
				this.info.age = now - time
				this.addResume()
			},
			// 获取简历详情
			async getResumeDetail() {
				let res = await this.$api.getResumeDetail({
					id: this.id
				})
				this.info = res.data.row
				for (let key in this.info) {
					if (!this.info[key]) {
						this.info[key] = "无"
					}
				}
				this.info.volunteerList = JSON.parse(this.info.volunteer)
				this.info.certificate = JSON.parse(this.info.certificate)
			},
			// 获取自己的简历
			async getResume() {
				if (this.flag == 2) {
					this.getResumeDetail()
					return
				}
				let res = await this.$api.getResume()
				let obj = res.data.resume
				for (let key in obj) {
					if (obj[key]) {
						this.info[key] = obj[key]
					} else {
						this.info[key] = ""
					}
				}
				if (!obj) {
					this.getBaseInfo()
				}
				if (this.info.certificate) {
					this.info.certificate = JSON.parse(this.info.certificate)
				}

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
			// 添加简历
			async addResume() {
				let res = await this.$api.addResume(this.info)
				// console.log(res)
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
			},
			// 删除简历
			deleteResume() {
				uni.showModal({
					title: "提示",
					content: "确定删除？",
					success: async res => {
						if (res.confirm) {
							let res = await this.$api.deleteResume({
								id: this.info.id
							})
							console.log(res)
							if (res.code == 20000) {
								uni.showToast({
									icon: "none",
									title: '删除成功'
								})
								this.getResume()
								uni.navigateBack()
							}
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
		user-select: text;
		-webkit-user-select: text;

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

					.name {
						font-size: 28rpx;
					}

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
