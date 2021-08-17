<template>
	<view class="chatContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 聊天主体 -->
		<view class="mainContaienr">
			<view class="chatBox" v-for="(item,index) in chatList" :key="index" :class="item.flag==1?'user':'company'">
				<view class="avatar" @click="seeUserDetail(toInfo.toOpenid,item.flag)">
					<image :src="item.img" mode=""></image>
				</view>
				<view class="content">
					{{item.content}}
				</view>
			</view>
		</view>
		<!-- 发送框 -->
		<view class="operateContainer">
			<input type="text" v-model="inputValue" />
			<view class="send iconfont icon-submit" @click="sendMessage()">
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
					navTitle: "微聊",
					bgColor: "#ececec",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 聊天列表
				chatList: [],
				inputValue: "",

				// Socket连接状态
				IsOpen: false,
				// SocketTask监听状态
				SocketTask: {},
				// 是否上线
				IsOnline: false,
				// 心跳
				heartTimer: "",
				// 自己的id
				openid: "",
				// 对方的信息
				toInfo: {
					toOpenid: 'test',
					name: "张三",
					img: "https://th.bing.com/th/id/R.7379c1da3d35c4cce3132b6e50831d2d?rik=x6bJ9QmLO%2bfD8w&riu=http%3a%2f%2fimg2.woyaogexing.com%2f2017%2f08%2f21%2fdfb354693dd7a31b!400x400_big.jpg&ehk=8p%2f1vyyl3pssF7Ztu5AT2NOmoZfLV%2bffolvw%2fdz2BjM%3d&risl=&pid=ImgRaw&r=0"
				},
				// 离线记录
				leaveContent: ""
			}
		},
		onLoad(option) {
			if (option.openid) {
				this.toInfo.toOpenid = option.openid
				this.toInfo.name = option.name
				this.toInfo.img = JSON.parse(decodeURIComponent(option.img))
			}
			console.log(this.toInfo.img)
			this.setNav.navTitle = this.toInfo.name
			this.openid = uni.getStorageSync("openid")

			this.getLocalMessage()
			this.getLeaveMessage()
			this.openSocket()
		},
		beforeDestroy() {
			// 关闭
			this.SocketTask.close()
			// 清除心跳
			clearInterval(this.heartTimer)
			this.setLocal()
		},
		methods: {
			// 将本地聊天加入缓存
			setLocal() {
				let chat = []
				if (uni.getStorageSync("chat")) {
					chat = uni.getStorageSync("chat")
				}
				let flag = -1
				chat.forEach((item, i) => {
					if (item.info.toOpenid == this.toInfo.toOpenid)
						flag = i
				})
				console.log("flag", flag)
				let time = new Date()
				let chatItem = {
					info: this.toInfo,
					chatList: this.chatList,
					time: time.toLocaleString()
				}
				if (flag == -1) {
					chat.push(chatItem)
				} else {
					chat[flag] = chatItem
				}
				uni.setStorageSync("chat", chat)
			},
			// 获取本地消息
			getLocalMessage() {
				let chat = []
				if (uni.getStorageSync("chat")) {
					chat = uni.getStorageSync("chat")
				} else {
					return
				}
				let flag = -1
				chat.forEach((item, i) => {
					if (item.info.toOpenid == this.toInfo.toOpenid)
						flag = i
				})
				let localList = []
				if (flag == -1) {
					return
				} else {
					localList = chat[flag].chatList
				}
				localList.forEach((item) => {
					this.chatList.push(item)
					this.scrollBottom()
				})
			},
			// 接受离线消息
			async getLeaveMessage() {
				let res = await this.$api.getLeaveMessage({
					toOpenid: this.toInfo.toOpenid
				})
				console.log(res)
				let leaveList = res.data.ms[0].content.split("*chat*")
				leaveList.forEach((item) => {
					let chat = {
						flag: 2,
						content: item,
						img: this.toInfo.img
					}
					if (item != "") {
						this.chatList.push(chat)
						this.scrollBottom()
					}
				})
				// 接受后删除离线消息
				let data = {
					toOpenid: this.toInfo.toOpenid,
				}
				await this.$api.deleteLeaveMessage(data)
			},
			// 发送消息
			sendMessage() {
				let chat = {
					flag: 1,
					content: this.inputValue,
					img: uni.getStorageSync("seed_userInfo").avatarUrl
				}
				if (this.inputValue != "") {
					this.chatList.push(chat)
					this.SocketTask.send({
						data: `${this.toInfo.toOpenid}:${this.inputValue}`
					})
				}
				this.inputValue = ""
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
			openSocket() {
				// 防止重复连接
				if (this.IsOpen) return
				// 连接
				this.SocketTask = uni.connectSocket({
					url: `wss://hjzpzzh.com/seed/websocket/${this.openid}`,
					complete: () => {}
				});
				if (!this.SocketTask) return;
				// 监听开启
				this.SocketTask.onOpen(() => {
					// 将连接状态设为已连接
					console.log('将连接状态设为已连接');
					this.IsOpen = true
				})
				// 心跳
				let that = this
				this.heartTimer = setInterval(() => {
					that.SocketTask.send({
						data: "heart:ping"
					})
				}, 5000)
				// 监听关闭
				this.SocketTask.onClose(() => {
					console.log('连接已关闭');
					this.IsOpen = false;
					this.SocketTask = false;
					this.IsOnline = false
					clearInterval(this.heartTimer)
					// 清空会话列表
					// 更新未读数提示
				})
				// 监听错误
				this.SocketTask.onError(() => {
					console.log('连接错误');
					this.IsOpen = false;
					this.SocketTask = false;
					this.IsOnline = false
					clearInterval(this.heartTimer)
				})
				// 监听接收信息
				this.SocketTask.onMessage(async (e) => {
					console.log('接收消息', e);
					if (e.data == "leave") {
						this.leaveContent = this.leaveContent + "*chat*" + this.chatList[this.chatList.length -
							1].content
						let data = {
							toOpenid: this.toInfo.toOpenid,
							content: this.leaveContent
						}
						await this.$api.sendLeaveMessage(data)
					} else {
						let message = e.data.split(":")[1]
						let chat = {
							flag: 2,
							content: message,
							img: this.toInfo.img
						}
						this.chatList.push(chat)
						this.scrollBottom()
					}
				})
			},
			// 查看用户详情
			seeUserDetail(id, flag) {
				if (flag == 2)
					uni.navigateTo({
						url: `/pages/UserListDetail/UserListDetail?id=${id}`
					})
				else
					uni.navigateTo({
						url: `/pages/UserListDetail/UserListDetail?id=${this.openid}`
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chatContainer {
		padding-bottom: 150rpx;
		background-color: #ededed;
		position: relative;
		min-height: 100vh;
		box-sizing: border-box;

		.mainContaienr {
			width: 90%;
			margin: 20rpx auto 0;

			.chatBox {
				margin-bottom: 30rpx;
				display: flex;
				align-items: flex-start;

				.avatar {
					width: 80rpx;
					height: 80rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

				.content {
					box-sizing: border-box;
					font-size: 30rpx;
					letter-spacing: 1rpx;
					max-width: 400rpx;
					min-height: 70rpx;
					padding: 20rpx;
					background-color: #fff;
					border-radius: 14rpx;
				}
			}

			.user {
				flex-direction: row-reverse;
				justify-content: flex-start;
				// text-align: right;

				.content {
					background-color: #95ec69;
					margin-right: 20rpx;
				}
			}

			.company {

				.content {
					background-color: #FFFFFF;
					margin-left: 20rpx;
				}

			}
		}

		.operateContainer {
			position: fixed;
			background-color: #f6f7f7;
			width: 100%;
			height: 140rpx;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			box-sizing: border-box;

			input {
				background-color: #fefefe;
				flex: 1;
				margin-right: 20rpx;
				border-radius: 10rpx;
				padding: 0 16rpx;
				font-size: 30rpx;
				letter-spacing: 1rpx;
				height: 90rpx;
				color: #333;
			}

			.send {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 50rpx;
				padding-right: 20rpx;
			}
		}
	}
</style>
