<template>
	<view class="homeInfoContainer" :style="{height:height+'px'}">
		<!-- 资讯列表 -->
		<view class="infoList">
			<view class="infoBox" v-for="item in infoList" :key="item.id" @click="infoDetail(item.id)">
				<news-card :item="item" :ref="item.id"></news-card>
				<view class="operate" v-if="flag==1">
					<view class="delete" @click="deleteInfo(item.id)">
						删除
					</view>
					<view class="edit" @click="editInfo(item.id)">
						修改
					</view>
				</view>
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
			this.getAllHomeInfo()
		},
		methods: {
			// 加载更多
			loadMore() {
				this.current++
				this.getAllHomeInfo()
			},
			// 获取所有资讯列表
			async getAllHomeInfo() {
				let res = await this.$api.getAllHomeInfo({
					current: this.current,
					openid: uni.getStorageSync("openid")
				})
				// console.log(res)
				let list = res.data.AllDynamic
				list.forEach(item => {
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
			// 删除资讯
			async deleteInfo(id) {
				let res = await this.$api.deleteInfo({
					id
				})
				if (res.code == 20000) {
					uni.showToast({
						title: "删除成功"
					})
				} else {
					uni.showToast({
						title: "删除失败",
						icon: "none"
					})
				}
			},
			// 修改资讯
			editInfo(id) {
				uni.navigateTo({
					url: `/pages/InfoSubmit/InfoSubmit?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.homeInfoContainer {
		overflow-y: scroll;

		.infoList {
			margin: 0rpx auto;
			background-color: #f5f5f5;

			.infoBox {


				.operate {
					display: flex;
					margin-top: 20rpx;

					.delete {
						padding: 10rpx;
						background-color: #e06c75;
						color: #fff;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}

					.edit {
						padding: 10rpx;
						background-color: #56b6c2;
						color: #fff;
						border-radius: 10rpx;
					}

				}
			}
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
