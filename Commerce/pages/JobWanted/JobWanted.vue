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
		</view>
		<!-- 职场列表 -->
		<view class="jobList">
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
						<text>元</text>
					</view>
				</view>
				<view class="right">
					<view class="btn">
						投递
					</view>
					<view class="date">
						{{item.createTime.split(' ')[0]}}
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
		methods: {
			// 获取招聘信息列表
			async getJobList() {
				let data = {
					current: this.current,
					limit: this.limit,
					job: this.inputValue
				}
				let res = await this.$api.getJobList(data)
				// console.log(res)
				let nowList = res.data.list
				this.jobList.push.apply(this.jobList, nowList)
			},
			// 查看招聘信息详情
			seeDetail(id) {
				uni.navigateTo({
					url: `/pages/JobDetail/JobDetail?id=${id}`
				})
			},
			// 搜索工作
			searchJob(){
				this.getJobList()
				console.log(this.inputValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jobContainer {
		padding-bottom: 50rpx;

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
			.searchBtn{
				width: 100rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #4e8df6;
			}
		}

		.jobList {
			margin: 100rpx auto 0;
			width: 94%;

			.jobBox {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 4rpx solid #f1f1f1;

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
						color: orange;
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
						color: orange;
						font-size: 24rpx;
						padding: 6rpx 15rpx;
						border: 2rpx solid orange;
						border-radius: 8rpx;
					}

					.date {
						color: #999;
						font-size: 22rpx;
					}
				}
			}
		}
	}
</style>
