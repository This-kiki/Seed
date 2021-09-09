<template>
	<view class="infoContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 操作栏 -->
		<view class="operateContainer">
			<view class="release" @click="getMeInfo()" :class="flag==1?'select':''">
				<text class="iconfont icon-submit"></text>
				我的发布
			</view>
			<view class="collect" @click="getCollectionInfo()" :class="flag==2?'select':''">
				<text class="iconfont icon-jianli"></text>
				我的收藏
			</view>
		</view>
		<!-- 资讯列表 -->
		<view class="infoList">
			<view class="infoBox" v-for="item in infoList" :key="item.id">
				<view class="top" @click="seeInfoDetail(item.id)">
					<view class="title">
						{{item.title}}
					</view>
					<view class="intro">
						{{item.simpleContent}}
					</view>
				</view>
				<view class="bottom">
					<view class="img" :style="{backgroundImage:'url('+item.imag+')'}"
						v-if="item.imag!=''&&item.imag!='string'&&!item.isImg" @click="seeInfoDetail(item.id)">
					</view>
					<view class="imgContainer" v-if="item.isImg" @click="seeInfoDetail(item.id)">
						<view class="imgBox" v-for="(i,index) in item.imag.slice(0,3)" :key="index">
							<image :src="i" mode=""></image>
						</view>
					</view>
					<view class="main">
						<view class="someInfo">
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
			</view>
		</view>
		<!-- 加载 -->
		<view class="loadMore" @click="loadMore()" v-if="flag==1&&infoList.length!=0">
			点击加载更多
		</view>
		<view class="loadMore" v-if="infoList.length==0">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "我的资讯",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 所有资讯列表
				infoList: [],
				// 页数
				current: 1,
				// 是否收藏
				flag: 1
			};
		},
		onShow() {
			if (this.flag == 1) {
				this.current = 1
				this.infoList = []
				this.getAllHomeInfo()
			}
		},
		methods: {
			// 点击我的发布
			getMeInfo() {
				this.current = 1
				this.infoList = []
				this.getAllHomeInfo()
			},
			// 加载更多
			loadMore() {
				this.current++
				this.getAllHomeInfo()
			},
			// 获取所有资讯列表
			async getAllHomeInfo() {
				if (this.flag == 2) {
					this.current = 1
					this.infoList = []
					this.flag = 1
				}
				let res = await this.$api.getAllHomeInfo({
					current: this.current,
					openid: uni.getStorageSync("openid")
				})
				// console.log(res)
				let list = res.data.AllDynamic
				list.forEach(item => {
					if (item.imag != '')
						item.imag = JSON.parse(item.imag)
					if (item.imag.length > 1) {
						item.isImg = true
					}
				})
				this.infoList.push.apply(this.infoList, list);
			},
			// 获取收藏列表
			async getCollectionInfo() {
				this.flag = 2
				this.infoList = []
				let res = await this.$api.getCollectionInfo()
				// console.log(res)
				let list = res.data.info
				list.forEach((item, i) => {
					if (item == null) {
						list.splice(i, 1)
						return
					}
					if (item.imag != '')
						item.imag = JSON.parse(item.imag)
					if (item.imag.length > 1) {
						item.isImg = true
					}
				})
				this.infoList = list
			},
			// 查看资讯详情
			seeInfoDetail(infoId) {
				uni.navigateTo({
					url: `/pages/RealTimeInfo/DetailedInfo/DetailedInfo?infoId=${infoId}`
				})
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
	.infoContainer {
		.operateContainer {
			width: 96%;
			margin: 20rpx auto 0;
			background-color: #fff;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 14rpx;
			display: flex;

			.iconfont {
				color: blue;
				font-size: 40rpx;
				margin-right: 6rpx;
				font-weight: bold;
			}

			.release,
			.collect {
				margin-right: 18rpx;
				padding: 10rpx;
				box-sizing: border-box;
				border-radius: 10rpx;
			}

			.select {
				background-color: #eee;
			}
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
						// justify-content: space-around;

						.imgBox {
							height: 150rpx;
							width: 30%;
							border-radius: 10rpx;
							margin-right: 3%;

							image {
								height: 100%;
								width: 100%;
								border-radius: 10rpx;
							}
						}
					}

					.main {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.someInfo {
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
			}
		}

		.loadMore {
			text-align: center;
			font-size: 26rpx;
			color: #999;
			margin-top: 16rpx;
			padding-bottom: 50rpx;
		}
	}
</style>
