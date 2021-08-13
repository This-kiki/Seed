<template>
	<view>
		<view class="act-list">
			<view class="act-list-item" v-for="(item,index) in dataList">
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
			getActivity() {
				this.$api.getActivityState().then((res) => {
					var resp = res.data.data.acts
					for(var i=0;i<resp.length;i++) {
						if(resp[i].status == 0){
							resp[i].type = '未审核'
						}else if(resp[i].status == 1){
							resp[i].type = '已通过'
						}else if(resp[i].status == 2){
							resp[i].type = '被驳回'
						}
					}
					this.dataList = res.data.data.acts
				})
			},
			getColor(type) {
				if(type == 0){
					return '#808080';
				}else if(type == 1){
					return '#3CB371';
				}else if(type == 2){
					return '#DAA520';
				}
			}
		}
	}
</script>

<style>
.act-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.act-list-item {
	border-radius:20rpx;
	padding: 20rpx 0;
	width: 95%;
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
	color: rgb(218, 213, 215);
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 30rpx;
	letter-spacing: 3rpx;
}
</style>
