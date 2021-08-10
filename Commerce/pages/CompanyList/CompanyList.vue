<template>
	<view class="CompanyListContainer">
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
					navTitle: "会员单位",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},

			};
		}
	}
</script>

<style lang="scss">
	.CompanyListContainer {
		padding-bottom: 50rpx;
	}
</style>
