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
		<!-- 操作栏 -->
		<view class="operateContainer">
			<view class="lawyer" @click="goPage('JobMe')">
				<text class="iconfont icon-geren"></text>
				我的求职
			</view>
			<view class="me" @click="goPage('JobResume')">
				<text class="iconfont icon-jianli"></text>
				我的简历
			</view>
			<view class="submit" @click="goPage('JobHR')">
				<text class="iconfont icon-guanli"></text>
				HR管理
			</view>
		</view>
		<!-- 职场列表 -->
		<view class="jobList" id="list">
			<view class="jobBox" v-for="item in jobList" :key="item.id" @click="seeDetail(item.id)">
				<view class="left">
					<view class="title">
						{{item.job}}
					</view>
					<view class="address">
						{{item.place}}
					</view>
					<view class="company">
						{{item.companyName}}
					</view>
					<view class="money">
						{{item.reward}}
						<!-- <text>元</text> -->
					</view>
				</view>
				<view class="right">
					<view class="btn">
						查看
					</view>
					<view class="date">
						{{item.createTime.split(' ')[0]}}
					</view>
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
	import loading from '@/components/info_Com/load-refresh/load-refresh.vue';
	export default {
		components: {
			loading
		},
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "求职",
					bgColor: "white"
				},
				setLoading: {
					show: false,
					text: "正在加载",
					mask: true,
				},
				// 输入框内容
				inputValue: "",
				// 信息列表
				jobList: [],
				// 页数
				current: 1,
				// 条数
				limit: 10,
				// 显示按钮
				showBtn: false
			}
		},
		created() {
			this.getJobList()
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			// 获取招聘信息列表
			async getJobList() {
				console.log(this.inputValue)
				let data = {
					current: this.current,
					limit: this.limit,
					job: this.inputValue
				}
				let res = await this.$api.getJobList(data)
				let nowList = res.data.list
				this.jobList.push.apply(this.jobList, nowList)
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
				this.getJobList()
			},
			// 跳转页面
			goPage(page) {
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jobContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.inputLine {
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			padding: 0 3%;
			background-color: #fff;
			padding-bottom: 20rpx;
			border-bottom: 4rpx solid #f1f1f1;
			display: flex;
			justify-content: space-between;
			z-index: 99;

			.input {
				width: 100%;
				height: 60rpx;
				margin: 0 auto;
				padding: 0 20rpx;
				background-color: #f1f1f1;
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
				color: #4e8df6;
			}

			.clearBtn {
				font-size: 24rpx;
				width: 180rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #4e8df6;
			}
		}

		.operateContainer {
			width: 96%;
			margin: 100rpx auto 0;
			background-color: #fff;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 14rpx;
			display: flex;

			.iconfont {
				color: blue;
				font-size: 40rpx;
				margin-right: 6rpx;
				font-weight: bold;
			}

			.lawyer,
			.me,
			.submit {
				margin-right: 18rpx;
				background-color: #eee;
				padding: 10rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
			}
		}

		.jobList {
			margin: 20rpx auto 0;
			width: 96%;

			.jobBox {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				margin-bottom: 20rpx;
				background-color: #fff;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

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
		}

		.loadMore {
			text-align: center;
			font-size: 26rpx;
			color: #999;
			margin-top: 16rpx;
		}
	}
</style>
