<template>
	<view class="legalAidContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "法律援助",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},

			};
		}
	}
</script>

<style lang="scss" scoped>
	.legalAidContainer {
		padding-bottom: 50rpx;
	}
</style>
