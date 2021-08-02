<template>
	<view class="infoContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 轮播图 -->
		<view class="swiperContainer">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" :circular="circular">
				<swiper-item>
					<view class="swiper-item">A</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">C</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 介绍 -->
		<view class="infoContainer">
			<view class="titleLine">
				<view class="title">
					商会介绍
				</view>
			</view>
			<view class="intro" :style="{height:infoHeight}">
				{{info}}
			</view>
			<view class="showMore" @click="showMore()">
				{{infoBtn}}
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
				<view class="address" @click="copy(address)">
					<view class="title">
						商会地址
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
							{{item.phone}} {{item.name}}
						</view>
						<view class="iconfont icon-dianhua"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "种子会介绍",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				setLoading: {
					show: false,
					text: "正在加载",
					mask: true,
				},
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
				// 商会介绍
				info: "濠江区珠浦种子会简称种子会，发起于2017年3月，设立于濠江珠浦，是由濠江区的青年企业家们发起并组建的非盈利性公益组织。种子会坚持以“心存善、行致远”的服务理念，致力于为濠江区当地的学子提供学业、就业方面的咨询及帮助；为当地青年提供交流与服务的平台；在传承家乡特色文化方面提出新的理念并支持建设与发展。濠江区珠浦种子会力求打造一个属于濠江区的人才交流中心及家乡文化建设平台，支持家乡公益事业的发展及文化建设。",
				// 商会框高度
				infoHeight: "300rpx",
				// 商会按钮文字
				infoBtn: "查看更多",
				// 地址
				address: "汕头市濠江区珠浦社区康乐活动中心三楼",
				// 电话
				phoneList:[
					{phone: "15815134760",name: "黄居浦先生"},
					{phone: "13510517003",name: "黄芳宜女士"},
				]
			};
		},
		created() {
		 let res =	this.$api.getIntroduction()
		 console.log(res)
		},
		methods: {
			// 介绍显示更多
			showMore() {
				if (this.infoBtn == "查看更多") {
					this.infoHeight = "auto"
					this.infoBtn = "收起"
				} else {
					this.infoHeight = "300rpx"
					this.infoBtn = "查看更多"
				}
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
			// 打电话
			callPhone(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.infoContainer {
		padding-bottom: 50rpx;

		.swiperContainer {
			width: 100%;

			.swiper {
				height: 250rpx;

				.swiper-item {
					width: 94%;
					height: 100%;
					margin: 0 auto;
					background-color: lightblue;
					border-radius: 16rpx;
					box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
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
					background-color: lightblue;
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
				padding: 40rpx 30rpx 80rpx;
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
				bottom: 50rpx;
				right: 0;
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background-color: #fff;
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
							color: #add8e6;
							padding-left: 30rpx;
							border-left: 4rpx solid #eee;
						}
					}
				}
				
				.phone{
					.info{
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>
