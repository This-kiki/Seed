<template>
	<view class="body">
		<view class="white-bord">
			您还未参加活动哦，快去参加吧
		</view>
		<view class="act-list">
			<view class="act-list-item" v-for="(item,index) in dataList" @tap="go(item.actId)">
				<view class="act-title">
					{{item.name}}
				</view>
				<view class="act-state">
					<view class="act-atate-icon" :style="'background-color:' + getColor(item.status) + ';'">
						{{item.type}}
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
				dataList: []
			}
		},
		mounted() {
			this.getActivity()
		},
		methods: {
			go(id) {
				uni.navigateTo({
					url: '../../Activity/ActivityInfo/ActivityInfo?activityId='+id,
				});
			},
			getActivity() {
				this.$api.getActivityState().then((res) => {
					console.log(res.data.data)
					var resp = res.data.data.act
					for(var i=0;i<resp.length;i++) {
						if(resp[i].status == 0){
							resp[i].type = '待审核'
						}else if(resp[i].status == 1){
							resp[i].type = '已通过'
						}else if(resp[i].status == 2){
							resp[i].type = '被驳回'
						}
					}
					this.dataList = resp
				})
			},
			getColor(type) {
				if(type == 0){
					return '#79b9b7';
				}else if(type == 1){
					return '#44ce80';
				}else if(type == 2){
					return '#d7da1e';
				}
			}
		}
	}
</script>

<style>
.body {
	min-height: 100vh;
	background-color: rgb(248,248,248);
}
.act-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.act-list-item {
	background-color: rgb(255,255,255);
	border-radius:20rpx;
	padding: 20rpx 0;
	width: 97%;
	margin: 10rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 2rpx solid #d4d4d4;
}
.act-title {
	width: 100%;
	margin-left: 30rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 30rpx;
	font-weight: 800;
	color: #484848;
	letter-spacing: 5rpx;
}
.act-state {
	padding: 0 10rpx;
	margin-top: 30rpx;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	padding: 0 20rpx;
}
.act-atate-icon {
	font-size: 27rpx;
	width: 130rpx;
	height: 40rpx;
	border-radius: 20rpx;
	background-color: rgb(168,166,167);
	color: rgb(255, 220, 220);
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 30rpx;
	letter-spacing: 3rpx;
	padding-bottom: 4rpx;
}
.white-bord {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	font-size: 35rpx;
}
</style>
