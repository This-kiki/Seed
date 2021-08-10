<template>
	<view class="home">
		<view class="info-title">
			{{dataForm.title}}
		</view>
		<view class="info-content" v-html="dataForm.content"></view>
	</view>
</template>

<script>
	export default {
		props:["infoId"],
		data() {
			return {
				dataForm: {}
			}
		},
		mounted() {
			this.getOneInfo()
		},
		methods: {
			getOneInfo() {
				var getAPI = {id: this.infoId}
				this.$api.getOneInfo(getAPI).then((res) => {
					this.dataForm = res.data.Info
				})
			}
		}
	}
</script>

<style>
.home {
	padding: 30rpx 25rpx 0 25rpx;
}
.info-title {
	font-size: 32rpx;
	font-weight: 900;
	margin-bottom: 40rpx;
}
</style>
