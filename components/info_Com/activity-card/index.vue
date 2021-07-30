<template>
	<view class="activity-card">
	<view class="act-card">
		<view class="act-card-content">
			<img class="act-card-imag" src="/static/hm-news-card/images/img_22726_0_0.png" />
			<view class="act-card-text">
				<view class="act-card-title">
					种子会启动大会种子会启动大会种子会启动大会种子会启动大会种子会启动大会
				</view>
				<view class="act-card-msg">
					<view class="act-card-time">
						2021/05/15开始
					</view>
					<view class="act-card-quota">
						名额：500
					</view>
				</view>
			</view>
		</view>
		<view class="act-card-state">
			<view class="act-card-statebtn">
				已结束
			</view>
		</view>
	</view>
	</view>
</template>

<script>
export default {
	name:'ActivityCard',
	props:{
		dataId: {
		  type: String,
		  default: 'hm-news-card'
		},
		options: {
			type: Object
		}
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style>
.activity-card {
	background-color: rgb(255,255,255);
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	margin-bottom: 15rpx;
	box-shadow: 0px -1px 3px rgba(212, 212, 212, 0.3);
}
.act-card {
	padding: 20rpx 0rpx;
	width: 100%;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	box-shadow: 0px 1px 3px rgba(212, 212, 212, 0.3);
}
.act-card-content {
	padding: 0 10rpx;
	width: 95%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.act-card-state {
	padding: 0 10rpx;
	margin-top: 15rpx;
	width: 95%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	padding: 0 20rpx;
}
.act-card-imag {
	width: 40%;
	height: 170rpx;
	overflow: hidden;
}
.act-card-text {
	margin-left: 30rpx;
	width: 55%;
	height: 150rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.act-card-title {
	font-size: 32rpx;
	font-weight: 600;
	word-break: break-all;
	text-overflow: ellipsis;
	display: -webkit-box; 
	-webkit-box-orient: vertical; 
	-webkit-line-clamp: 2; 
	overflow: hidden; 
}
.act-card-msg {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 25rpx;
	color: rgb(174,174,174);
}
.act-card-time {}
.act-card-quota {}
.act-card-statebtn {
	font-size: 27rpx;
	width: 150rpx;
	height: 55rpx;
	border-radius: 20rpx;
	background-color: rgb(168,166,167);
	color: rgb(243,237,239);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
