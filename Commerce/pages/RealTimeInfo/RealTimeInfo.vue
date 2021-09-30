<template>
	<view>
		<!-- 顶部 -->
		<topBar ref="topBar" :nav="setNav"></topBar>
		<view class="top-nav-bar">
			<view class="top-nav-to">
				<!-- <view class="search"><view class="search-bar" @click="go()">搜索你感兴趣的~~</view></view> -->
				<view style="height: 75rpx;">
					<u-tabs-swiper
						ref="uTabs"
						:list="items"
						:current="current"
						@change="tabsChange"
						:is-scroll="true"
						swiperWidth="750"
						active-color="#36c1ba"
						font-size="28"
					></u-tabs-swiper>
					<u-line color="#d4d4d4"></u-line>
				</view>
			</view>
			<view style="height: 47px;"></view>
			<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" :style="'height:' + contentHeight + 'px;'">
				<swiper-item class="swiper-item" v-for="(item, index) in items">
					<Page :contentHeight="contentHeight" :pageType="item.id"></Page>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import Page from '@/pages/RealTimeInfo/info-page/pageInfo.vue';
import topNavBar from '@/components/info_Com/topNavBar/zzx-tabs.vue';
export default {
	components: {
		Page,
		topNavBar
	},
	data() {
		return {
			contentHeight: 0,
			setNav: {
				titleColor: '#fff',
				navTitle: '资讯',
				bgColor: '#36c1ba',
				searchUrl: 'info-search/info-search',
				isSearch: true
			},
			// items: ['种子会动态', '会员单位', '会员风采', '家乡新闻', '精选'],
			items: [
				{
					name: '种子会动态',
					id: 0
				},
				{
					name: '会员单位',
					id: 1
				},
				{
					name: '会员风采',
					id: 2
				},
				{
					name: '家乡新闻',
					id: 3
				},
				{
					name: '精选',
					id: 4
				}
			],
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0 // swiper组件的current值，表示当前那个swiper-item是活动的
		};
	},
	mounted() {
		this.getCustom();
	},
	methods: {
		getCustom() {
			console.log(this.contentHeight)
			// console.log(e.safeArea.bottom - 133 -this.$refs.topBar.getheight());
			// 获取设备信息
			uni.getSystemInfo({
				success: e => {
					this.contentHeight = e.safeArea.bottom - 97 - this.$refs.topBar.getheight();
					console.log(this.contentHeight)
				}
			});
		},
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		go() {
			uni.navigateTo({
				url: 'info-search/info-search'
			});
		},
		setActive(id) {
			this.current = id;
		},

		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
	}
};
</script>

<style lang="scss" scoped>
.search {
	width: 100%;
	height: 75rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.search-bar {
		width: 90%;
		height: 60rpx;
		border-radius: 40rpx;
		border: 1rpx solid #f0f0f0;
		background-color: rgb(248, 248, 248);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 40rpx;
		padding-bottom: 4rpx;
		color: #adadad;
		font-size: 30rpx;
		font-weight: 500;
		letter-spacing: 3rpx;
	}
}
// .scroll {
// 	height: 641px;
// }
.top-nav-to {
	width: 100%;
	position: fixed;
	z-index: 1;
	background-color: rgb(255, 255, 255);
}
.topLine {
	border-bottom: 1rpx #eee solid;
	background-color: #fff;
	width: 100%;
	box-shadow: 0 0rpx 1rpx 0rpx rgba(100, 100, 100, 0.1), 0 1rpx 1rpx 0rpx rgba(140, 140, 140, 0.08);
	height: 75rpx;

	.select {
		font-size: 26rpx;
		width: 100%;
		overflow-x: scroll;
		white-space: nowrap;
		height: 75rpx;
		display: flex;
		flex-direction: row;

		.common {
			padding: 0 25rpx;
			text-align: center;
			display: flex;
			// justify-content: space-around;
			flex-direction: column;
			align-items: center;
			height: 75rpx;

			.login-text {
				display: flex;
				align-items: flex-start;
				height: 40rpx;
				margin: 10rpx 0 5rpx 0;
			}
			.login-text-act {
				display: flex;
				align-items: flex-start;
				height: 40rpx;
				color: #ffaa00;
				font-weight: 700;
				margin: 10rpx 0 5rpx 0;
			}

			.login-bot {
				height: 6rpx;
				width: 40rpx;
				border-radius: 10rpx;
				background-color: #ffffff;
			}
			.login-bot-act {
				height: 6rpx;
				width: 40rpx;
				border-radius: 10rpx;
				background-color: #ffaa00;
			}
		}
	}
	.select::-webkit-scrollbar {
		display: none;
	}
}
</style>
