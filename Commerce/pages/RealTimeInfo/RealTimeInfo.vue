<template>
	<view>
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<view class="top-nav-bar">
			<view style="margin-top: 20upx;"><top-nav-bar :items="items" :current="current" @clickItem="onClickItem" ref="mytabs"></top-nav-bar></view>
			<view style="margin-top: 20upx;color:#999999;font-size: 24upx;height: 260upx;">
				<view v-show="current === 0"><page></page></view>
				<view v-show="current === 1">会员风采</view>
				<view v-show="current === 2">会员单位</view>
				<view v-show="current === 3">家乡新闻</view>
			</view>
		</view>
	</view>
</template>

<script>
import Page from '@/components/info_Com/info-page/info-page.vue';
export default {
	components: {
		Page
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

<style></style>
