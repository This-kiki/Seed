<template>
	<view class="noticeContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 聊天列表 -->
		<view class="chatContainer">
			<view class="chatBox" v-for="item in chatList" :key="item.toOpenid" @longpress="showDelete = true">
				<view class="left" @click="chat(item)">
					<view class="img" :style="{'background-image':'url('+item.img+')'}">
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
				<view class="right" v-if="!showDelete">
					<view class="time">
						{{getLeaveStatus(item.toOpenid).isLeave?getLeaveStatus(item.toOpenid).time:item.time}}
					</view>
				</view>
				<view class="delete" v-if="showDelete" @click="deleteChat(item.toOpenid)">
					删除
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
					titleColor: "#fff",
					navTitle: "微聊",
					bgColor: "#36c1ba",
					isShowBackBtn: true,
					backBtnColor: "#fff"
				},
				// 聊天列表
				chatList: [],
				// 离线列表
				leaveList: [],
				// 聊天用户列表
				chatUsers: [],
				// 离线用户列表
				leaveUsers: [],
				// 显示删除
				showDelete: false
			}
		},
		onShow() {
			this.showDelete = false
			this.chatList = []
			this.leaveList = []
			this.getLocal()
		},
		methods: {
			// 删除聊天记录
			deleteChat(id) {
				let chat = uni.getStorageSync("chat")
				chat.forEach((item, i) => {
					if (item.info.toOpenid == id)
						chat.splice(i, 1)
				})
				uni.setStorageSync("chat", chat)
				this.showDelete = false
				this.chatList = []
				this.leaveList = []
				this.getLocal()
			},
			// 判断离线用户是否为聊天用户
			checkUser() {
				let nowUsers = []
				this.leaveUsers.forEach((item, i) => {
					if (!this.chatUsers.includes(item)) {
						nowUsers.push(item)
					}
				})
				console.log("now", nowUsers)
				this.leaveList.forEach(async item => {
					if (nowUsers.includes(item.openid)) {
						let res = await this.$api.getUserDetail({
							openid: item.openid
						})
						// console.log(res)
						let userInfo = {
							img: "",
							name: "未知用户"
						}
						if (res.code == 20000)
							userInfo = res.data.userDetailInfo
						let chat = {
							toOpenid: item.openid,
							img: userInfo.img,
							name: userInfo.name,
							time: item.time,
							content: item.content
						}
						if (item.content != "")
							this.chatList.push(chat)
					}
				})
			},
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
				// console.log(res)
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
					this.leaveUsers.push(item.toOpenId)
				})
				// console.log(this.leaveList)
				// console.log("chat", this.chatUsers)
				// console.log("leave", this.leaveUsers)
				this.checkUser()
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
						this.chatUsers.push(item.info.toOpenid)
					})
					// console.log(this.chatList)
					this.getLeaveMessage()
				} else {
					this.getLeaveMessage()
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
						background-color: lightblue;
						position: relative;
						background-position: center;
						background-repeat: no-repeat;
						background-size: cover;

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
							width: 300rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
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

				.delete {
					width: 100rpx;
					height: 60rpx;
					background-color: #ff4d4d;
					color: #F1F1F1;
					border-radius: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					letter-spacing: 2rpx;
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
