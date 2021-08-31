<template>
	<view>
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<view class="m-page-bottom">
			<view class="m-page-list">
				<view class="text" style="margin-left: 60rpx;">
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
				<view style="margin-top: 30rpx;margin-left: 60rpx;" class="text">
					会员单位
				</view>
				<view class="m-page-listitem" @click="go('../CompanyJoin/CompanyJoin')">
					<view class="m-page-listitemtitle">
						<!-- <image class="m-page-listitemimg" src="" mode=""></image> -->
						<span class="iconfont m-page-listitemimg">&#xe642;</span>
						<view class="m-page-listitemtext">申请会员单位</view>
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
					navTitle: "申请入会",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
			};
		},
		methods: {
			go(path) {
				uni.navigateTo({
					url: path
				});
			}
		}
	};
</script>

<style>
	.m-page-bottom {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.m-page-list {
		width: 100%;
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
		align-items: center;
		font-weight: 600;
		border-bottom: 1rpx solid rgb(229, 229, 229);
	}
</style>
