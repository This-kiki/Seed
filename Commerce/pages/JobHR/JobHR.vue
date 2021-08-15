<template>
	<view class="jobContainer">
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
					navTitle: "HR管理",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				
			};
		}
	}
</script>

<style lang="scss">
	.jobContainer{
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;		
	}

</style>
