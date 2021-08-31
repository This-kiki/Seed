<template>
	<view>
		<view class="act-title">
			{{dataForm.name}}
		</view>
		<view class="bot-num">
			剩余名额：{{dataForm.num}}
		</view>
		<view class="act-content" v-html="dataForm.content"></view>
		<view class="bottom">
			<view class="bot-btn" @click="joinActivity" v-if="apply==0">
				<!-- PARTICIPATE -->
				我要参加
			</view>
			<view class="bot-btn" style="background-color: #b8b800;" v-if="apply==1">
				<!-- PARTICIPATE -->
				已报名
			</view>
			<view class="bot-btn" style="background-color: #8f8f8f;" v-if="apply==2">
				<!-- PARTICIPATE -->
				已结束
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["activityId"],
		data() {
			return {
				dataForm: {},
				apply: ''
			}
		},
		mounted() {
			this.getAcrivityDetails()
		},
		methods: {
			getAcrivityDetails() {
				var getAPI = {id: this.activityId}
				this.$api.getAcrivityDetails(getAPI).then((res) => {
					this.dataForm = res.data.data.acts
					if(res.data.data.apply == 1){
						this.apply = res.data.data.apply
					}else {
						if(res.data.data.acts.status == 0){
							this.apply = 0
						}else {
							this.apply = 2
						}
					}
					// console.log(res.data.data.acts)
				})
			},
			joinActivity() {
				uni.showLoading();
				var postAPI = {id: this.activityId}
				this.$api.participateActivity(postAPI).then((res) => {
					console.log(res)
					uni.hideLoading()
					if(res.data.code == 20000) {
						uni.showToast({
							title: '已提交报名，等待管理员审核',
							duration: 2000,
							icon: 'none'
						});
					}else if(res.data.code == 2002){
						uni.showToast({
							title: '已报名，请勿重复提交',
							duration: 2000,
							icon: 'none'
						});
					}
					this.getAcrivityDetails()
				})
			}
		}
	}
</script>

<style scoped>
	.act-title {
		margin: 20rpx 10rpx;
		font-size: 35rpx;
		font-weight: 900;
	}
	.act-content {
		padding: 20rpx;
	}
	.bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		height: 150rpx;
		border-top: 2rpx solid #cccccc;
		z-index: 1;
	}
	.bot-num {
		display: flex;
		justify-content: flex-end;
		font-size: 27rpx;
		font-weight: 600;
		color: #8b8b8b;
		margin-right: 50rpx;
		letter-spacing: 5rpx;
	}
	.bot-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 250rpx;
		height: 80rpx;
		border-radius: 60rpx;
		background-color: #4CD964;
		border: 2rpx solid #dee733;
		margin-right: 40rpx;
	}
</style>
