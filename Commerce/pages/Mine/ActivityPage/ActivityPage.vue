<template>
	<view class="homeInfoContainer">
		<!-- 顶部 -->
		<view v-if="!dataList[0]" style="padding-top: 500rpx;">
			<u-empty text="暂无活动" mode="list" v-if="!list[0]"></u-empty>
		</view>

		<scroll-view v-if="dataList[0]" class="infoList" :style="{'height':height+'px'}" scroll-y="true"
			refresher-enabled="true" :refresher-triggered="loading" @refresherrefresh="refresh"
			@scrolltolower="loadMore">
			<slot slot="content" class="infoList">
				<view class="infoBox" v-for="item in dataList" :key="item.id" @click="go(item.actId)">
					<activity-card :options="item"></activity-card>
					<view class="operate">
					</view>
				</view>
				<view v-if="loadmore" class="loadMore" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-show="springback" class="loadMore">已经到底啦~~</view>
			</slot>
		</scroll-view>

		<!-- 		<scroll-view v-if="dataList[0]" class="act-list" scroll-y="true"
			refresher-enabled="true" :refresher-triggered="loading" @refresherrefresh="refresh"
			@scrolltolower="loadMore">
			<slot slot="content" class="act-list">
				<view v-for="(item, index) in dataList" @click="go(item.actId)" style="width: 100%;">
					<activity-card :options="item"></activity-card>
				</view>
				<view v-if="loadmore" class="loadMore" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-show="springback" class="loadMore">已经到底啦~~</view>
			</slot>
		</scroll-view> -->
	</view>
</template>

<script>
	import activityCard from '../../Activity/activity-card/index.vue'
	export default {
		props: ['status', 'height'],
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
				dataList: [],
				current: 1,
				loading: false,
				loadmore: true,
				loadmoreText: "加载更多",
				springback: false
			};
		},
		mounted() {
			// this.height = uni.getStorageSync('height')
			this.getActivity();
		},
		methods: {
			refresh() {
				this.loading = true
				this.current = 1
				this.dataList = []
				this.springback = false
				this.loadmore = true
				this.loadmoreText = "加载更多"
				this.getActivity()
				console.log('高度')
			},
			loadMore() {
				this.current++
				this.loadmoreText = "正在加载中"
				this.getActivity()
			},
			go(id) {
				uni.navigateTo({
					url: '../../Activity/ActivityInfo/ActivityInfo?activityId=' + id
				});
			},
			getActivity() {
				let data = {
					current: this.current,
					limit: 10,
					status: this.status
				}
				this.$api.getActivityState(data).then(res => {
					var resp = res.data.data.act;
					let list = resp;
					if (list.length == 0) {
						this.loadmore = false
						this.springback = true
						setTimeout(() => {
							this.springback = false
						}, 800)
					} else {
						this.dataList.push.apply(this.dataList, list)
					}
					setTimeout(() => {
						this.loading = false
					}, 300)
				});
			},
			formatMsgTime(timespan) {
				var time = timespan.replace(new RegExp(/-/gm), "/");
				var dateTime = new Date(time); // 将传进来的字符串或者毫秒转为标准时间
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

<style lang="scss">
	/* 	.body {
		min-height: 100%;
		background-color: rgb(243, 243, 243);
	}

	.act-list {
		margin: 0rpx auto;
		min-height: 100%;
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


	.loadMore {
		width: 100%;
		text-align: center;
		height: 80rpx;
		font-size: 25rpx;
		letter-spacing: 5rpx;
		color: rgb(175, 175, 175);
		margin-top: 30rpx;
	} */
	.homeInfoContainer {
		overflow-y: scroll;
		user-select: text;
		-webkit-user-select: text;

		.white-bord {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100vw;
			height: 100vh;
			font-size: 35rpx;
		}

		.infoList {
			margin: 0rpx auto;
			background-color: #f5f5f5;

			.loadMore {
				width: 100%;
				text-align: center;
				height: 80rpx;
				font-size: 25rpx;
				letter-spacing: 5rpx;
				color: rgb(175, 175, 175);
				margin-top: 30rpx;
			}
		}
	}
</style>
