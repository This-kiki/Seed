<template>
	<view class="resumeContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<!-- 用户详情 -->
		<view class="userinfo">
			<view class="top">
				<view class="img">
					<image :src="info.img" mode=""></image>
				</view>
				<view class="title">
					<view class="name">
						{{info.name}}
					</view>
					<view class="info">
						<view class="age">
							{{info.age}}岁
						</view>
						<!-- <view class="marriage">
							{{info.marriage}}
						</view> -->
						<view class="education">
							{{info.education}}
						</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<view class="item">
					<view class="title">
						简历更新时间
					</view>
					<view class="content">
						{{info.modifiedTime.slice(0,10)}}
					</view>
				</view>
				<view class="item">
					<view class="title">
						浏览量
					</view>
					<view class="content">
						{{info.view}}次
					</view>
				</view>
			</view>
		</view>
		<!-- 求职意向 -->
		<view class="jobInfo">
			<view class="title">
				求职意向
			</view>
			<view class="content">
				<view class="common pay">
					<text>期望薪资</text>
					{{info.pay}}
				</view>
				<!-- <view class="common">
					<text>工作经验</text>
					{{info.experienceTime}}
				</view> -->
				<view class="common">
					<text>求职职位</text>
					{{info.position}}
				</view>
				<view class="common">
					<text>求职状态</text>
					{{info.state==0?"已经离职":"在职"}}
				</view>
				<view class="common">
					<text>求职区域</text>
					{{info.city}}
				</view>
			</view>
		</view>
		<view class="detailBtn" @click="goDetail()">
			查看详细简历
		</view>
		<!-- 操作栏 -->
		<view class="operate" v-if="identity!=0">
			<view class="chat" @click="copy(info.email)">
				<view class="iconfont icon-youxiang">
				</view>
				<view class="text">
					邮箱
				</view>
			</view>
			<view class="phone" @click="callPhone(info.phone)">
				<view class="iconfont icon-dianhua">
				</view>
				<view class="text">
					电话
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
					navTitle: "简历详情",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// id
				id: "",
				// 详情
				info: {
					modifiedTime: ""
				},
				identity: 0
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id
				this.getResumeDetail()
			}
			this.identity = uni.getStorageSync('identity')
		},
		methods: {
			goDetail(){
				uni.navigateTo({
					url: `/pages/JobResume/JobResume?id=${this.id}`
				})
			},
			// 获取简历详情
			async getResumeDetail() {
				let res = await this.$api.getResumeDetail({
					id: this.id
				})
				console.log(res)
				this.info = res.data.row
			},
			// 打电话
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			// 信息复制到剪切板
			copy(value) {
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
			},
		}
	}
</script>

<style lang="scss">
	.resumeContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.userinfo {
			width: 94%;
			margin: 20rpx auto;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 10rpx;
			box-sizing: border-box;

			.top {
				display: flex;
				justify-content: flex-start;

				.img {
					image {
						width: 140rpx;
						height: 140rpx;
						border-radius: 70rpx;
					}
				}

				.title {
					margin-left: 30rpx;
					margin-top: 20rpx;
					letter-spacing: 1rpx;

					.name {
						font-size: 34rpx;
						font-weight: bold;
					}

					.info {
						display: flex;
						font-size: 26rpx;
						margin-top: 20rpx;

						.age,
						.marriage,
						.education {
							color: #4e8df6;
							margin-right: 10rpx;
							padding: 5rpx 10rpx;
							background-color: #e9f1fe;
							border-radius: 10rpx;
						}
					}
				}
			}

			.bottom {
				display: flex;
				justify-content: space-around;
				margin-top: 40rpx;
				background-color: #f8edd9;
				padding: 40rpx 0;
				border-radius: 10rpx;

				.item {
					width: 50%;
					text-align: center;

					.title {
						color: #c9ad7a;
						font-size: 26rpx;
					}

					.content {
						color: #a68855;
						font-size: 36rpx;
						font-weight: bold;
						margin-top: 20rpx;
					}
				}
			}
		}

		.jobInfo {
			width: 94%;
			margin: 20rpx auto;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 10rpx;
			box-sizing: border-box;
			letter-spacing: 1rpx;

			.title {
				padding: 0 0 20rpx;
				font-size: 34rpx;
				font-weight: bold;
				border-bottom: 1rpx solid #eee;
			}

			.content {
				padding: 20rpx 0 0;

				.common {
					margin-top: 20rpx;

					text {
						color: #666;
						margin-right: 20rpx;
					}
				}

				.pay {
					color: #f66d50;
				}
			}

			.experience {
				margin-top: 20rpx;
				color: #333;
				font-size: 28rpx;
			}
		}

		.detailBtn {
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

		.operate {
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
			justify-content: space-around;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			.chat,
			.phone {
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.iconfont {
					margin-right: 10rpx;
					font-size: 40rpx;
				}

				.text {
					font-size: 34rpx;
				}
			}

			.chat {
				border-right: 1rpx solid #eee;
			}
		}
	}
</style>
