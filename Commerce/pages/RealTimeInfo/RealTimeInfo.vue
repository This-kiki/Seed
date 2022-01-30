<template>
	<view>
		<!-- 顶部 -->
		<topBar ref="topBar" :nav="setNav"></topBar>
		<view class="top-nav-bar">
			<view class="top-nav-to">
				<!-- <view class="search"><view class="search-bar" @click="go()">搜索你感兴趣的~~</view></view> -->
				<view style="height: 75rpx;">
					<u-tabs ref="uTabs" :list="items" :current="current" @change="tabsChange"
						:activeStyle="{color: '#36c1ba',fontWeight: 'bold'}" lineColor="#36c1ba"
						itemStyle="min-width: 80px;padding: 0; height: 40px;"></u-tabs>
					<u-line color="#d4d4d4"></u-line>
				</view>
			</view>
			<view style="height: 40px;"></view>
			<swiper :current="swiperCurrent" @animationfinish="animationfinish"
				:style="'height:' + contentHeight + 'px;'">
				<swiper-item class="swiper-item" v-for="(item, index) in items" :key="index">
					<Page :contentHeight="contentHeight" :pageType="item.id"></Page>
				</swiper-item>
			</swiper>
		</view>
		<!-- 发布按钮 -->
		<view class="addBtn" @click="openSubmit()">
			<view class="iconfont icon-tianjia">
			</view>
		</view>
		<!-- 发布 -->
		<uni-popup ref="popup" type="bottom" :mask-click="false">
			<view class="submitContainer">
				<view class="join" v-if="flag==0" @click="goPage('joinPage')&closeSubmit()">
					立即入会 <text class="iconfont icon-xiangyou-copy"></text>
				</view>
				<view class="submitList">
					<view class="common info" @click="goPage('InfoSubmit')&closeSubmit()">
						<image src="../../static/icon/1.png" mode=""></image>
						<text>资讯</text>
					</view>
				</view>
				<view class="close" @click="closeSubmit()">
					<view class="iconfont icon-quxiao">
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Page from '@/pages/RealTimeInfo/info-page/pageInfo.vue';
	import topNavBar from '@/components/info_Com/topNavBar/zzx-tabs.vue';
	export default {
		components: {
			Page,
			topNavBar
		},
		data() {
			return {
				contentHeight: 0,
				setNav: {
					titleColor: '#fff',
					navTitle: '资讯',
					bgColor: '#36c1ba',
					searchUrl: 'info-search/info-search',
					isSearch: true
				},
				// items: ['种子会动态', '会员单位', '会员风采', '家乡新闻', '精选'],
				items: [{
						name: '种子会动态',
						id: 1
					},
					{
						name: '会员风采',
						id: 2
					},
					{
						name: '会员单位',
						id: 3
					},
					{
						name: '家乡新闻',
						id: 4
					},
					{
						name: '普通资讯',
						id: 5
					},
					{
						name: '知识',
						id: 6
					},
					{
						name: '法律常识',
						id: 7
					}
				],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				flag: 0
			};
		},
		onShow() {
			uni.showTabBar()
		},
		mounted() {
			this.getCustom();
			this.checkUser()
		},
		methods: {
			getCustom() {
				uni.getSystemInfo({
					success: e => {
						this.contentHeight = e.safeArea.bottom - 90 - this.$refs.topBar.getheight();
						// console.log(this.contentHeight)
					}
				});
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			go() {
				uni.navigateTo({
					url: 'info-search/info-search'
				});
			},
			setActive(id) {
				this.current = id;
			},

			// tabs通知swiper切换
			tabsChange(item) {
				this.swiperCurrent = item.index;
			},
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.current = current;
			},
			// 跳转页面
			goPage(page) {
				if (page == 'joinPage') {
					uni.navigateTo({
						url: `/pages/Mine/${page}/${page}`
					})
				}
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			},
			// 弹出发布框
			openSubmit() {
				uni.hideTabBar()
				this.$refs.popup.open('bottom')
			},
			// 关闭发布框
			closeSubmit() {
				this.$refs.popup.close('bottom')
				setTimeout(() => {
					uni.showTabBar()
				}, 400)
			},
			// 判断是否为会员
			async checkUser() {
				let res = await this.$api.getUserMsg()
				this.flag = res.data.userBaseInfo.identity
			},
		}
	};
</script>

<style lang="scss" scoped>
	.search {
		width: 100%;
		height: 75rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: text;
		-webkit-user-select: text;

		.search-bar {
			width: 90%;
			height: 60rpx;
			border-radius: 40rpx;
			border: 1rpx solid #f0f0f0;
			background-color: rgb(248, 248, 248);
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding-left: 40rpx;
			padding-bottom: 4rpx;
			color: #adadad;
			font-size: 30rpx;
			font-weight: 500;
			letter-spacing: 3rpx;
		}
	}

	// .scroll {
	// 	height: 641px;
	// }
	.top-nav-to {
		width: 100%;
		position: fixed;
		z-index: 1;
		background-color: rgb(255, 255, 255);
	}

	.topLine {
		border-bottom: 1rpx #eee solid;
		background-color: #fff;
		width: 100%;
		box-shadow: 0 0rpx 1rpx 0rpx rgba(100, 100, 100, 0.1), 0 1rpx 1rpx 0rpx rgba(140, 140, 140, 0.08);
		height: 75rpx;

		.select {
			font-size: 26rpx;
			width: 100%;
			overflow-x: scroll;
			white-space: nowrap;
			height: 75rpx;
			display: flex;
			flex-direction: row;

			.common {
				padding: 0 25rpx;
				text-align: center;
				display: flex;
				// justify-content: space-around;
				flex-direction: column;
				align-items: center;
				height: 75rpx;

				.login-text {
					display: flex;
					align-items: flex-start;
					height: 40rpx;
					margin: 10rpx 0 5rpx 0;
				}

				.login-text-act {
					display: flex;
					align-items: flex-start;
					height: 40rpx;
					color: #ffaa00;
					font-weight: 700;
					margin: 10rpx 0 5rpx 0;
				}

				.login-bot {
					height: 6rpx;
					width: 40rpx;
					border-radius: 10rpx;
					background-color: #ffffff;
				}

				.login-bot-act {
					height: 6rpx;
					width: 40rpx;
					border-radius: 10rpx;
					background-color: #ffaa00;
				}
			}
		}

		.select::-webkit-scrollbar {
			display: none;
		}
	}

	.addBtn {
		position: fixed;
		bottom: 60rpx;
		right: 40rpx;
		height: 100rpx;
		width: 100rpx;
		background-color: #36c1ba;
		border-radius: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

		.iconfont {
			color: #ffff;
			font-size: 60rpx;
			font-weight: bold;
		}
	}

	.submitContainer {
		background-color: #fff;
		width: 100%;
		margin: 0 auto;
		border-radius: 10rpx;
		padding: 60rpx 30rpx 30rpx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;

		.join {
			font-size: 28rpx;
			color: #36c1ba;

			.iconfont {
				font-size: 24rpx;
				margin-left: 10rpx;
			}
		}

		.submitList {
			display: flex;
			padding: 60rpx 0 40rpx;
			border-bottom: 10rpx solid #f8f8f8;

			.common {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 60rpx;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				text {
					font-size: 26rpx;
					letter-spacing: 1rpx;
					margin-top: 12rpx;
				}
			}
		}

		.close {
			padding: 40rpx 0;
			text-align: center;
			color: #999;

			.iconfont {
				font-size: 60rpx;
			}
		}
	}
</style>
