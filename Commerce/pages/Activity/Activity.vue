<template>
	<view>
		<topBar ref="topBar" :nav="setNav"></topBar>
		<!-- <page :contentHeight="contentHeight" :status="0"></page> -->
		<view style="height: 40px;">
			<u-tabs ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="true"
				swiperWidth="750" active-color="#36c1ba" font-size="28"></u-tabs>
			<u-line color="#d4d4d4"></u-line>
		</view>
		<swiper :style="'height:' + contentHeight + 'px;'" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<page :contentHeight="contentHeight" :status='0'></page>
			</swiper-item>
			<swiper-item class="swiper-item">
				<page :contentHeight="contentHeight" :status='1'></page>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import page from '@/pages/Activity/activity-page/activity-page.vue';
	export default {
		components: {
			page
		},
		data() {
			return {
				contentHeight: 0,
				setNav: {
					titleColor: "#fff",
					navTitle: "活动",
					bgColor: "#36c1ba"
				},
				list: [{
						name: '进行中'
					},
					{
						name: '往期活动'
					}
				],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
		mounted() {
			this.getCustom();
		},
		methods: {
			getCustom() {
				// 获取设备信息
				uni.getSystemInfo({
					success: e => {
						this.contentHeight = e.safeArea.bottom - 90 - this.$refs.topBar.getheight()
						console.log(this.contentHeight)
					}
				});
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

<style>
</style>
