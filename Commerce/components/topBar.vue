<template>
	<view class="navbar">
		<loading v-if="loading.show" :text="loading.text" :mask="loading.mask"></loading>
		<view class="header"
			:style="{'height':titleBarHeight,'padding-top':statusBarHeight,'opacity':opacity,'background':nav.bgColor}">
			<i v-if="nav.isShowBackBtn" class="iconfont icon-fanhui back-btn" @tap="backTo()" :style="{
				color:nav.backBtnColor
			}" />
			<view class="header-title" :style="{'color':nav.titleColor}">{{nav.navTitle}}</view>
			<view class="search" v-if="nav.isSearch">
				<view class="search-bar" @click="go()">输入关键字搜索</view>
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
					if (res.model.indexOf('iPhone') !== -1) {
						that.titleBarHeight = 44 + 'px';
						that.height = res.statusBarHeight + 44
					} else {
						that.titleBarHeight = 48 + 'px';
						that.height = res.statusBarHeight + 48
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
		// width: 80rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 34rpx;
	}

	.search {
		width: 60%;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.search-bar {
			width: 90%;
			height: 45rpx;
			border-radius: 10rpx;
			border: 1rpx solid #f0f0f0;
			background-color: rgb(248, 248, 248);
			display: flex;
			justify-content: center;
			align-items: center;
			color: #adadad;
			font-size: 24rpx;
			font-weight: 500;
			letter-spacing: 3rpx;
		}
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
