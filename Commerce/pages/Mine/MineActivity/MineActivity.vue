<template>
	<view class="body">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<view v-if="!dataList[0]" class="white-bord">您还未参加活动哦，快去参加吧</view>
		<view v-if="dataList[0]" class="act-list">
			<!-- <view class="act-list-item" v-for="(item, index) in dataList" @tap="go(item.actId)">
				<view class="act-title">{{ item.name }}</view>
				<view class="act-state">
					<view class="apply-time">{{ formatMsgTime(item.createTime) }}</view>
					<view>
						<u-tag text="待审核" size="mini" type="primary" :show="item.status == 0" />
						<u-tag text="已通过" size="mini" type="success" :show="item.status == 1" />
						<u-tag text="被驳回" size="mini" type="error" :show="item.status == 2" />
					</view>
				</view>
			</view> -->
			<view v-for="(item, index) in dataList" @click="go(item.actId)" style="width: 100%;">
				<activity-card :options="item"></activity-card>
			</view>
		</view>
	</view>
</template>

<script>
	import activityCard from '../../Activity/activity-card/index.vue'
	export default {
		components: {
			activityCard
		},
		data() {
			return {
				setNav: {
					titleColor: 'black',
					navTitle: '我的活动',
					bgColor: 'white',
					isShowBackBtn: true,
					backBtnColor: 'black'
				},
				dataList: []
			};
		},
		mounted() {
			this.getActivity();
		},
		methods: {
			go(id) {
				uni.navigateTo({
					url: '../../Activity/ActivityInfo/ActivityInfo?activityId=' + id
				});
			},
			getActivity() {
				this.$api.getActivityState().then(res => {
					var resp = res.data.data.act;
					this.dataList = resp;
					// console.log(this.dataList)
				});
			},
			formatMsgTime(timespan) {
				let dateTime = new Date(timespan); // 将传进来的字符串或者毫秒转为标准时间
				let year = dateTime.getFullYear();
				let month = dateTime.getMonth() + 1;
				let day = dateTime.getDate();
				let hour = dateTime.getHours()
				let minute = dateTime.getMinutes()
				let second = dateTime.getSeconds()
				let millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒
				let now = new Date(); // 获取本机当前的时间
				let nowNew = now.getTime(); // 将本机的时间转换为毫秒
				let milliseconds = 0;
				let timeSpanStr;
				milliseconds = nowNew - millisecond;
				if (milliseconds <= 1000 * 60 * 1) {
					// 小于一分钟展示为刚刚
					timeSpanStr = '刚刚';
				} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
					// 大于一分钟小于一小时展示为分钟
					timeSpanStr = Math.round(milliseconds / (1000 * 60)) + ' 分钟前';
				} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
					// 大于一小时小于一天展示为小时
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + ' 小时前';
				} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
					// 大于一天小于十五天展示位天
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + ' 天前';
				} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
					timeSpanStr = month + '-' + day;
				} else {
					timeSpanStr = year + '-' + month + '-' + day;
				}
				return timeSpanStr;
			},
		}
	};
</script>

<style>
	.body {
		min-height: 100vh;
		background-color: rgb(243, 243, 243);
	}

	.act-list {
		background-color: rgb(243, 243, 243);
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.act-list-item {
		background-color: rgb(255, 255, 255);
		padding: 20rpx 0;
		margin: 10rpx 0;
		width: 95%;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0px 0px 3px rgb(234, 234, 234);
	}

	.act-list-item:active {
		background-color: #e9eaec;
	}

	.act-title {
		width: 92%;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-weight: 800;
		color: #484848;
		letter-spacing: 5rpx;
	}

	.apply-time {
		font-size: 25rpx;
		color: #7a7a7a;
	}

	.act-state {
		margin-top: 30rpx;
		width: 92%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
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
