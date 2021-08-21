<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 简历列表 -->
		<view class="resumeContainer">
			<view class="resumeBox" v-for="item in resumeList" :key="item.id">
				<view class="top">
					<view class="img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="info">
						<view class="name">
							{{item.name}}
						</view>
						<view class="course common">
							<text>专业课程</text>
							{{item.course}}
						</view>
						<view class="computer common">
							<text>计算机</text>
							{{item.computer}}
						</view>
						<view class="english common">
							<text>四六级</text>
							{{item.english}}
						</view>
					</view>
				</view>
				<view class="bottom">
					<view class="chat" @click="chat(item)">
						微聊
					</view>
					<view class="detail" @click="seeDetail(item)">
						查看详情
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
					navTitle: "投递简历",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 表单
				form: {
					companyInfoId: "1e2e269ac0f1d01153b74e3970cbfb04",
					current: 1,
					limit: 2000
				},
				// 简历列表
				resumeList: []
			};
		},
		onLoad(options) {
			if (options.id)
				this.form.companyInfoId = options.id
			this.getSubmitResumeList()
		},
		methods: {
			// 获取简历列表
			async getSubmitResumeList() {
				let res = await this.$api.getSubmitResumeList(this.form)
				// console.log(res)
				this.resumeList = res.data.resume
			},
			// 查看简历详情
			seeDetail(item) {
				uni.navigateTo({
					url: `/pages/JobResume/JobResume?info=${JSON.stringify(item)}`
				})
			},
			// 聊天
			chat(item) {
				if (item.openId == uni.getStorageSync("openid")) {
					uni.showToast({
						icon: "none",
						title: "不能和自己聊天"
					})
					return
				}
				let link = encodeURIComponent(JSON.stringify(item.img))
				uni.navigateTo({
					url: `/pages/Chat/Chat?openid=${item.openId}&name=${item.name}&img=${link}`
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
		background-color: #f1f1f1;

		.resumeContainer {
			width: 96%;
			margin: 20rpx auto 0;

			.resumeBox {
				padding: 20rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				.top {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.img {
						width: 200rpx;
						height: 250rpx;
						border-radius: 10rpx;
						background-color: lightblue;
						box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}

					.info {
						margin-left: 30rpx;

						.name {
							font-size: 28rpx;
							font-weight: bold;
							margin-bottom: 20rpx;
						}

						.common {
							margin-bottom: 10rpx;
							font-size: 26rpx;

							text {
								color: #999;
								font-size: 24rpx;
								display: inline-block;
								width: 110rpx;
							}
						}
					}
				}

				.bottom {
					padding-top: 20rpx;
					margin-top: 20rpx;
					border-top: 1rpx #eee solid;
					display: flex;
					justify-content: flex-end;

					.detail,
					.chat {
						font-size: 24rpx;
						border: 1rpx #4e8df6 solid;
						padding: 6rpx 10rpx;
						border-radius: 10rpx;
						color: #4e8df6;
						width: 100rpx;
						text-align: center;
						letter-spacing: 1rpx;
					}

					.chat {
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
