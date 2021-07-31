<template>
	<view class="navbar">
		<loading v-if="loading.show" :text="loading.text" :mask="loading.mask"></loading>
		<view class="header"
			:style="{'height':titleBarHeight,'padding-top':statusBarHeight,'opacity':opacity,'background':nav.bgColor}">
			<i v-if="nav.isShowBackBtn" class="iconfont icon-fanhui back-btn" @tap="backTo()" :style="{
				color:nav.backBtnColor
			}" />
			<view class="header-title" :style="{'color':nav.titleColor}">{{nav.navTitle}}</view>
		</view>
		<view :style="{'height':titleBarHeight,'padding-top':statusBarHeight}"></view>
	</view>
</template>
<script>
	import loading from "./loading.vue"
	export default {
		name: "topBar",
		props: [
			"nav",
			"opacity",
			"loading"
		],
		components:{
			loading
		},
		data() {
			return {
				statusBarHeight: 0,
				titleBarHeight: 0,
			}
		},
		created() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					if (res.model.indexOf('iPhone') !== -1) {
						that.titleBarHeight = 44 + 'px';
					} else {
						that.titleBarHeight = 48 + 'px';
					}
					that.statusBarHeight = res.statusBarHeight + 'px'

				},

			})
		},
		methods: {
			// 回到上一页
			backTo() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.header {
		box-sizing: content-box;
		display: flex;
		padding: 0 20rpx;
		justify-content: flex-start;
		align-items: center;
		top: 0;
		position: fixed;
		width: 100%;
		z-index: 50;
	}

	.header .header-title {
		font-weight: bold;
		color: #fff;
		width: 60%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 36rpx;
	}

	.yjs_text {
		margin-left: 8rpx;
		font-size: 24rpx;
		font-weight: normal;
	}

	.back-btn {
		color: #fff;
		padding: 12rpx;
		font-weight: bold;
	}
</style>
