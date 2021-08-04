<template>
	<view class="mine-page">
		<view class="m-page">
			<view class="m-page-top">
				<view class="m-page-tag">
					<view class="m-page-t">
						<span class="iconfont m-page-t-point">&#xe62c;</span>
						<view class="m-page-t-text">
							个人资料
						</view>
					</view>
				</view>
				<view class="m-page-headMsg">
					<!-- <image class="m-page-headimg" src="" mode=""></image> -->
					<open-data class="m-page-headimg" type="userAvatarUrl"></open-data>
					<open-data class="m-page-name" type="userNickName"></open-data>
					<!-- <view class="m-page-name"></view> -->
				</view>
				<view class="m-page-join">
					<view class="m-page-jointitle">
						<!-- <image class="m-page-joinimg" src="" mode=""></image> -->
						<span class="iconfont m-page-joinimg">&#xe638;</span>
						<view class="m-page-jointext">
							加入组织享受更多专属权益
						</view>
					</view>
					<view class="m-page-jointile">
						<view class="m-page-jointext">
							立即加入
						</view>
						<span class="iconfont m-page-joinicon">&#xe623;</span>
						<!-- <image class="m-page-joinicon" src="" mode=""></image> -->
					</view>
				</view>
			</view>
			<view class="m-page-middle">
				<view class="m-page-box">
					<!-- <image class="m-page-boximg" src="" mode=""></image> -->
					<span class="iconfont m-page-boximg">&#xe622;</span>
					<view class="m-page-boxtext">
						活动
					</view>
				</view>
				<view class="m-page-box">
					<!-- <image class="m-page-boximg" src="" mode=""></image> -->
					<span class="iconfont m-page-boximg">&#xe601;</span>
					<view class="m-page-boxtext">
						消息
					</view>
				</view>
				<view class="m-page-box">
					<!-- <image class="m-page-boximg" src="" mode=""></image> -->
					<span class="iconfont m-page-boximg">&#xe601;</span>
					<view class="m-page-boxtext">
						消息
					</view>
				</view>
			</view>
			<view class="m-page-bottom">
				<view class="m-page-list">
					<view class="m-page-listitem">
						<view class="m-page-listitemtitle">
							<!-- <image class="m-page-listitemimg" src="" mode=""></image> -->
							<span class="iconfont m-page-listitemimg">&#xe610;</span>
							<view class="m-page-listitemtext">
								个人资料
							</view>
						</view>
						<!-- <image class="m-page-listitemicon" src="" mode=""></image> -->
						<span class="iconfont m-page-listitemicon">&#xe623;</span>
					</view>
					<view class="m-page-listitem">
						<view class="m-page-listitemtitle">
							<!-- <image class="m-page-listitemimg" src="" mode=""></image> -->
							<span class="iconfont m-page-listitemimg">&#xe6c9;</span>
							<view class="m-page-listitemtext">
								投诉建议
							</view>
						</view>
						<!-- <image class="m-page-listitemicon" src="" mode=""></image> -->
						<span class="iconfont m-page-listitemicon">&#xe623;</span>
					</view>
					<view class="m-page-listitem">
						<view class="m-page-listitemtitle">
							<!-- <image class="m-page-listitemimg" src="" mode=""></image> -->
							<span class="iconfont m-page-listitemimg">&#xe639;</span>
							<view class="m-page-listitemtext">
								联系我们
							</view>
						</view>
						<!-- <image class="m-page-listitemicon" src="" mode=""></image> -->
						<span class="iconfont m-page-listitemicon">&#xe623;</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.mine-page {
	
}
.m-page {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.m-page-top {
	width: 100%;
	height: 350rpx;
	background-color: rgb(147,112,219);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.m-page-tag {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	font-size: 25rpx;
	margin-top: 35rpx;
}
.m-page-t {
	padding: 0 10rpx;
	height: 40rpx;
	background-color: rgba(43,40,167,0.5);
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	border-radius: 20rpx 0 0 20rpx;
	/* opacity: 0.8; */
}
.m-page-t-point {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin-right: 10rpx;
	font-size: 15rpx;
	color: rgb(254,167,38);
}
.m-page-t-text {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	font-size: 22rpx;
	color: rgb(255,255,253);
	letter-spacing: 5rpx;
}
.m-page-headMsg {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.m-page-headimg {
	height: 110rpx;
	width: 110rpx;
	border-radius: 60rpx;
	overflow: hidden;
	border: 2rpx solid rgb(255,105,180);
	margin-left: 40rpx;
}
.m-page-name {
	margin-left: 30rpx;
	font-size: 37rpx;
	font-weight: 600;
	font-family: YouYuan;
	letter-spacing: 10rpx;
}
.m-page-join {
	width: 95%;
	height: 55rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-image: linear-gradient(to right, rgb(4,5,10) , rgb(79,79,90));
	border-radius: 15rpx 15rpx 0rpx 0rpx;
	letter-spacing: 6rpx;
}
.m-page-jointitle {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-left: 30rpx;
}
.m-page-joinimg {
	font-size: 28rpx;
	color: rgb(238,215,191);
	margin-right: 15rpx;
}
.m-page-jointext {
	font-size: 25rpx;
	color: rgb(238,215,191);
}
.m-page-jointile {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	padding-right: 10rpx;
}
.m-page-joinicon{
	font-size: 22rpx;
	color: rgb(238,215,191);
}
</style>
