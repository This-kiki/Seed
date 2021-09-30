<template>
	<view class="homeInfoContainer" :style="{height:height+'px'}">
		<!-- 资讯列表 -->
		<view class="infoList">
			<view class="infoBox" v-for="item in infoList" :key="item.id" @click="infoDetail(item.id)">
				<news-card :item="item" :ref="item.id"></news-card>
			</view>
		</view>
		<!-- 加载 -->
		<view class="loadMore" @click="loadMore()">
			点击加载更多
		</view>
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
				current: 1
			};
		},
		created() {
			this.getCollectionInfo()
		},
		methods: {
			// 加载更多
			loadMore() {
				this.current++
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
				list.forEach((item, i) => {
					if (item == null) {
						list.splice(i, 1)
						return
					}
					if (item.imag != '')
						// item.imag = JSON.parse(item.imag)
						if (item.imag.length > 1) {
							item.isImg = true
						}
				})
				this.infoList.push.apply(this.infoList, list);
				if (list.length == 0 && this.current != 1) {
					uni.showToast({
						icon: "none",
						title: "已是最后一页"
					})
					this.current--
				}
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

		.infoList {
			margin: 0rpx auto;
			background-color: #f5f5f5;
		}

		.loadMore {
			text-align: center;
			font-size: 26rpx;
			color: #999;
			margin-top: 16rpx;
			padding-bottom: 40rpx;
			background-color: #f5f5f5;
		}
	}
</style>
