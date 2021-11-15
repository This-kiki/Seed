<template>
	<view class="detailContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<!-- 主体详情 -->
		<view class="mainContaienr">
			<!-- 工作详情 -->
			<view class="workInfo">
				<view class="top">
					<view class="work">
						{{jobInfo.job}}
						<text class="category">兼职</text>
					</view>
					<view class="money">
						<text>{{jobInfo.reward}}</text>
					</view>
				</view>
				<view class="bottom">
					<view class="require">
						{{jobInfo.brief}}
					</view>
					<view class="address">
						{{jobInfo.place}}
					</view>

				</view>
				<view class="date">
					{{jobInfo.createTime}} 发布
				</view>
			</view>
			<!-- 职位描述 -->
			<view class="workDetail">
				<view class="title">
					职位详情
				</view>
				<view class="detail">
					<view class="item">
						<text>职位：</text>
						{{jobInfo.job}}
					</view>
					<view class="item">
						<text>学历要求：</text>
						{{jobInfo.education}}
					</view>
					<view class="item">
						<text>经验要求：</text>
						{{jobInfo.experience}}
					</view>
					<view class="require">
						<text>需求描述：</text>
						{{jobInfo.need}}
					</view>
					<view class="item" v-if="jobInfo.isMember">
						<text>公司名称：</text>
						{{jobInfo.companyName}}
					</view>
					<view class="require" v-if="jobInfo.isMember">
						<text>公司详情：</text>
						{{jobInfo.companyInfo}}
					</view>
				</view>
				<view class="num">
					职位招聘 {{jobInfo.num}} 人
				</view>
			</view>
			<!-- 公司信息 -->
			<view class="companyInfo" v-if="companyInfo">
				<view class="title">
					公司信息
					<text @click="companyDetail(companyInfo.openId)">查看详情</text>
				</view>
				<view class="name">
					{{companyInfo.companyName}}
				</view>
				<view class="companyDetail">
					<view class="scope">
						<text>经营范围：</text>
						{{companyInfo.manageArea}}
					</view>
					<view class="scope">
						<text>企业人数：</text>
						{{companyInfo.num}}
					</view>
					<view class="phone" v-if="identity!=0">
						<text>电话：</text>
						{{companyInfo.companyPhone}}
					</view>
					<view class="address">
						<text>地址：</text>
						{{companyInfo.address}}
					</view>
					<view class="intro">
						{{companyInfo.content}}
					</view>
				</view>
			</view>
			<!-- hr信息 -->
			<view class="hrContainer" v-if="identity!=0">
				<view class="detail">
					<view class="img" :style="{'background-image':'url('+hrInfo.img+')'}">
					</view>
					<view class="info">
						<view class="top">
							<view class="name">
								{{hrInfo.name}}
							</view>
							<view class="position">
								{{hrInfo.position}}
							</view>
						</view>
						<view class="bottom">
							<view class="company">
								{{companyInfo.companyName?companyInfo.companyName:'个人招聘'}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部操作框 -->
		<view class="operateLine">
			<view class="left">
				<button class="share" hover-class='none' open-type="share" @click="shareJob(jobInfo)">
					<view class="iconfont icon-share">
					</view>
					<view class="text">
						分享
					</view>
				</button>
				<view class="chat" @click="copy(hrInfo.email)">
					<view class="iconfont icon-youxiang">
					</view>
					<view class="text">
						邮箱
					</view>
				</view>
			</view>
			<view class="right">
				<view class="phone" @click="callPhone(hrInfo.phone)" :class="!companyInfo?'noCompany':''">
					<view class="iconfont icon-dianhua">
					</view>
					<view class="text">
						电话
					</view>
				</view>
				<view class="submit" @click="submitResume()" v-if="companyInfo">
					<view class="iconfont icon-submit">
					</view>
					<view class="text">
						马上申请
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
				setNav: {
					titleColor: "black",
					navTitle: "招聘详情",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 招聘详情id
				id: '',
				// 公司详情
				companyInfo: {},
				// 招聘详情
				jobInfo: {},
				// hr详情
				hrInfo: {},
				identity: 0,
				canRelease: false
			};
		},
		onLoad(option) {
			this.identity = uni.getStorageSync('identity')
			this.id = option.id
			this.getJobDetail()
			this.getResumeDetailOpenid()
		},
		methods: {
			// 获取简历详情
			async getResumeDetailOpenid() {
				let res = await this.$api.getResumeDetailOpenid({
					openid: uni.getStorageSync('openid')
				})
				// console.log(res)
				let num = 0
				let info = res.data.row
				for (let key in info) {
					if (!info[key]) {
						num++
					}
				}
				if (num > 6) {
					this.canRelease = false
				} else {
					this.canRelease = true
				}
				console.log("是否能够投递简历", this.canRelease)
			},
			// 获取招聘详情
			async getJobDetail() {
				let res = await this.$api.getJobDetail({
					id: this.id
				})
				// console.log(res)
				this.companyInfo = res.data.company
				this.jobInfo = res.data.detail
				this.hrInfo = res.data.user
				for (let key in this.jobInfo) {
					if (!this.jobInfo[key]) {
						this.jobInfo[key] = ""
					}
				}
			},
			// 公司详情
			companyDetail(id) {
				uni.navigateTo({
					url: `/pages/CompanyListDetail/CompanyListDetail?id=${id}`
				})
			},
			// 打电话
			callPhone(phone) {
				if (this.identity == 0) {
					uni.showModal({
						title: "暂无权限",
						content: "请申请入会",
						showCancel: false,
						success() {
							uni.navigateTo({
								url: "/pages/Mine/joinPage/joinPage"
							})
						}
					})
				} else {
					uni.makePhoneCall({
						phoneNumber: phone
					})
				}
			},
			// 信息复制到剪切板
			copy(value) {
				if (this.identity == 0) {
					uni.showModal({
						title: "暂无权限",
						content: "请申请入会",
						showCancel: false,
						success() {
							uni.navigateTo({
								url: "/pages/Mine/joinPage/joinPage"
							})
						}
					})
				} else {
					uni.showModal({
						content: value,
						confirmText: '复制内容',
						success: res => {
							if (res.confirm) {
								uni.setClipboardData({
									data: value,
									success: () => {
										uni.showToast({
											title: '复制成功'
										})
									}
								});
							} else if (res.cancel) {
								return
							}
						}
					});
				}
			},
			//分享
			shareJob(jobInfo) {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					title: jobInfo.job,
					summary: jobInfo.brief,
				});
			},
			// 聊天
			chat() {
				if (this.hrInfo.openId == uni.getStorageSync("openid")) {
					uni.showToast({
						icon: "none",
						title: "不能和自己聊天"
					})
					return
				}
				let link = encodeURIComponent(JSON.stringify(this.hrInfo.img))
				uni.navigateTo({
					url: `/pages/Chat/Chat?openid=${this.hrInfo.openId}&name=${this.hrInfo.name}&img=${link}`
				})
			},
			// 投递简历
			async submitResume() {
				if (this.identity == 0) {
					uni.showModal({
						title: "暂无权限",
						content: "请申请入会",
						showCancel: false,
						success() {
							uni.navigateTo({
								url: "/pages/Mine/joinPage/joinPage"
							})
						}
					})
					return
				}
				if (this.companyInfo.openId == uni.getStorageSync('openid')) {
					uni.showToast({
						title: "无法申请自己发布的招聘"
					})
					return
				}
				if (!this.canRelease) {
					uni.showToast({
						title: "简历信息较少，请先完善简历"
					})
					return
				}
				let res = await this.$api.submitResume({
					companyInterviewId: this.jobInfo.id
				})
				// console.log(res)
				if (res.code == 20000) {
					uni.showToast({
						title: "申请成功"
					})
				} else if (res.code == 10001) {
					uni.showToast({
						icon: "none",
						title: "请先添加简历"
					})
				} else if (res.code == 3001) {
					uni.showToast({
						icon: "none",
						title: "简历已经提交 请勿重复申请"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detailContainer {
		padding-bottom: 160rpx;
		background-color: #fff;
		min-height: 100vh;
		box-sizing: border-box;
		user-select: text;
		-webkit-user-select: text;

		.mainContaienr {
			.workInfo {
				margin: 16rpx auto 0;
				background-color: #fff;
				padding: 30rpx 4%;
				box-sizing: border-box;
				border-bottom: 1rpx solid #eee;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.work {
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
						margin-top: 20rpx;
						font-size: 22rpx;
						color: #36c1ba;

						text {
							font-size: 32rpx;
							font-weight: bold;
						}
					}
				}

				.bottom {
					display: flex;
					justify-content: flex-start;
					margin-top: 10rpx;

					view {
						margin-right: 10rpx;
						font-size: 22rpx;
						color: #666;
						background-color: #eee;
						padding: 2rpx 8rpx;
						border-radius: 8rpx;
					}
				}

				.date {
					text-align: right;
					font-size: 20rpx;
					color: #666;
					margin-top: 16rpx;
				}
			}

			.workDetail {
				margin: 16rpx auto 0;
				background-color: #fff;
				padding: 30rpx 4%;
				box-sizing: border-box;
				border-bottom: 1rpx solid #eee;

				.title {
					font-size: 30rpx;
					font-weight: bold;
				}

				.detail {
					margin-top: 28rpx;

					.item {
						font-size: 24rpx;
						margin-bottom: 10rpx;
						display: flex;

						text {
							color: #666;
							width: 120rpx;
						}
					}

					.require {
						display: flex;
						flex-direction: column;
						font-size: 24rpx;
						letter-spacing: 1rpx;
						line-height: 38rpx;
						margin-top: 16rpx;

						text {
							color: #666;
						}
					}
				}

				.num {
					font-size: 24rpx;
					color: #333;
					margin-top: 40rpx;
				}
			}

			.companyInfo {
				margin: 16rpx auto 0;
				background-color: #fff;
				padding: 30rpx 4%;
				box-sizing: border-box;
				border-bottom: 1rpx solid #eee;

				.title {
					font-size: 30rpx;
					font-weight: bold;

					text {
						font-size: 24rpx;
						color: #36c1ba;
						font-weight: normal;
						float: right;
					}
				}

				.name {
					margin-top: 30rpx;
					font-size: 28rpx;
					letter-spacing: 1rpx;
					font-weight: bold;
					padding-bottom: 16rpx;
				}

				.companyDetail {
					margin-top: 16rpx;
					font-size: 24rpx;
					letter-spacing: 1rpx;

					.scope,
					.address,
					.phone {
						margin-bottom: 10rpx;
						display: flex;

						text {
							color: #666;
							width: 140rpx;
						}
					}

					.intro {
						letter-spacing: 1rpx;
						line-height: 38rpx;
						margin-top: 16rpx;
					}
				}
			}

			.hrContainer {
				margin: 16rpx auto 0;
				background-color: #fff;
				padding: 30rpx 8%;
				box-sizing: border-box;
				border-bottom: 1rpx #eee solid;

				.detail {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.img {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50rpx;
						background-position: center;
						background-repeat: no-repeat;
						background-size: cover;
						border: 1rpx #eee solid;
					}

					.info {
						margin-left: 40rpx;

						.top {
							display: flex;
							justify-content: flex-start;
							align-items: center;
							font-size: 30rpx;

							.position {
								margin-left: 10rpx;
								font-size: 24rpx;
								color: #999;
							}
						}

						.bottom {
							margin-top: 10rpx;
							font-size: 26rpx;
						}
					}
				}
			}
		}

		.operateLine {
			background-color: #fff;
			box-sizing: border-box;
			position: fixed;
			bottom: 20rpx;
			left: 2%;
			width: 96%;
			height: 120rpx;
			border-radius: 14rpx;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			.left {
				width: 30%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 0 20rpx 0 0;
				text-align: center;

				.share {
					background-color: #fff;
					width: 60rpx;
					height: 120rpx;

					.iconfont {
						position: absolute;
						top: -6rpx;
						width: 80rpx;
					}

					.text {
						position: absolute;
						bottom: 8rpx;
						width: 80rpx;
					}
				}

				button {
					padding: 0;
					margin: 0;
				}

				button::after {
					border: none;
				}

				.iconfont {
					font-size: 40rpx;
				}

				.text {
					font-size: 24rpx;
				}
			}

			.right {
				width: 70%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 0 10rpx;
				text-align: center;
				border-left: 1rpx #ccc solid;

				.phone,
				.submit {
					display: inline-flex;
					align-items: center;
					color: #fff;
					padding: 14rpx 26rpx;
					border-radius: 6rpx;
					box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

					.iconfont {
						margin-right: 10rpx;
					}
				}

				.phone {
					background-color: #117bd1;
				}

				.noCompany {
					width: 400rpx;
					height: 80rpx;
					padding: 0;
					display: flex;
					justify-content: center;
				}

				.submit {
					background-color: #36c1ba;
				}
			}
		}
	}
</style>
