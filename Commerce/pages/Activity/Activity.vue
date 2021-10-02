<template>
	<view>
		<topBar ref="topBar" :nav="setNav"></topBar>
		<page :contentHeight="contentHeight"></page>
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
						this.contentHeight = e.safeArea.bottom - 50 - this.$refs.topBar.getheight()
						// console.log(this.$refs.topBar.getheight())
					}
				});
			},
		}
	};
</script>

<style></style>
