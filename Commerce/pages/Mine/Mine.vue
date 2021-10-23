<template>
	<view class="body">
		<topBar :nav="setNav"></topBar>
		<view class="m-top" v-if="userMsg.name">
			<view class="m-top-head" :style="{backgroundImage:'url('+userMsg.img+')'}"></view>
			<view class="m-top-name">
				{{ userMsg.name }}
			</view>
			<view class="m-top-idntity">
				{{getIdentity(userMsg.identity)}}
			</view>
		</view>
		<view class="m-top login-box" v-if="!userMsg.name" @tap="getUserProfile">
			<view class="login">
				授权登录
			</view>
			<span class="iconfont login-icon">&#xe623;</span>
		</view>
		<view class="m-bottom">
			<view style="height: 80rpx;"></view>
			<view class="m-bottom-items">
				<view class="m-bottom-item" @click="go('joinPage/joinPage')" v-if="userMsg.identity==0">
					<view class="iconfont m-bottom-item-icon">
						&#xe612;
					</view>
					<view class="m-bottom-item-content">
						加入我们
					</view>
				</view>
				<view class="m-bottom-item" @click="go('Contact/Contact')">
					<view class="iconfont m-bottom-item-icon">
						&#xe634;
					</view>
					<view class="m-bottom-item-content">
						联系我们
					</view>
				</view>
				<view class="m-bottom-item" @click="go('MineActivity/MineActivity')">
					<view class="iconfont m-bottom-item-icon">
						&#xe622;
					</view>
					<view class="m-bottom-item-content">
						我的活动
					</view>
				</view>
				<view class="m-bottom-item" @click="go('/pages/InfoMe/InfoMe')">
					<view class="iconfont m-bottom-item-icon">
						&#xe6c9;
					</view>
					<view class="m-bottom-item-content">
						我的资讯
					</view>
				</view>
				<view class="m-bottom-item" @click="go('MineMsg/MineMsg')">
					<view class="iconfont m-bottom-item-icon">
						&#xe610;
					</view>
					<view class="m-bottom-item-content">
						设置个人资料
					</view>
				</view>
				<view class="m-bottom-item" @click="go('/pages/JobResume/JobResume')" v-if="identity!=3">
					<view class="iconfont m-bottom-item-icon">
						&#xe646;
					</view>
					<view class="m-bottom-item-content">
						我的个人简历
					</view>
				</view>
				<view class="m-bottom-item" @click="go('/pages/JobMe/JobMe')" v-if="identity!=3">
					<view class="iconfont m-bottom-item-icon">
						&#xe606;
					</view>
					<view class="m-bottom-item-content">
						我的求职列表
					</view>
				</view>
				<view class="m-bottom-item" @click="go('/pages/JobHR/JobHR')">
					<view class="iconfont m-bottom-item-icon">
						&#xe65c;
					</view>
					<view class="m-bottom-item-content">
						我的招聘信息
					</view>
				</view>
			</view>
			<view style="height: 100rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				setNav: {
					titleColor: "#fff",
					navTitle: "我的",
					bgColor: "#ffffff"
				},
				userMsg: {},
				identity: 0
			}
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.$api.getUserMsg().then(userMsg_res => {
					// console.log('基本信息', userMsg_res.data.userBaseInfo)
					this.$store.commit('setUserMsg', userMsg_res.data.userBaseInfo);
					uni.setStorageSync('identity', userMsg_res.data.userBaseInfo.identity);
					this.userMsg = userMsg_res.data.userBaseInfo
					this.identity = userMsg_res.data.userBaseInfo.identity
				});
			},
			go(path) {
				uni.navigateTo({
					url: path
				});
			},
			getUserProfile: function(e) {
				let that = this;
				uni.getUserProfile({
					desc: '业务需要',
					success: res => {
						// console.log('seed_userInfo',res);
						uni.setStorage({
							key: 'seed_userInfo',
							data: res.userInfo,
							// success: function() {
							// 	that.userAuthorized();
							// }
						});
						var obj = {
							name: res.userInfo.nickName,
							img: res.userInfo.avatarUrl,
							openId: uni.getStorageSync('openid')
						};
						this.$api.changeUserMsg(obj).then(respo => {
							if (respo.code == 20000) {
								uni.showToast({
									title: '个人信息已同步',
									duration: 2000,
									icon: 'none'
								});
								that.getUserInfo()
							}
						});
						//拿到信息处理业务
						// that.$api.getUserMsg().then(memberMsg_res => {
						// 	console.log('基本信息', memberMsg_res.data.userBaseInfo);
						// 	if (!memberMsg_res.data.userBaseInfo.name && !memberMsg_res.data.userBaseInfo.img) {
						// 		var obj = {
						// 			name: res.userInfo.nickName,
						// 			img: res.userInfo.avatarUrl
						// 		};
						// 		this.$api.changeUserMsg(obj).then(respo => {
						// 			if (respo.code == 20000) {
						// 				uni.showToast({
						// 					title: '个人信息已同步',
						// 					duration: 2000
						// 				});
						// 			}
						// 		});
						// 	}
						// });
					},
					fail: err => {
						console.log('err', err);
					}
				});
			},
			// 跳转页面
			goPage(page) {
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			},
			getIdentity(id) {
				switch (id) {
					case 0:
						return '普通用户';
						break;
					case 1:
						return '会员';
						break;
					case 2:
						return '律师';
						break;
					case 3:
						return '会员单位';
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		min-height: 100vh;
		width: 100vw;
		background-color: rgb(250, 250, 250);

		.m-top {
			background-color: rgb(255, 255, 255);
			display: flex;
			flex-direction: column;
			width: 100%;
			align-items: center;
			justify-content: center;
			height: 500rpx;

			.m-top-head {
				width: 220rpx;
				height: 220rpx;
				border-radius: 200rpx;
				// box-shadow: 0 0 10px rgb(163, 163, 163);
				border: 10rpx solid rgb(234, 234, 234);
				background-repeat: no-repeat;
				background-position: center center;
				background-size: cover;
				ovrflow: hidden;
			}

			.m-top-name {
				font-size: 40rpx;
				font-weight: 1000;
				margin: 30rpx 0;
			}

			.m-top-idntity {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 50rpx;
				padding: 0 20rpx;
				font-size: 26rpx;
				color: rgb(120, 120, 120);
				border-radius: 30rpx;
				font-weight: 600;
				border: 1rpx solid rgb(200, 200, 200);
			}

			.login-box {
				color: rgb(255, 255, 255);

				.login {
					margin: 0 20rpx 0 50rpx;
					font-size: 38rpx;
					font-weight: 700;
				}

				.login-icon {
					font-size: 36rpx;
					font-weight: 700;
				}
			}

			.login-box:active {
				color: #e9ec3d;
			}
		}

		.m-bottom {
			width: 100%;

			.m-bottom-items {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.m-bottom-item {
					width: 100%;
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-bottom: 20rpx;

					.m-bottom-item-icon {
						margin: 0 20rpx 0 60rpx;
						font-size: 45rpx;
						font-weight: bold;
						color: #36c1ba;
					}

					.m-bottom-item-content {
						width: 78%;
						font-size: 35rpx;
						font-weight: 600;
						color: rgb(108, 108, 108);
						padding: 25rpx 30rpx;
						border-bottom: 1rpx solid rgb(195, 195, 195);
					}
				}

				.m-bottom-item:active {
					background-color: rgb(235, 235, 235);
				}
			}
		}
	}
</style>
