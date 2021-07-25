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
				<view class="phone" @click="callPhone()">
					<view class="title">
						联系电话
					</view>
					<view class="info">
						<view class="text">
							{{phone}}
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
				info: "一个人要么提得起，要么放得下，最可悲的是既提不起又放不下，犹豫犹豫去，在中间摇摆不定。但是，往往犹豫的人能找到足够的理由证明他的行为是对的。要么你狗熊到底，孬种到底，你很真实，表里如一，也能受人尊重，因为大家都喜欢弱者。在弱者身边能显出你的强大和优势，你会干得更有劲。而在强者身边只会显出你的弱小，你会感到自卑。就像你们在万行身边感到自卑一样。如果你转变心念，像万行一样努力十年、二十年，你也会成为强者。我希望你们都有这样的勇气。不敢做老虎，你就做绵羊。所以绵羊就是绵羊，老虎就是老虎，宝马就是宝马，桑塔纳就是桑塔纳，它们的本质是不一样的。绵羊的活法是对的，老虎的活法也是对的；桑塔纳的价格是合理的，宝马的价格也是合理的。所以，我是绵羊，就亮出我的风格；我是老虎，也要亮出我的风格，让你们看清楚，我从不掩饰。我经常告诉大家我就是这个东西，不需要什么包装，你喜欢这个东西就捡回家，不喜欢就不要动它，不要去批判它。一个人怎么过都是一生，胆小怕事，贪生怕死，做事前怕狼后怕虎，死要面子，这样活着是一辈子；老子天下第一，什么来了都不怕，都大胆去迎接，放开手脚去干，也是活一辈子，而且还活得很爽快。",
				// 商会框高度
				infoHeight: "300rpx",
				// 商会按钮文字
				infoBtn: "查看更多",
				// 地址
				address: "湖北省武汉市洪山区武汉科技大学",
				// 电话
				phone: "11011001100"
			};
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
			callPhone(){
				uni.makePhoneCall({
					phoneNumber:this.phone
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
				font-size: 26rpx;
				letter-spacing: 1rpx;
				line-height: 40rpx;
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
			}
		}
	}
</style>
