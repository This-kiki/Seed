<template>
	<view class="jobContainer">
		<!-- 职场列表 -->
		<view class="jobList">
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
				<view class="need">
					{{item.need}}
				</view>
				<view class="company">
					<view class="name">
						{{item.companyName}}
					</view>
					<view class="num">
						{{item.num}}人
					</view>
				</view>
				<view class="bottom">
					<view class="date">
						{{item.createTime.split(' ')[0]}}
					</view>
					<view class="address">
						{{item.place}}
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
	export default {
		props: ["cate", 'inputValue', "isSearch"],
		data() {
			return {
				// 信息列表
				jobList: [],
				// 页数
				current: 1,
				// 条数
				limit: 10,
			};
		},
		created() {
			this.getJobList()
		},
		methods: {
			// 获取招聘信息列表
			async getJobList() {
				let job = ""
				if (this.isSearch) {
					job = this.inputValue
				}
				if(this.cate==null){
					this.cate = ""
				}
				let data = {
					current: this.current,
					limit: this.limit,
					job,
					companyId: "",
					classfication: this.cate
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

		.jobList {

			.jobBox {
				background-color: #fff;
				padding: 30rpx 4%;
				margin-bottom: 14rpx;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
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
						font-size: 30rpx;
						color: #36c1ba;
					}
				}

				.need {
					margin-top: 16rpx;
					font-size: 22rpx;
					color: #666;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.company {
					font-size: 26rpx;
					margin-top: 10rpx;
					display: flex;
					justify-content: flex-start;

					.name {
						margin-right: 10rpx;
					}
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					margin-top: 16rpx;
					font-size: 22rpx;
					color: #999;
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
