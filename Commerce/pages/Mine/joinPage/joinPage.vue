<template>
	<view>
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<view class="nullpage" v-if="userMsg.apply == 1">
			已提交申请，请等待管理员审核
		</view>
		<view class="m-page-bottom" v-if="userMsg.apply == 0">
			<view class="m-page-title">
				申请入会
			</view>
			<view class="m-page-list">
				<view class="text">
					个人会员
				</view>
				<view class="m-page-listitem" @click="go('../Join/Join')">
					<view class="m-page-listitemtitle">
						<!-- <image class="m-page-listitemimg" src="" mode=""></image> -->
						<span class="iconfont m-page-listitemimg">&#xe619;</span>
						<view class="m-page-listitemtext">申请个人会员</view>
					</view>
					<!-- <image class="m-page-listitemicon" src="" mode=""></image> -->
					<span class="iconfont m-page-listitemicon">&#xe623;</span>
				</view>
				<view style="margin-top: 30rpx;" class="text">
					单位会员
				</view>
				<view class="m-page-listitem" @click="go('../CompanyJoin/CompanyJoin')">
					<view class="m-page-listitemtitle">
						<!-- <image class="m-page-listitemimg" src="" mode=""></image> -->
						<span class="iconfont m-page-listitemimg">&#xe642;</span>
						<view class="m-page-listitemtext">申请单位会员</view>
					</view>
					<!-- <image class="m-page-listitemicon" src="" mode=""></image> -->
					<span class="iconfont m-page-listitemicon">&#xe623;</span>
				</view>
				<view class="m-page-listitem" @click="go('../LawyerJoin/LawyerJoin')">
					<view class="m-page-listitemtitle">
						<!-- <image class="m-page-listitemimg" src="" mode=""></image> -->
						<span class="iconfont m-page-listitemimg">&#xe611;</span>
						<view class="m-page-listitemtext">申请律师</view>
					</view>
					<!-- <image class="m-page-listitemicon" src="" mode=""></image> -->
					<span class="iconfont m-page-listitemicon">&#xe623;</span>
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
					navTitle: "返回",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				userMsg: {},
			};
		},
		mounted() {
			this.getUserInfo()
		},
		methods: {
			go(path) {
				uni.navigateTo({
					url: path
				});
			},
			getUserInfo() {
				this.$api.getUserMsg().then(userMsg_res => {
					console.log('基本信息', userMsg_res.data.userBaseInfo)
					this.$store.commit('setUserMsg', userMsg_res.data.userBaseInfo);
					uni.setStorageSync('identity', userMsg_res.data.userBaseInfo.identity);
					this.userMsg = userMsg_res.data.userBaseInfo
					if (userMsg_res.data.userBaseInfo.apply == 1) {
						setTimeout(function() {
							uni.navigateBack({
								
							})
						}, 2000);
					}
					// this.identity = userMsg_res.data.userBaseInfo.identity
				});
			},
		}
	};
</script>

<style>
	.nullpage {
		height: 80vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 800;
		font-size: 40rpx;
		color: #22C704;
	}
	.m-page-bottom {
		background-color: rgb(239,239,239);
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	
	.m-page-title {
		margin: 80rpx auto;
		font-size: 45rpx;
		font-weight: 700;
	}

	.m-page-list {
		border-radius: 20rpx;
		width: 75%;
		padding: 100rpx 30rpx;
		background-color: rgb(255, 255, 255);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.m-page-listitem {
		width: 100%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid rgb(229, 229, 229);
	}

	.m-page-listitem:active {
		background-color: rgb(247, 247, 247);
	}

	.m-page-listitemtitle {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-left: 50rpx;
	}

	.m-page-listitemimg {
		font-size: 35rpx;
		margin-right: 20rpx;
	}

	.m-page-listitemtext {
		font-size: 28rpx;
		letter-spacing: 5rpx;
	}

	.m-page-listitemicon {
		font-size: 30rpx;
		margin-right: 25rpx;
	}

	.text {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: flex-start;
		align-self: flex-start;
		align-items: center;
		font-weight: 600;
		border-bottom: 1rpx solid rgb(229, 229, 229);
	}
</style>
