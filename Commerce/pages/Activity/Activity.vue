<template>
	<view>
		<topBar :nav="setNav"></topBar>
		<page></page>
	</view>
</template>

<script>
import page from '@/components/info_Com/activity-page/activity-page.vue';
export default {
	components: {
		page
	},
	data() {
		return {
			setNav: {
				titleColor: "black",
				navTitle: "活动",
				bgColor: "white"
			},
		};
	},
	methods: {}
};
</script>

<style></style>
