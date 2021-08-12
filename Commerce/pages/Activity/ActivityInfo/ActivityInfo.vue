<template>
	<view>
		<view class="act-title">
			{{dataForm.name}}
		</view>
		<view class="bot-num">
			Remaining Places:{{dataForm.num}}
		</view>
		<view class="act-content" v-html="dataForm.content"></view>
		<view class="bottom">
			<view class="bot-btn" @click="joinActivity">
				PARTICIPATE
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
				num: 'Ê£ÓàÃû¶î£º'
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
					// console.log(res.data.data.acts)
				})
			},
			joinActivity() {
				
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
		/* letter-spacing: 5rpx; */
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
