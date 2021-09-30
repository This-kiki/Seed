<template>
	<view class="homeInfoContainer" :style="{height:height+'px'}">
		<!-- 资讯列表 -->
		<view class="infoList">
			<view class="infoBox" v-for="item in topList" :key="item.id" @click="infoDetail(item.id)">
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
				topList: [],
				infoList: [],
				current: 1
			};
		},
		created() {
			this.getTopHomeInfo()
		},
		methods: {
			// 加载更多
			loadMore() {
				this.current++
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
				this.infoList = res.data.AllDynamic
				this.infoList.forEach(item => {
					if (item.imag != '')
						// item.imag = JSON.parse(item.imag)
						if (item.imag.length > 1) {
							item.isImg = true
						}
				})
				this.topList.push.apply(this.topList, this.infoList);
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
