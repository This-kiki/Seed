<template>
	<view class="detailContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体详情 -->
		<view class="mainContaienr">
			<!-- 工作详情 -->
			<view class="workInfo">
				<view class="work">
					{{jobInfo.job}}
				</view>
				<view class="money">
					<text>{{jobInfo.reward}}</text>
				</view>
				<view class="num">
					招聘人数 {{jobInfo.num}}
				</view>
				<view class="require">
					{{jobInfo.brief}}
				</view>
				<view class="date">
					{{jobInfo.createTime}} 发布
				</view>
			</view>
			<!-- 职位描述 -->
			<view class="workDetail">
				<view class="title">
					职位描述
				</view>
				<view class="detail">
					<view class="position">
						<text>职位：</text>
						{{jobInfo.job}}
					</view>
					<view class="address">
						<text>地点：</text>
						{{jobInfo.place}}
					</view>
					<view class="require">
						{{jobInfo.need}}
					</view>
				</view>
			</view>
			<!-- 公司信息 -->
			<view class="companyInfo">
				<view class="title">
					公司信息
					<text @click="companyDetail(companyInfo.id)">查看详情</text>
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
					<view class="phone">
						<text>电话：</text>
						{{companyInfo.companyPhone}}
					</view>
					<view class="address">
						<text>地址：</text>
						{{companyInfo.addresss}}
					</view>
					<view class="intro">
						{{companyInfo.content}}
					</view>
				</view>
			</view>
			<!-- hr信息 -->
			<view class="hrContainer">
				<view class="title">
					HR信息
				</view>
				<view class="detail">
					<view class="img">
						<image :src="hrInfo.img" mode=""></image>
					</view>
					<view class="info">
						<view class="name">
							{{hrInfo.name}}
						</view>
						<view class="position">
							{{hrInfo.position}}
						</view>
						<view class="phone">
							<text>电话</text>
							{{hrInfo.phone}}
						</view>
						<view class="email">
							<text>邮箱</text>
							{{hrInfo.email}}
						</view>
					</view>
				</view>
				<view class="introduce">
					{{hrInfo.introduce}}
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
				<view class="chat" @click="chat()">
					<view class="iconfont icon-chat">
					</view>
					<view class="text">
						微聊
					</view>
				</view>
			</view>
			<view class="right">
				<view class="phone" @click="callPhone(hrInfo.phone)">
					<view class="iconfont icon-dianhua">
					</view>
					<view class="text">
						电话
					</view>
				</view>
				<view class="submit" @click="submitResume()">
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
				hrInfo: {}
			};
		},
		onLoad(option) {
			this.id = option.id
			this.getJobDetail()
		},
		methods: {
			// 获取招聘详情
			async getJobDetail() {
				let res = await this.$api.getJobDetail({
					id: this.id
				})
				// console.log(res)
				this.companyInfo = res.data.company
				this.jobInfo = res.data.detail
				this.hrInfo = res.data.user
			},
			// 公司详情
			companyDetail(id) {
				uni.navigateTo({
					url: `/pages/CompanyListDetail/CompanyListDetail?id=${id}`
				})
			},
			// 打电话
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			//分享
			shareJob(jobInfo) {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					title: jobInfo.job,
					summary: jobInfo.brief,
					success: function(res) {
						uni.showToast({
							title: "分享成功"
						})
					},
					fail: function(err) {
						uni.showToast({
							icon: "none",
							title: "分享失败"
						})
					}
				});
			},
			// 聊天
			chat() {
				uni.navigateTo({
					url: `/pages/Chat/Chat?openid=${this.hrInfo.openId}&name=${this.hrInfo.name}&img=${this.hrInfo.img}`
				})
			},
			// 投递简历
			async submitResume() {
				let res = await this.$api.submitResume({
					companyInterviewId: this.jobInfo.id
				})
				// console.log(res)
				if (res.code == 3001) {
					uni.showToast({
						title: "申请成功"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detailContainer {
		padding-bottom: 160rpx;
		background-color: #f0f0f0;
		min-height: 100vh;
		box-sizing: border-box;

		.mainContaienr {
			.workInfo {
				width: 96%;
				margin: 16rpx auto 0;
				background-color: #fff;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				.work {
					font-size: 32rpx;
					font-weight: bold;
				}

				.money {
					margin-top: 20rpx;
					font-size: 22rpx;
					color: red;

					text {
						font-size: 34rpx;
						font-weight: bold;
						margin-right: 4rpx;
					}
				}

				.num {
					font-size: 24rpx;
					color: #333;
					margin-top: 20rpx;
				}

				.require {
					font-size: 24rpx;
					color: #333;
					margin-top: 10rpx;
				}

				.date {
					padding-top: 16rpx;
					font-size: 20rpx;
					color: #666;
					border-top: 1rpx #ccc solid;
					margin-top: 16rpx;
				}
			}

			.workDetail {
				width: 96%;
				margin: 16rpx auto 0;
				background-color: #fff;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				.title {
					font-size: 30rpx;
					font-weight: bold;
				}

				.detail {
					margin-top: 28rpx;

					.position,
					.address {
						font-size: 24rpx;
						margin-bottom: 10rpx;

						text {
							color: #333;
						}
					}

					.require {
						font-size: 24rpx;
						letter-spacing: 1rpx;
						line-height: 38rpx;
						margin-top: 16rpx;
					}
				}
			}

			.companyInfo {
				width: 96%;
				margin: 16rpx auto 0;
				background-color: #fff;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				.title {
					font-size: 30rpx;
					font-weight: bold;

					text {
						font-size: 24rpx;
						color: #117bd1;
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
					border-bottom: 1rpx #ccc solid;
				}

				.companyDetail {
					margin-top: 16rpx;
					font-size: 24rpx;
					letter-spacing: 1rpx;

					.scope,
					.address,
					.phone {
						margin-bottom: 10rpx;

						text {
							color: #333;
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
				width: 96%;
				margin: 16rpx auto 0;
				background-color: #fff;
				padding: 20rpx;
				box-sizing: border-box;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				.title {
					font-size: 30rpx;
					font-weight: bold;
				}

				.detail {
					margin-top: 30rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.img {
						width: 200rpx;
						height: 250rpx;
						border-radius: 10rpx;
						background-color: lightblue;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}

					.info {
						margin-left: 30rpx;

						.name {
							font-size: 30rpx;
							font-weight: bold;
							margin-bottom: 20rpx;
						}

						.position {
							font-size: 28rpx;
							margin-top: 10rpx;

						}

						text {
							font-size: 24rpx;
							color: #333;
							margin-right: 20rpx;
						}

						.phone,
						.num,
						.email {
							font-size: 26rpx;
							margin-top: 10rpx;
						}
					}
				}

				.introduce {
					padding-top: 20rpx;
					margin-top: 20rpx;
					border-top: 1rpx #ccc solid;
					text-indent: 2em;
					word-break: break-all;
					letter-spacing: 1rpx;
					line-height: 48rpx;
					font-size: 28rpx;
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

				.submit {
					background-color: #fe552e;
				}
			}
		}
	}
</style>
