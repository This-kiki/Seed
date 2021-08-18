<template>
	<view>
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<view class="top-nav-bar">
			<view class="top-nav-to">
				<view class="search">
					<view class="search-bar" @click="go()">
						搜索你感兴趣的~~
					</view>
				</view>
				<top-nav-bar :items="items" :current="current" @clickItem="onClickItem" ref="mytabs"></top-nav-bar>
			</view>
			<view style="padding-top: 175rpx;">
				<view v-show="current === 0">
					<page :pageType="0"></page>
				</view>
				<view v-show="current === 1">
					<page :pageType="1"></page>
				</view>
				<view v-show="current === 2">
					<page :pageType="2"></page>
				</view>
				<view v-show="current === 3">
					<page :pageType="3"></page>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Page from '@/pages/RealTimeInfo/info-page/info-page.vue';
import topNavBar from '@/components/info_Com/topNavBar/zzx-tabs.vue'
export default {
	components: {
		Page,
		topNavBar
	},
	data() {
		return {
			setNav: {
				titleColor: 'black',
				navTitle: '资讯',
				bgColor: 'white'
			},
			items: ['种子会动态', '会员单位', '会员风采', '家乡新闻'],
			current: 0
		};
	},
	methods: {
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		},
		go() {
			uni.navigateTo({
				url: 'info-search/info-search'
			});
		}
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
		background-color: rgb(248,248,248);
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
.top-nav-to {
	width: 100%;
	position: fixed;
	z-index: 1;
	background-color: rgb(255,255,255);
}
</style>
