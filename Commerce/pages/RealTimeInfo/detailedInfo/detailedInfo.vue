<template>
	<view>
		<view class="info-title">
			{{dataForm.title}}
		</view>
		<view class="info-content" v-html="dataForm.content">
			
		</view>
	</view>
</template>

<script>
	export default {
		props:["infoId"],
		data() {
			return {
				dataForm: null
			}
		},
		mounted() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				var getAPI = {id: this.infoId}
				this.$api.getOneInfo(getAPI).then((res) => {
					this.dataForm = res.data.Info
					// console.log(res.data.Info)
				})
			}
		}
	}
</script>

<style scoped>
.info-title {
	margin: 20rpx 10rpx;
	font-size: 35rpx;
	font-weight: 900;
}
.info-content {
	padding: 20rpx;
}
</style>
