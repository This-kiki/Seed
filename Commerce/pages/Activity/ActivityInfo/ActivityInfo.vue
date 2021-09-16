<template>
	<view>
		<view class="act-title">{{ dataForm.name }}</view>
		<view class="bot-num">剩余名额：{{ dataForm.num }}</view>
		<view class="act-content" v-html="dataForm.content"></view>
		<view style="height: 130rpx;"></view>
		<view class="bottom">
			<u-button plain size="mini" shape="circle" class="share" ripple open-type="share" @click="shareAct(dataForm)"><view class="iconfont icon-share"></view></u-button>
			<view class="bot-btn">
				<u-button plain type="success" size="medium" ripple @click="joinActivity" v-if="apply == 0">我要参加</u-button>
				<u-button plain type="primary" size="medium" hover-class="none" v-if="apply == 1">已报名</u-button>
				<u-button plain type="default" size="medium" hover-class="none" v-if="apply == 2">已结束</u-button>
				<u-button plain type="warning" size="medium" hover-class="none" v-if="apply == 3">已满员</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	props: ['activityId'],
	data() {
		return {
			dataForm: {},
			apply: ''
		};
	},
	mounted() {
		this.getAcrivityDetails();
	},
	methods: {
		getAcrivityDetails() {
			var getAPI = { id: this.activityId };
			this.$api.getAcrivityDetails(getAPI).then(res => {
				this.dataForm = res.data.data.acts;
				if (res.data.data.acts.num == 0) {
					this.apply = 3;
				} else {
					if (res.data.data.apply == 1) {
						this.apply = res.data.data.apply;
					} else {
						if (res.data.data.acts.status == 0) {
							this.apply = 0;
						} else {
							this.apply = 2;
						}
					}
				}
				// console.log(res.data.data.acts)
			});
		},
		joinActivity() {
			uni.showLoading();
			var postAPI = { id: this.activityId };
			this.$api.participateActivity(postAPI).then(res => {
				console.log(res);
				uni.hideLoading();
				if (res.data.code == 20000) {
					this.$refs.uToast.show({
						title: '已提交报名，等待管理员审核',
						type: 'success'
					});
				} else if (res.data.code == 2002) {
					this.$refs.uToast.show({
						title: '已报名，请勿重复提交',
						type: 'warning',
						url: '/pages/user/index'
					});
				}
				this.getAcrivityDetails();
			});
		},
		shareAct(actInfo) {
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 1,
				title: actInfo.name
			});
		}
	}
};
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
	background-color: rgb(252, 252, 252);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0rpx;
	width: 100%;
	height: 130rpx;
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
	margin-right: 40rpx;
}
.share {
	margin: 0 50rpx;
}
.icon-share {
	font-size: 35rpx;
	font-weight: 700;
}
</style>
