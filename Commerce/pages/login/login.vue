<template>
	<view class="container">
		<!-- 登录后使用open-data -->
		<view class="userinfo">
			<!-- 登录组件 https://developers.weixin.qq.com/miniprogram/dev/api/wx.getUserInfo.html -->
			<view class="msg">
				<open-data class="headimg" type="userAvatarUrl"></open-data>
				<open-data class="name" type="userNickName"></open-data>
			</view>
			<button class="loginbtn" v-if="!hasUserInfo" @tap="getUserProfile">授权登录</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hasUserInfo: true, //是否授权登录
			userInfo: null
		};
	},

	onLoad() {
		// 页面加载时使用用户授权逻辑，弹出确认的框
		this.userAuthorized()
	},
	methods: {
		getUserProfile: function(e) {
			let that = this
			uni.getUserProfile({
				desc: '业务需要',
				success: res => {
					// console.log('seed_userInfo',res);
					uni.setStorage({
					    key: 'seed_userInfo',
					    data: res.userInfo,
					    success: function () {
							that.userAuthorized()
					    }
					});
					//拿到信息处理业务
				},
				fail: err => {
					console.log('err', err);
				}
			});
		},
		userAuthorized() {
			let that = this;
			const UserInfo = uni.getStorageSync('seed_userInfo');
			if (UserInfo) {
				console.log('userInfo',UserInfo)
				this.hasUserInfo = true
				//小程序通过uni.login()获取code
				uni.login({
					success: function(login_res) {
						console.log('login_res',login_res)
						uni.request({
							url: 'http://47.116.130.99:21587/seed/user/getOpenid',
							method: 'POST',
							header: {
								'content-type': 'application/json'
							},
							data: JSON.stringify({
								code: login_res.code //临时登录凭证
							}),
							success: function(openId_res) {
								// 全局存储
								console.log('return openID:', openId_res.data);
								that.$store.dispatch('setOpenid', openId_res.data.data.openid).then(() => {
									// console.log('openid存储成功')
									that.$api.getUserMsg().then(userMsg_res => {
										// console.log('基本信息',userMsg_res.data.userBaseInfo)
										that.$store.commit('setUserMsg', userMsg_res.data.userBaseInfo);
										uni.setStorageSync('openid', openId_res.data.data.openid);
										uni.setStorageSync('identity', userMsg_res.data.userBaseInfo.identity);
									});
								});
								uni.reLaunch({ url: '/pages/HomePage/HomePage' });
							},
							fail: function(error) {
								//调用服务端登录接口失败
								console.log(error);
							}
						});
					},
					fail(error) {
						console.log('login error', error);
					}
				});
			} else {
				this.hasUserInfo = false
			}
		}
	}
};
</script>

<style lang="less">
.container {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.userinfo {
		height: 90vh;
		position: relative;
		top: -10vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		.loginbtn {
			width: 400rpx;
			height: 70rpx;
			background-color: #4CD964;
			border: 2rpx solid #aaaaff;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 600;
			color: #ffffff;
			letter-spacing: 10rpx;
		}
		.msg {
			margin: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			.headimg {
				height: 150rpx;
				width: 150rpx;
				border-radius: 80rpx;
				overflow: hidden;
				margin-bottom: 40rpx;
			}
			.name {
				font-weight: 34rpx;
				font-weight: 800;
				color: #787878;
			}
		}
	}
}
</style>
