<template>
	<view class="detailContainer">
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
					navTitle: "会员详情",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},

				
			};
		}
	}
</script>

<style lang="scss" scoped>
.detailContainer{
	margin-bottom: 50rpx;
}
</style>
