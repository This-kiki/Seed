<template>
	<view class="homeInfoContainer">
		<scroll-view class="infoList" :style="{'height':height+'px'}" scroll-y="true" refresher-enabled="true"
			:refresher-triggered="loading" @refresherrefresh="refresh" @scrolltolower="loadMore">
			<slot slot="content" class="infoList">
				<view class="infoBox" v-for="item in topList" :key="item.id" @click="infoDetail(item.id)">
					<news-card :item="item" :ref="item.id"></news-card>
				</view>
				<view v-if="loadmore" class="loadMore" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-show="springback" class="loadMore">已经到底啦~~</view>
			</slot>
		</scroll-view>
		<u-popup v-model="dialog" height="100" mode="bottom" border-radius="15">
			<button open-type="share" class="share" @click="shareInfo">
				<view class="iconfont share-icon">
					&#xe63f;
				</view>
				<view class="share-content">
					分享
				</view>
			</button>
		</u-popup>
	</view>
</template>

<script>
	import newsCard from '@/pages/RealTimeInfo/infoCard/index.vue';
	export default {
		props: ['height'],
		components: {
			newsCard
		},
		data() {
			return {
				topList: [],
				infoList: [],
				current: 1,
				loading: false,
				loadmore: true,
				loadmoreText: "加载更多",
				springback: false,

				dialog: false,
				shareId: ''
			};
		},
		created() {
			this.getTopHomeInfo()
		},
		methods: {
			shareInfo() {
				var getAPI = {
					id: this.shareId
				}
				this.$api.getOneInfo(getAPI).then((res) => {
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						type: 1,
						title: res.data.info.title,
						summary: res.data.info.simpleContent,
					});
				})
				this.dialog = false
			},
			dialogFather(id) {
				this.shareId = id
				this.dialog = true
			},
			refresh() {
				this.loading = true
				this.current = 1
				this.topList = []
				this.springback = false
				this.loadmore = true
				this.loadmoreText = "加载更多"
				this.getTopHomeInfo()
			},
			loadMore() {
				this.current++
				this.loadmoreText = "正在加载中"
				this.getAllHomeInfo()
			},
			// 获取置顶资讯
			async getTopHomeInfo() {
				let res = await this.$api.getTopHomeInfo()
				// console.log(res)
				let list = res.data.AllDynamic
				// this.topList.push.apply(this.topList,list);
				this.topList = list
				this.topList.forEach(item => {
					item.isTop = true
					if (item.imag != '')
						// item.imag = JSON.parse(item.imag)
						if (item.imag.length > 1) {
							item.isImg = true
						}
				})
				this.getAllHomeInfo()
			},
			// 获取所有资讯列表
			async getAllHomeInfo() {
				let res = await this.$api.getAllHomeInfo({
					current: this.current
				})
				// console.log(res)
				let list = res.data.AllDynamic
				if (list.length == 0) {
					this.loadmore = false
					this.springback = true
					setTimeout(() => {
						this.springback = false
					}, 800)
				} else {
					list.forEach(item => {
						if (item.imag != '')
							// item.imag = JSON.parse(item.imag)
							if (item.imag.length > 1) {
								item.isImg = true
							}
					})
					this.topList.push.apply(this.topList, list);
				}
				setTimeout(() => {
					this.loading = false
				}, 300)
			},
			// 咨询详情
			infoDetail(id) {
				uni.navigateTo({
					url: '/pages/RealTimeInfo/DetailedInfo/DetailedInfo?infoId=' + id
				});
			},
		}
	}
</script>

<style lang="scss">
	.homeInfoContainer {

		.infoList {
			margin: 0rpx auto;
			background-color: #f5f5f5;
		}

		.loadMore {
			width: 100%;
			text-align: center;
			height: 80rpx;
			font-size: 25rpx;
			letter-spacing: 5rpx;
			color: rgb(175, 175, 175);
			margin-top: 30rpx;
		}

		.share {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 100%;
			width: 100%;
			border: 0 !important;
			outline: none;
			background-color: rgb(255, 255, 255);

			.share-icon {
				font-size: 40rpx;
				font-weight: 800;
				color: rgb(130, 130, 130);
				margin: 0 30rpx 0 40rpx;
			}

			.share-content {
				font-size: 30rpx;
				font-weight: 800;
				color: rgb(91, 91, 91);
			}
		}

		.share:active {
			background-color: rgb(227, 227, 227);
		}
	}
</style>
