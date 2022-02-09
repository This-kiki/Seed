<template>
	<view class="navbar">
		<loading v-if="loading.show" :text="loading.text" :mask="loading.mask"></loading>
		<view class="header"
			:style="{'height':titleBarHeight,'padding-top':statusBarHeight,'opacity':opacity,'background':nav.bgColor}">
			<view class="header-top">
				<i v-if="nav.isShowBackBtn" class="iconfont icon-fanhui back-btn" @tap="backTo()" :style="{
				color:nav.backBtnColor
				}" />
				<view class="header-title"
					:style="{'color':nav.titleColor,'text-align':nav.titleAlign,'width':nav.titleAlign?'100%':''}">
					{{nav.navTitle}}
				</view>
			</view>
			<view class="search" v-if="nav.isSearch">
				<view class="search-bar" @click="go()">输入关键字</view>
			</view>
		</view>
		<!-- <view :style="{'height':titleBarHeight,'padding-top':statusBarHeight}"></view> -->
		<view :style="'height:'+height+ 'px;'"></view>
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
		components: {
			loading
		},
		data() {
			return {
				statusBarHeight: 0,
				titleBarHeight: 0,
				height: 0
			}
		},
		created() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					if(that.nav.isSearch) {
						if (res.model.indexOf('iPhone') !== -1) {
							that.titleBarHeight = 84 + 'px';
							that.height = res.statusBarHeight + 84
						} else {
							that.titleBarHeight = 88 + 'px';
							that.height = res.statusBarHeight + 88
						}
					}else{
						if (res.model.indexOf('iPhone') !== -1) {
							that.titleBarHeight = 44 + 'px';
							that.height = res.statusBarHeight + 44
						} else {
							that.titleBarHeight = 48 + 'px';
							that.height = res.statusBarHeight + 48
						}
					}
					that.statusBarHeight = res.statusBarHeight + 'px'
				},

			})
		},
		methods: {
			// 回到上一页
			backTo() {
				uni.navigateBack()
			},
			getheight() {
				return this.height
			},
			go() {
				var that = this
				uni.navigateTo({
					url: that.nav.searchUrl
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		box-sizing: content-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		top: 0;
		position: fixed;
		width: 100%;
		z-index: 50;
	}

	.header .header-title {
		font-weight: bold;
		color: #fff;
		// width: 80rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 34rpx;
		margin-top: 20rpx;
	}
	
	.header-title{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-top {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.search {
		box-sizing: border-box;
		// position: fixed;
		width: 100%;
		height: 40px;
		padding: 0 3%;
		background-color: #36c1ba;
		padding-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		z-index: 99;

		.search-bar {
			width: 100%;
			height: 70rpx;
			margin: 0 auto;
			padding: 0 20rpx;
			background-color: #fff;
			border-radius: 14rpx;
			letter-spacing: 1rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgb(128,128,128);
		}
	}

	.yjs_text {
		margin-left: 8rpx;
		font-size: 24rpx;
		font-weight: normal;
	}

	.back-btn {
		margin-top: 20rpx;
		color: #fff;
		padding: 12rpx;
		font-weight: bold;
		position: absolute;
		left: 10rpx;
	}
</style>
