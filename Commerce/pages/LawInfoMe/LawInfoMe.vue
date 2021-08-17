<template>
	<view class="lawContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 法律常识 -->
		<view class="lawList">
			<view class="lawBox" v-for="item in lawList" :key="item.id">
				<view class="title">
					{{item.title}}
					<view class="seeDetail" @click="seeDetail(item.id)">
						查看详情
					</view>
				</view>
				<view class="content">
					{{item.brief}}
				</view>
				<view class="bottom">
					<view class="date">
						{{item.createTime }}
					</view>
					<view class="view">
						<text class="iconfont icon-view"></text>
						{{item.view}}
					</view>
				</view>
				<view class="operate">
					<view class="edit" @click="edit(item)">
						<text class="iconfont icon-xiugai"></text>
						修改
					</view>
					<view class="delete" @click="deleteLaw(item.id)">
						<text class="iconfont icon-shanchu"></text>
						删除
					</view>
				</view>
			</view>
		</view>
		<view class="noData" v-if="lawList.length == 0">
			暂无法律援助
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "我的法律援助",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 常识列表
				lawList: [],
			};
		},
		created() {
			this.getLawInfoMe()
		},
		methods: {
			// 获取自己发布法律常识
			async getLawInfoMe() {
				let res = await this.$api.getLawInfoMe()
				// console.log(res)
				this.lawList = res.data.rows
			},
			// 删除
			async deleteLaw(id) {
				let res = await this.$api.deleteLaw({
					id
				})
				if (res.code == 20000) {
					uni.showToast({
						title: '删除成功'
					})
					this.getLawInfoMe()
				}
			},
			//修改
			edit(item) {
				uni.navigateTo({
					url: `/pages/LawRelease/LawRelease?id=${item.id}&title=${item.title}&brief=${item.brief}`
				})
			},
			// 查看详情
			seeDetail(id) {
				uni.navigateTo({
					url: `/pages/LawInfoDetail/LawInfoDetail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.lawContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.lawList {
			width: 96%;
			margin: 20rpx auto 0;

			.lawBox {
				background-color: #fff;
				padding: 20rpx;
				margin-bottom: 20rpx;
				border-radius: 14rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
				letter-spacing: 1rpx;

				.title {
					font-size: 30rpx;
					font-weight: bold;
					color: #000;
					position: relative;
					margin-left: 20rpx;
					display: flex;
					justify-content: space-between;

					.seeDetail {
						font-size: 24rpx;
						font-weight: normal;
						padding: 6rpx 10rpx;
						border-radius: 10rpx;
						color: #4e8df6;
						border: 1rpx solid #4e8df6;
					}
				}

				.title:before {
					content: "";
					position: absolute;
					width: 8rpx;
					height: 36rpx;
					background-color: lightblue;
					top: 3rpx;
					left: -20rpx;
					border-radius: 5rpx;
				}

				.content {
					margin-top: 20rpx;
					color: #141414;
					font-size: 28rpx;
					word-break: break-all;
					line-height: 48rpx;
				}

				.bottom {
					color: #999;
					font-size: 22rpx;
					padding-top: 16rpx;
					margin-top: 16rpx;
					border-top: 1rpx #ccc solid;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.date {}

					.view {
						display: flex;
						align-items: center;

						.iconfont {
							margin-right: 8rpx;
						}
					}
				}

				.operate {
					margin-top: 20rpx;
					display: flex;
					justify-content: flex-end;

					.edit {
						background-color: #61afef;
						color: #f1f1f1;
						padding: 10rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}

					.delete {
						background-color: #e06c75;
						color: #f1f1f1;
						padding: 10rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}

					.iconfont {
						margin-right: 10rpx;
					}
				}
			}
		}

		.noData {
			margin: 300rpx auto;
			text-align: center;
			color: #999;
		}
	}
</style>
