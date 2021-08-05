<template>
	<view>
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<view class="top-nav-bar">
			<view class="top-nav-to">
				<top-nav-bar :items="items" :current="current" @clickItem="onClickItem" ref="mytabs"></top-nav-bar>
			</view>
			<view style="padding-top: 100rpx;">
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
import Page from '@/components/info_Com/info-page/info-page.vue';
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
		}
	}
};
</script>

<style>
.top-nav-to {
	width: 100%;
	position: fixed;
	padding-top: 20rpx;
	z-index: 1;
	background-color: rgb(255,255,255);
}
</style>
