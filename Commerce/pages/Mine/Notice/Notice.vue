<template>
	<view class="chatContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体 -->
		<view class="mainContaienr">
			<view class="chatBox company" v-for="(item,index) in chatList" :key="index"
				@click="seeDetail(item.cate,item.id)">
				<view class="avatar" :style="{'background-image':'url('+item.img+')'}">
				</view>
				<view class="info">
					<view class="top">
						<view class="name">
							{{item.name}}
						</view>
						<view class="tip">
							{{item.cate == 1?'回复了我的资讯':'投递了简历'}}
						</view>
						<view class="article">
							{{item.title}}
						</view>
					</view>
					<view class="content" v-if="item.cate==1">
						{{item.content}}
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
			</view>
		</view>
		<view class="noData" v-if="chatList.length == 0">
			暂无消息
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "#fff",
					navTitle: "我的消息",
					bgColor: "#36c1ba",
					isShowBackBtn: true,
					backBtnColor: "#fff"
				},
				// 聊天列表
				chatList: [],
			}
		},
		created() {
			this.getLocalMessage()
		},
		computed: {
			newMsg() {
				return this.$store.state.newMsg
			}
		},
		watch: {
			newMsg() {
				this.getLocalMessage()
			}
		},
		beforeDestroy() {
			uni.hideTabBarRedDot({
				index: 4
			})
		},
		methods: {
			// 获取本地消息
			getLocalMessage() {
				if (uni.getStorageSync("msgList")) {
					this.chatList = uni.getStorageSync("msgList")
				} else {
					return
				}
				this.$store.dispatch('setNewMsg', false)
				this.scrollBottom()
			},
			// 页面滚动到底部
			scrollBottom() {
				this.$nextTick(function() {
					setTimeout(() => {
						uni.pageScrollTo({
							scrollTop: 99999,
							duration: 50
						});
					}, 50);
				});
			},
			// 查看详情
			seeDetail(cate, id) {
				if (cate == 1) {
					uni.navigateTo({
						url: '/pages/RealTimeInfo/DetailedInfo/DetailedInfo?infoId=' + id
					});
				} else {
					uni.navigateTo({
						url: `/pages/JobResumeList/JobResumeList?id=${id}`
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.chatContainer {
		padding-bottom: 150rpx;
		background-color: #fff;
		position: relative;
		min-height: 100vh;
		box-sizing: border-box;

		.mainContaienr {
			padding: 20rpx 4%;

			.chatBox {
				display: flex;
				align-items: flex-start;
				padding: 0 0 20rpx;

				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 40rpx;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}

				.info {
					margin-left: 20rpx;
					flex: 1;
					border-bottom: 2rpx solid #eee;
					padding-bottom: 20rpx;

					.top {
						display: flex;
						align-items: center;

						.name {
							font-size: 30rpx;
							font-weight: bold;
						}

						.tip {
							font-size: 26rpx;
							margin: 0 20rpx;
							color: #999;
						}

						.article {
							flex: 1;
							font-size: 26rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
					}

					.content {
						margin-top: 20rpx;
						font-size: 28rpx;
						letter-spacing: 2rpx;
						color: #333;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						display: -moz-box;
						-moz-line-clamp: 2;
						-moz-box-orient: vertical;
						word-wrap: break-word;
						word-break: break-all;
						white-space: normal;
					}

					.time {
						font-size: 20rpx;
						color: #999;
						margin-top: 20rpx;
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
