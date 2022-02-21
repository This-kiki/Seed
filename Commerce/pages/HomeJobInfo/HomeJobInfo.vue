<template>
	<view class="jobContainer">
		<scroll-view class="jobList" :style="{'height':height+'px'}" scroll-y="true" refresher-enabled="true"
			:refresher-triggered="loading" @refresherrefresh="refresh" @scrolltolower="loadMore">
			<slot slot="content" class="jobList">
				<view class="jobBox" v-for="item in jobList" :key="item.id" @click="seeDetail(item.id)">
					<view class="top">
						<view class="title">
							{{item.job}}
							<text class="category">{{getCate(item.classfication)}}</text>
						</view>
						<view class="money">
							{{item.reward}}
						</view>
					</view>
					<view class="words">
						<view class="item" v-if="item.experience">
							{{item.experience}}
						</view>
						<view class="item" v-if="item.education">
							{{item.education}}
						</view>
						<view class="item" v-if="item.num">
							{{item.num+"人"}}
						</view>
						<view class="brief">
							<view class="item" v-for="(i,index) in item.brief.slice(0,3)" :key="index">
								{{i}}
							</view>
						</view>
					</view>
					<view class="need">
						{{item.need}}
					</view>
					<view class="bottom">
						<view class="company">
							<view class="img" :style="{'backgroundImage':`url(${item.companyImag})`}">
							</view>
							<view class="name">
								{{item.companyName?item.companyName:"个人招聘"}}
							</view>
						</view>
						<view class="address">
							{{item.place}}
						</view>
					</view>
				</view>
				<view v-if="loadmore" class="loadMore" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-show="springback" class="loadMore">已经到底啦~~</view>
				<view class="noData" v-if="!jobList.length">
					暂无招聘信息
				</view>
			</slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: ["height"],
		data() {
			return {
				// 信息列表
				jobList: [],
				// 页数
				current: 1,
				// 条数
				limit: 10,
				loading: false,
				loadmore: true,
				loadmoreText: "加载更多",
				springback: false
			};
		},

		created() {
			this.getJobList()
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
			// 获取招聘信息列表
			async getJobList() {
				let data = {
					current: this.current,
					limit: this.limit,
					job: '',
					companyId: "",
					classfication: '',
					openid: ''
				}
				let res = await this.$api.getJobList(data)
				let nowList = res.data.list
				nowList.forEach(item => {
					let brief = []
					let arr = item.brief.split(" ")
					arr.forEach(ele => {
						if (ele) {
							brief.push(ele)
						}
					})
					item.brief = brief
				})
				if (nowList.length == 0) {
					this.loadmore = false
					this.springback = true
					setTimeout(() => {
						this.springback = false
					}, 800)
					if (this.isSearch && this.current == 1) {
						uni.showToast({
							icon: "none",
							title: "搜索结果为空"
						})
						setTimeout(() => {
							this.$parent.backTo()
						}, 1000)
					}
				} else {
					this.jobList.push.apply(this.jobList, nowList)
				}
				setTimeout(() => {
					this.loading = false
				}, 300)
			},
			// 查看招聘信息详情
			seeDetail(id) {
				uni.navigateTo({
					url: `/pages/JobDetail/JobDetail?id=${id}`
				})
			},
			// 获取类别
			getCate(id) {
				switch (id) {
					case 0:
						return "兼职";
					case 1:
						return "实习";
					case 2:
						return "校招";
					case 3:
						return "社招";
				}
			}
		}
	}
</script>

<style lang="scss">
	.jobContainer {
		background-color: #f5f5f5;
		user-select: text;
		-webkit-user-select: text;

		.jobList {
			width: 94%;
			margin: 0 auto;

			.jobBox {
				background-color: #fff;
				padding: 36rpx 4% 26rpx;
				margin-bottom: 20rpx;
				border-radius: 4rpx;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						display: flex;
						align-items: center;
						font-size: 32rpx;
						font-weight: bold;

						.category {
							font-size: 24rpx;
							color: #d17846;
							padding: 1rpx;
							border: 1rpx solid #d17846;
							border-radius: 6rpx;
							margin-left: 10rpx;
						}
					}

					.money {
						font-size: 32rpx;
						color: #36c1ba;
					}
				}

				.words {
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;

					.item {
						font-size: 24rpx;
						background-color: #eee;
						margin: 0 10rpx 10rpx 0;
						padding: 4rpx 10rpx;
						border-radius: 8rpx;
					}

					.brief {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
					}
				}

				.need {
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #666;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					font-size: 24rpx;
					color: #999;
					box-sizing: border-box;

					.company {
						display: flex;
						align-items: center;
						margin-right: 20rpx;

						.img {
							width: 60rpx;
							height: 60rpx;
							border-radius: 30rpx;
							background-position: center;
							background-repeat: no-repeat;
							background-size: cover;
							border: 1rpx #eee solid;
						}

						.name {
							margin-left: 18rpx;
							color: #000;
							font-size: 26rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
					}

					.address {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
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

		.noData {
			margin: 300rpx auto;
			text-align: center;
			color: #999;
		}
	}
</style>
