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
					navTitle: "招聘详情",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 招聘详情id
				id: 'd85496a3909adee2bb4f9a70025dce6c'

			};
		},
		onLoad(option) {
			if (option)
				this.id = option.id
		},
		created() {
			this.getJobDetail()
		},
		methods: {
			async getJobDetail() {
				let res = await this.$api.getJobDetail({
					id:this.id
				})
				console.log(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detailContainer {
		margin-bottom: 50rpx;
	}
</style>
