<template>
	<view class="infoContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
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
						<view class="operate">
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
		<view class="loadMore" @click="loadMore()">
			点击加载更多
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
			};
		},
		onShow() {
			this.current = 1
			this.infoList = []
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
						item.imag = JSON.parse(item.imag)
					if (item.imag.length > 1) {
						item.isImg = true
					}
				})
				this.infoList.push.apply(this.infoList, list);
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
			editInfo(id){
				uni.navigateTo({
					url:`/pages/InfoSubmit/InfoSubmit?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.infoContainer {
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
