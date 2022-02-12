<template>
	<view class="homeInfoContainer">
		<scroll-view class="infoList" :style="{'height':height+'px'}" scroll-y="true" refresher-enabled="true"
			:refresher-triggered="loading" @refresherrefresh="refresh" @scrolltolower="loadMore">
			<slot slot="content" class="infoList">
				<view class="infoBox" v-for="item in infoList" :key="item.id" @click="infoDetail(item.id)">
					<news-card :item="item" :ref="item.id"></news-card>
				</view>
				<view v-if="loadmore" class="loadMore" @tap="loadMore">{{ loadmoreText }}</view>
				<view v-show="springback" class="loadMore">已经到底啦~~</view>
			</slot>
		</scroll-view>
		<u-popup :show="dialog" round="15" mode="bottom" @close="dialog=false">
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
			this.getCollectionInfo()
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
				// this.dialog = false
			},
			dialogFather(id) {
				this.shareId = id
				this.dialog = true
			},
			refresh() {
				this.loading = true
				this.current = 1
				this.infoList = []
				this.springback = false
				this.loadmore = true
				this.loadmoreText = "加载更多"
				this.getCollectionInfo()
			},
			loadMore() {
				this.current++
				this.loadmoreText = "正在加载中"
				this.getCollectionInfo()
			},
			// 获取收藏列表
			async getCollectionInfo() {
				let data = {
					current: this.current,
					limit: 10
				}
				let res = await this.$api.getCollectionInfo(data)
				// console.log(res)
				let list = res.data.info
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
					this.infoList.push.apply(this.infoList, list);
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
		overflow-y: scroll;
		user-select: text;
		-webkit-user-select: text;

		.infoList {
			margin: 0rpx auto;
			background-color: #f5f5f5;

			.infoBox {
				margin-bottom: 20rpx;
			}
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
