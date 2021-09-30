<template>
	<view class="activity-card">
		<view class="act-card">
			<view class="act-card-content">
				<view v-if="options.img" class="act-card-imag" :style="'background-image: url('+options.img+');'">
				</view>
				<view v-if="!options.img" class="act-card-imag"
					style="background-image: url(../../../static/img/logo.png);"></view>
				<view class="act-card-text">
					<view class="act-card-title">{{ options.name }}</view>
					<view class="act-card-msg">
						<view class="act-card-quota">名额：{{ options.num }}</view>
					</view>
				</view>
			</view>
			<view class="act-card-bottom">
				<view class="act-card-time">{{ options.createTime.slice(0, 11) }}</view>
				<view class="act-card-state">
					<u-tag text="已满员" class="act-card-statebtn" size="mini" type="warning" :show="options.num == 0" />
					<u-tag text="进行中" class="act-card-statebtn" size="mini" type="success"
						:show="options.status != 1" />
					<u-tag text="已结束" class="act-card-statebtn" size="mini" type="info" :show="options.status == 1" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ActivityCard',
		props: {
			options: {
				type: Object
			}
		},
		data() {
			return {};
		},
		methods: {},
		computed: {
			styleVar() {
				return {
					'--contextWidth': '55%'
				};
			}
		}
	};
</script>

<style scoped>
	.activity-card {
		background-color: rgb(255, 255, 255);
		margin: 20rpx auto 0 auto;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		width: 95%;
		border-radius: 10rpx;
		box-shadow: 0px 0px 3px rgb(234, 234, 234);
	}

	.activity-card:active {
		background-color: #e9eaec;
	}

	.act-card {
		padding: 20rpx 0rpx;
		width: 100%;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
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
		width: 93%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.act-card-imag {
		width: 40%;
		height: 170rpx;
		border-radius: 10rpx;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		ovrflow: hidden;
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
		letter-spacing: 3rpx;
	}

	.act-card-msg {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		font-size: 25rpx;
		color: rgb(174, 174, 174);
	}

	.act-card-bottom {
		margin-top: 15rpx;
		padding: 0 15rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.act-card-time {
		display: flex;
		align-items: center;
		font-size: 25rpx;
		color: rgb(174, 174, 174);
		width: 300rpx;
		height: 100%;
	}

	.act-card-quota {}

	.act-card-statebtn {
		height: 100%;
		margin-left: 10rpx;
	}
</style>
