<template>
	<view class="noticeContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 聊天列表 -->
		<view class="chatContainer">
			<view class="chatBox" v-for="item in chatList" :key="item.toOpenid" @click="chat(item)">
				<view class="left">
					<view class="img">
						<image :src="item.img" mode=""></image>
						<view class="new" v-if="getLeaveStatus(item.toOpenid).isLeave">
							{{getLeaveStatus(item.toOpenid).num}}
						</view>
					</view>
					<view class="info">
						<view class="name">
							{{item.name}}
						</view>
						<view class="content">
							{{getLeaveStatus(item.toOpenid).isLeave?getLeaveStatus(item.toOpenid).content:item.content}}
						</view>
					</view>
				</view>
				<view class="right">
					<view class="time">
						{{getLeaveStatus(item.toOpenid).isLeave?getLeaveStatus(item.toOpenid).time:item.time}}
					</view>
				</view>
			</view>
		</view>
		<view class="noData" v-if="chatList.length==0">
			暂无联系人
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "微聊",
					bgColor: "#ececec",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 聊天列表
				chatList: [],
				// 离线列表
				leaveList: []
			}
		},
		onShow() {
			this.chatList = []
			this.leaveList = []
			this.getLocal()
		},
		methods: {
			// 渲染离线消息
			getLeaveStatus(id) {
				let leave = {}
				this.leaveList.forEach(item => {
					if (id == item.openid)
						leave = item
				})
				return leave
			},
			// 接受离线消息
			async getLeaveMessage() {
				let res = await this.$api.getLeaveMessage()
				console.log(res)
				let leaveData = res.data.ms
				leaveData.forEach(item => {
					let list = item.content.split("*chat*")
					let leave = {}
					leave.isLeave = list.length > 1 ? true : false
					leave.num = list.length - 1
					leave.content = list[list.length - 1]
					leave.time = item.createTime
					leave.openid = item.toOpenId
					this.leaveList.push(leave)
				})
				// console.log(this.leaveList)
			},
			// 获取本地聊天记录
			getLocal() {
				if (uni.getStorageSync("chat")) {
					let localList = uni.getStorageSync("chat")
					localList.forEach((item) => {
						let chat = {
							...item.info,
							time: item.time,
							content: item.chatList[item.chatList.length - 1].content
						}
						this.chatList.push(chat)
					})
					// console.log(this.chatList)
					this.getLeaveMessage()
				} else {
					this.getLeaveMessage()
					return
				}
			},
			// 聊天
			chat(item) {
				let link = encodeURIComponent(JSON.stringify(item.img))
				uni.navigateTo({
					url: `/pages/Chat/Chat?openid=${item.toOpenid}&name=${item.name}&img=${link}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.noticeContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #fefefe;

		.chatContainer {
			width: 92%;
			margin: 0 auto;

			.chatBox {
				padding: 30rpx 0;
				display: flex;
				justify-content: space-between;
				border-bottom: 1rpx #eee solid;

				.left {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 10rpx;
						position: relative;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}

						.new {
							position: absolute;
							top: -10rpx;
							right: -10rpx;
							background-color: #ff504e;
							font-size: 24rpx;
							color: #fff;
							width: 30rpx;
							height: 30rpx;
							border-radius: 15rpx;
							text-align: center;
							line-height: 30rpx;
						}
					}

					.info {
						margin-left: 20rpx;

						.name {
							font-size: 28rpx;
							font-weight: bold;
							color: #333;
						}

						.content {
							font-size: 24rpx;
							margin-top: 4rpx;
							color: #999;
							letter-spacing: 1rpx;
						}
					}
				}

				.right {
					.time {
						font-size: 20rpx;
						letter-spacing: 1rpx;
						color: #999;
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
