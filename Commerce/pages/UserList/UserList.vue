<template>
	<view class="UserListContainer">
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
					navTitle: "会员风采",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},

			};
		}
	}
</script>

<style lang="scss" scoped>
	.UserListContainer {
		padding-bottom: 50rpx;
	}
</style>
