<template>
	<view>
		<loading ref="loadRefresh" :currentPage="current.currentPage" :totalPages="current.totalPages"
			@loadMore="loadMore" @refresh="refresh">
			<view slot="content-list" class="page">
				<!-- 数据列表 -->
				<!-- <view v-for="(item, index) in list" :key="index" @click="go(item.id)">
					<news-card :options="item" :ref="item.id"></news-card>
				</view> -->
				<!-- 资讯列表 -->
				<view class="infoList">
					<view class="infoBox" v-for="item in list" :key="item.id" @click="go(item.id)">
						<view class="top">
							<view class="title">
								{{item.title}}
							</view>
							<view class="intro">
								{{item.simpleContent}}
							</view>
						</view>
						<view class="bottom">
							<view class="img" :style="{backgroundImage:'url('+item.imag+')'}"
								v-if="item.imag!=''&&item.imag!='string'&&!item.isImg">
							</view>
							<view class="imgContainer" v-if="item.isImg">
								<view class="imgBox" v-for="(i,index) in item.imag" :key="index">
									<image :src="i" mode=""></image>
								</view>
							</view>
							<view class="main">
								<view class="top" v-if="item.isTop">
									置顶
								</view>
								<view class="view">
									{{item.view}} 浏览
								</view>
								<!-- <view class="love">
							{{item.love}} 点赞
						</view> -->
								<view class="time">
									{{item.createTime.slice(0,10)}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</loading>
	</view>
</template>

<script>
	import loading from '@/components/info_Com/load-refresh/load-refresh.vue';
	import newsCard from '@/pages/RealTimeInfo/infoCard/index.vue';
	export default {
		props: ['pageType'],
		components: {
			loading,
			newsCard
		},
		data() {
			return {
				list: [], // 数据集
				current: {
					currentPage: 1, // 当前页码
					totalPages: 2 // 总页数
				}
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			go(id) {
				uni.navigateTo({
					url: 'DetailedInfo/DetailedInfo?infoId=' + id,
				});
				// console.log(this.$refs[id][0])
				this.$refs[id][0].viewsAdd();
			},
			async init() {
				let resp
				var getAPI = {
					current: 1,
					limit: 20
				}
				switch (this.pageType) {
					case 0:
						await this.$api.getSeedInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 1:
						await this.$api.getCompanyInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 2:
						await this.$api.getMemberInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 3:
						await this.$api.getCountryInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
				}
				if (resp) {
					this.current.totalPages = resp.data.total
					this.list = resp.data.rows
					this.list.forEach(item => {
						item.imag = JSON.parse(item.imag)
						if (item.imag.length > 1) {
							item.isImg = true
						}
					})
				}
			},
			// 上划加载更多
			async loadMore() {
				let resp
				var getAPI = {
					current: this.current.currentPage,
					limit: 20
				}
				switch (this.pageType) {
					case 0:
						await this.$api.getSeedInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 1:
						await this.$api.getCompanyInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 2:
						await this.$api.getMemberInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
					case 3:
						await this.$api.getCountryInfo(getAPI).then((res) => {
							// console.log('种子会资讯',res)
							resp = res
							this.current.currentPage = this.current.currentPage + 1
						})
						break;
				}
				if (resp) {
					this.current.totalPages = resp.data.total
					for (var i = 0; i < resp.data.rows.length; i++) {
						this.list.push(resp.data.rows[i])
					}
					this.list.forEach(item => {
						item.imag = JSON.parse(item.imag)
						if (item.imag.length > 1) {
							item.isImg = true
						}
					})
				}
				this.$refs.loadRefresh.completed()
			},
			// 下拉刷新数据列表
			async refresh() {
				this.current.currentPage = 1
				await this.init()
				this.$refs.loadRefresh.completed()
			},
			// 代码触发下拉刷新方法
			runRefresh() {
				this.$refs.loadRefresh.runRefresh()
			}
		}
	};
</script>

<style lang="scss">
	.page {
		padding-top: 10rpx;
		min-height: 50rpx;
		background-color: rgb(255, 255, 255);
	}

	.infoList {
		width: 94%;
		margin: 0rpx auto;

		.infoBox {
			padding: 20rpx 0;
			box-sizing: border-box;
			border-bottom: 1rpx #eee solid;

			.top {
				.title {
					font-size: 28rpx;
					font-weight: bold;
					letter-spacing: 1rpx;
				}

				.intro {
					font-size: 22rpx;
					color: #666;
					margin-top: 10rpx;
					letter-spacing: 1rpx;
				}
			}

			.bottom {
				margin-top: 20rpx;

				.img {
					width: 100%;
					height: 400rpx;
					border-radius: 10rpx;
					background-color: #4e8df6;
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;
				}

				.imgContainer {
					display: flex;

					.imgBox {
						height: 150rpx;
						width: 30%;
						margin-right: 3%;
						border-radius: 10rpx;

						image {
							height: 100%;
							width: 100%;
							border-radius: 10rpx;
						}
					}
				}

				.main {
					display: flex;
					font-size: 22rpx;
					margin-top: 10rpx;
					color: #aaa;

					.top,
					.view,
					.love {
						margin-right: 10rpx;
					}

					.top {
						color: #4e8df6;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
