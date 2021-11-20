<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 搜索框 -->
		<view class="inputLine">
			<input class="input" type="text" v-model="inputValue" placeholder="请输入关键字" @focus="showBtn=true"
				@blur="showBtn=false" />
			<view class="searchBtn" v-if="showBtn" @click="searchJob()">
				搜索
			</view>
			<view class="clearBtn" v-if="showBtn" @click="clearBtn()">
				清除搜索
			</view>
		</view>
		<scroll-view class="jobList" :style="{'height':height.swiperHeight+50+'px'}" scroll-y="true"
			refresher-enabled="true" :refresher-triggered="loading" @refresherrefresh="refresh"
			@scrolltolower="loadMore">
			<slot slot="content" class="jobList">
				<view class="jobBox" v-for="item in jobList" :key="item.id">
					<view class="top">
						<view class="left">
							<view class="title">
								{{item.job}}
							</view>
							<view class="address">
								{{item.place}}
							</view>
							<view class="company">
								{{item.companyName?item.companyName:"个人招聘"}}
							</view>
							<view class="money">
								{{item.reward}}
								<!-- <text>元</text> -->
							</view>
						</view>
						<view class="right">
							<view class="btn" @click="seeDetail(item.id)">
								查看
							</view>
							<view class="date">
								{{item.createTime.split(' ')[0]}}
							</view>
						</view>
					</view>
					<view class="bottom">
						<view class="delete" @click="deleteJobNeed(item.id)">
							<text class="iconfont icon-shanchu"></text>
							删除
						</view>
						<view class="edit" @click="editJobNeed(item.id)">
							<text class="iconfont icon-xiugai"></text>
							修改
						</view>
						<view class="resume" @click="seeResume(item.id)" v-if="identity==3">
							<text class="iconfont icon-geren"></text>
							简历
						</view>
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
		data() {
			return {
				setNav: {
					titleColor: "white",
					navTitle: "我的招聘",
					bgColor: "#36c1ba",
					isShowBackBtn: true,
					backBtnColor: "white"
				},
				// 公司id
				companyId: "",
				// 输入框内容
				inputValue: "",
				// 信息列表
				jobList: [],
				// 页数
				current: 1,
				// 条数
				limit: 10,
				// 显示按钮
				showBtn: false,
				height: {},
				loading: false,
				loadmore: true,
				loadmoreText: "加载更多",
				springback: false,
				openid: "",
				identity: 0
			};
		},
		created() {
			this.identity = uni.getStorageSync('identity')
			this.height = uni.getStorageSync('height')
			console.log(this.height)
		},
		onShow() {
			this.clearBtn()
		},
		methods: {
			refresh() {
				this.loading = true
				this.current = 1
				this.jobList = []
				this.springback = false
				this.loadmore = true
				this.loadmoreText = "加载更多"
				this.getJobList()
			},
			loadMore() {
				this.current++
				this.loadmoreText = "正在加载中"
				this.getJobList()
			},
			// 获取用户信息
			async getUserInfo() {
				let data = {
					openid: uni.getStorageSync("openid")
				}
				let res = await this.$api.getUserDetail(data)
				// console.log(res)
				let id = res.data.userDetailInfo.companyId
				if (id) {
					this.companyId = id
					this.openid = ""
				} else {
					this.companyId = ''
					this.openid = uni.getStorageSync('openid')
				}
				this.getJobList()
			},
			// 获取本公司发布的招聘信息
			async getJobList() {
				let data = {
					current: this.current,
					limit: this.limit,
					companyId: this.companyId,
					job: this.inputValue,
					classfication: "",
					openid: this.openid
				}
				let res = await this.$api.getJobList(data)
				// console.log(res)
				let nowList = res.data.list
				if (nowList.length == 0) {
					this.loadmore = false
					this.springback = true
					setTimeout(() => {
						this.springback = false
					}, 800)
				} else {
					this.jobList.push.apply(this.jobList, nowList)
				}
				setTimeout(() => {
					this.loading = false
				}, 300)
			},
			// 加载更多
			loadMore() {
				this.current++
				this.getJobList()
			},
			// 查看招聘信息详情
			seeDetail(id) {
				uni.navigateTo({
					url: `/pages/JobDetail/JobDetail?id=${id}`
				})
			},
			// 搜索工作
			searchJob() {
				this.jobList = []
				this.current = 1
				this.getJobList()
			},
			// 清除搜索
			clearBtn() {
				this.inputValue = ""
				this.jobList = []
				this.current = 1
				this.getUserInfo()
			},
			// 跳转页面
			goPage(page) {
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			},
			// 跳转页面
			goPage(page) {
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			},
			// 删除招聘信息
			async deleteJobNeed(id) {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					success: async function(res) {
						if (res.confirm) {
							let res = await that.$api.deleteJobNeed({
								id
							})
							// console.log(res)
							if (res.code == 20000) {
								uni.showToast({
									title: "删除成功"
								})
								that.clearBtn()
							} else {
								uni.showToast({
									icon: "none",
									title: "删除失败"
								})
							}
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			// 修改招聘信息
			editJobNeed(id) {
				uni.navigateTo({
					url: `/pages/JobRelease/JobRelease?id=${id}`
				})
			},
			// 查看招聘简历
			seeResume(id) {
				uni.navigateTo({
					url: `/pages/JobResumeList/JobResumeList?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.jobContainer {
		box-sizing: border-box;
		height: 100vh;
		background-color: #f5f5f5;
		overflow-y: hidden;
		user-select: text;
		-webkit-user-select: text;

		.inputLine {
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			height: 40px;
			padding: 0 3%;
			background-color: #36c1ba;
			padding-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			z-index: 99;

			.input {
				width: 100%;
				height: 60rpx;
				margin: 0 auto;
				padding: 0 20rpx;
				background-color: #ffffff;
				text-align: center;
				border-radius: 14rpx;
				letter-spacing: 1rpx;
				transition: 0.2s ease-in-out;
			}

			.searchBtn {
				font-size: 24rpx;
				width: 100rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #ffffff;
			}

			.clearBtn {
				font-size: 24rpx;
				width: 180rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #ffffff;
			}
		}


		.jobList {
			margin: 40px auto 0;
			width: 100%;

			.jobBox {
				padding: 20rpx 5%;
				margin-bottom: 20rpx;
				background-color: #fff;

				.top {
					display: flex;
					justify-content: space-between;

					.left {
						letter-spacing: 1rpx;

						.title {
							font-size: 28rpx;
							font-weight: bold;
						}

						.address {
							color: #999;
							font-size: 22rpx;
							margin-top: 10rpx;
						}

						.company {
							margin-top: 4rpx;
							color: #999;
							font-size: 22rpx;
						}

						.money {
							font-size: 34rpx;
							color: #4e8df6;
							margin-top: 6rpx;

							text {
								font-size: 22rpx;
								margin-left: 6rpx;
							}
						}
					}

					.right {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						text-align: center;

						.btn {
							color: #4e8df6;
							font-size: 24rpx;
							padding: 6rpx 15rpx;
							border: 2rpx solid #4e8df6;
							border-radius: 8rpx;
						}

						.date {
							color: #999;
							font-size: 22rpx;
						}
					}
				}

				.bottom {
					margin-top: 16rpx;
					padding-top: 16rpx;
					border-top: 1rpx #ccc solid;
					display: flex;
					justify-content: space-around;

					.delete,
					.edit,
					.resume {
						.iconfont {
							margin-right: 10rpx;
						}

						padding: 10rpx;
						border-radius: 10rpx;
						color: #fff;
					}

					.delete {
						background-color: #e06c75;
					}

					.edit {
						background-color: #61afef;
					}

					.resume {
						background-color: #d19a66;

					}
				}
			}
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
