<template>
	<view class="infoContainer">
		<!-- 轮播图 -->
		<view class="swiperContainer">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" :circular="circular">
				<swiper-item v-for="(item,index) in carouselList" :key="index">
					<view class="swiper-item" :style="{'background-image':'url('+item+')'}"
						@click="previewImage(index)">
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 介绍 -->
		<view class="infoContainer">
			<view class="titleLine">
				<view class="title">
					种子会简介
				</view>
			</view>
			<view class="intro">
				<view class="line" v-for="(item,index) in info" :key="index">
					{{item}}
				</view>
			</view>
		</view>
		<!-- 种子会架构 -->
		<view class="frameWorkContainer infoContainer">
			<view class="titleLine">
				<view class="title">
					种子会架构
				</view>
			</view>
			<view class="frameWorkList">
				<view class="frameItem" v-for="(item,index) in frameWorkList" :key="index" v-html="item">
				</view>
			</view>
		</view>
		<!-- 联系我们 -->
		<view class="contactContainer infoContainer">
			<view class="titleLine">
				<view class="title">
					联系我们
				</view>
			</view>
			<view class="main">
				<view class="address" @click="goMap()">
					<view class="title">
						办公地址
					</view>
					<view class="info">
						<view class="text">
							{{address}}
						</view>
						<view class="iconfont icon-weizhi"></view>
					</view>
				</view>
				<view class="phone">
					<view class="title">
						联系电话
					</view>
					<view class="info" v-for="(item,index) in phoneList" :key="index" @click="callPhone(item.phone)">
						<view class="text">
							{{item.phone?item.phone:""}} {{item.name?item.name:""}}
						</view>
						<view class="iconfont icon-dianhua"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 种子会章程 -->
		<view class="constitutionContainer infoContainer">
			<view class="titleLine">
				<view class="title">
					种子会章程
				</view>
			</view>
			<view class="main">
				<view class="line" v-for="(item,index) in constitution" :key="index">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 指示点
				indicatorDots: false,
				// 自动播放
				autoplay: true,
				// 切换时长
				interval: 5000,
				// 自动播放间隔时长
				duration: 800,
				// 循环
				circular: true,
				// 轮播图列表
				carouselList: [],
				// 商会介绍
				info: "暂无",
				// 地址
				address: "",
				// 电话
				phoneList: [],
				// 架构
				frameWorkList: [],
				// 章程
				constitution: "",
			};
		},
		created() {
			this.getInfoCarousel()
			this.getIntro()
		},
		methods: {
			// 预览图片
			previewImage(index) {
				uni.previewImage({
					indicator: "number",
					loop: true,
					current: index,
					urls: this.carouselList
				})
			},
			// 种子会轮播图
			async getInfoCarousel() {
				let res = await this.$api.getInfoCarousel()
				// console.log(res)
				this.carouselList = res.data.urlList
			},
			// 获取种子会介绍
			async getIntro() {
				let res = await this.$api.getIntroduction()
				// console.log(res)
				let data = res.data.intro
				this.address = data.address
				this.phoneList = data.contact
				this.info = data.introduce.split("\n")
				this.frameWorkList = data.framework.split("\n")
				this.constitution = data.constitution.split("\n")
			},
			// 信息复制到剪切板
			copy(value) {
				uni.showModal({
					content: value,
					confirmText: '复制内容',
					success: res => {
						if (res.confirm) {
							uni.setClipboardData({
								data: value,
								success: () => {
									uni.showToast({
										title: '复制成功'
									})
								}
							});
						} else if (res.cancel) {
							return
						}
					}
				});
			},
			// 跳转地图
			goMap() {
				uni.navigateTo({
					url: "/pages/Map/Map"
				})
			},
			// 打电话
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.infoContainer {
		padding-top: 20rpx;
		padding-bottom: 100rpx;
		background-color: #F5f5f5;
		user-select: text;
		-webkit-user-select: text;

		.swiperContainer {
			width: 100%;

			.swiper {
				height: 400rpx;

				.swiper-item {
					width: 94%;
					height: 100%;
					margin: 0 auto;
					background-color: #36c1ba;
					border-radius: 16rpx;
					box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}
			}
		}

		.infoContainer {
			width: 92%;
			margin: 20rpx auto 0;
			position: relative;

			.titleLine {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					font-size: 28rpx;
					font-weight: bold;
					letter-spacing: 1rpx;
					margin-left: 20rpx;
					position: relative;
				}

				.title:before {
					content: "";
					position: absolute;
					width: 8rpx;
					height: 36rpx;
					background-color: #36c1ba;
					top: 3rpx;
					left: -20rpx;
					border-radius: 5rpx;
				}

				.more {
					font-size: 24rpx;
					color: #ccc;
				}
			}

			.intro {
				margin-top: 20rpx;
				padding: 40rpx 30rpx;
				background-color: #fefefe;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
				font-size: 28rpx;
				letter-spacing: 1rpx;
				line-height: 46rpx;
				border-radius: 10rpx;
				text-indent: 2em;
				overflow-y: hidden;
			}

			.showMore {
				font-size: 24rpx;
				color: #999;
				position: absolute;
				bottom: 0rpx;
				right: 0;
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background-color: #fff;
				border-radius: 10rpx;
			}
		}

		.frameWorkContainer {
			margin-top: 0;

			.frameWorkList {
				margin-top: 20rpx;
				padding: 40rpx 30rpx;
				background-color: #fefefe;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
				font-size: 28rpx;
				letter-spacing: 1rpx;
				line-height: 46rpx;
				border-radius: 10rpx;

			}
		}


		.contactContainer {
			margin-top: 0;

			.main {
				margin-top: 20rpx;

				.address,
				.phone {
					margin: 0rpx auto 40rpx;
					background-color: #fefefe;
					box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
					padding: 30rpx 20rpx;
					border-radius: 10rpx;

					.title {
						color: #999;
						font-size: 24rpx;
					}

					.info {
						margin-top: 10rpx;
						display: flex;
						justify-content: space-between;

						.text {
							font-size: 28rpx;
							font-weight: bold;
							letter-spacing: 1rpx;
						}

						.iconfont {
							font-size: 40rpx;
							color: #36c1ba;
							padding-left: 30rpx;
							border-left: 4rpx solid #eee;
						}
					}
				}

				.phone {
					.info {
						margin-top: 40rpx;
					}
				}
			}
		}

		.constitutionContainer {
			margin-top: 0;

			.main {
				margin-top: 20rpx;
				padding: 40rpx 30rpx 40rpx;
				background-color: #fefefe;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
				font-size: 28rpx;
				letter-spacing: 1rpx;
				line-height: 46rpx;
				border-radius: 10rpx;
				.line{
					text-indent: 2em;
					margin-bottom: 10px;
				}
			}
		}
	}
</style>
