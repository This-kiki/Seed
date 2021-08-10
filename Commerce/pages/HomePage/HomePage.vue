<template>
	<view class="homeContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<!-- 轮播图 -->
		<view class="swiperContainer">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" :circular="circular">
				<swiper-item v-for="item in  carouselList" :key="item.id">
					<view class="swiper-item">
						<image :src="item.url" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 主要功能列表 -->
		<view class="operateContainer">
			<view class="top">
				<view class="intro" @click="goPage('CompanyInfo')">
					种子会介绍
				</view>
				<view class="news" @click="goPage('Mine')">
					最新动态
				</view>
				<view class="activity">
					活动报名
				</view>
				<view class="suggest" @click="goPage('Complaints')">
					法律援助
				</view>
			</view>
			<view class="bottom">
				<view class="left">
					<view class="title">
						申请入会
					</view>
					<view class="light">
						查看会员信息，资源交互
					</view>
				</view>
				<view class="right">
					<view class="btn" @click="goPage('joinPage')">
						立即申请
					</view>
				</view>
			</view>
		</view>
		<!-- 会员风采 -->
		<view class="managerContainer">
			<view class="titleLine">
				<view class="title">
					会员风采
				</view>
				<view class="more" @click="seeMore('UserList')">
					查看更多
				</view>
			</view>
			<view class="managerBox">
				<view class="manager" v-for="index in 10" :key="index">
					<view class="img">
						照片
					</view>
					<view class="info">
						<view class="name">
							名称
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 会员单位 -->
		<view class="companyContainer managerContainer">
			<view class="titleLine">
				<view class="title">
					会员单位
				</view>
				<view class="more" @click="seeMore('CompanyList')">
					查看更多
				</view>
			</view>
			<view class="managerBox">
				<view class="manager" v-for="item in companyList" :key="item.openId">
					<view class="img" @click="seeDetail(item.openId)">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="info">
						<view class="name">
							{{item.companyName}}
						</view>
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
					navTitle: "珠浦种子会",
					bgColor: "white"
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
				// 轮播图列表
				carouselList: [],
				// 会员单位列表
				companyList: []
			}
		},
		created() {
			this.getHomeCarousel()
			this.getCompanyList()
		},
		methods: {
			//首页轮播图
		    async getHomeCarousel(){
				let res = await this.$api.getHomeCarousel()
				this.carouselList = res.data.DynamicImagList
			},
			// 会员单位列表
			async getCompanyList(){
				let data = {
					current: 1,
					limit: 5
				}
				let res = await this.$api.getCompanyList(data)
				// console.log(res)
				this.companyList = res.data.rows
			},
			// 查看更多
			seeMore(flag){
				uni.navigateTo({
					url: `/pages/${flag}/${flag}`
				})
			},
			// 查看详情
			async seeDetail(openId){
				let data ={
					openid:openId
				}
				let res = await this.$api.getCompanyDetail(data)
				console.log(openId,res)
			},
			// 跳转页面
			goPage(page){
				if(page == 'joinPage'){
					uni.navigateTo({
					url: `/pages/Mine/${page}/${page}`
				})
				}
				if(page == 'Complaints'){
					uni.navigateTo({
						url: `/pages/Mine/${page}/${page}`
					})
				}
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.homeContainer {
		padding-bottom: 50rpx;
		.swiperContainer {
			width: 100%;

			.swiper {
				height: 250rpx;

				.swiper-item {
					width: 94%;
					height: 100%;
					margin: 0 auto;
					background-color: #4e8df6;
					border-radius: 16rpx;
					box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.operateContainer {
			width: 94%;
			margin: 0rpx auto;

			.top {
				display: flex;
				flex-flow: wrap;
				justify-content: space-around;

				view {
					width: 48%;
					height: 100rpx;
					margin-top: 20rpx;
					text-align: center;
					line-height: 100rpx;
					border-radius: 14rpx;
					color: #141414;
					font-weight: bold;
					letter-spacing: 2rpx;
					text-shadow: 0 4rpx 8rpx #eee;
					box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
				}
				
				.intro{
					background: url(../../static/img/jieshao.jpg) left top  no-repeat;
					background-size: 100% auto;
				}
				
				.news{
					background: url(../../static/img/dongtai.jpg) right top no-repeat;
					background-size: 100% auto;
				}
				
				.activity{
					background: url(../../static/img/huodong.jpg) ;
					background-size: 100% auto;
				}
				.suggest{
					background: url(../../static/img/jianyi.jpg) center center;				
					background-size: 100% auto;
				}
			}

			.bottom {
				box-sizing: border-box;
				width: 98%;
				margin: 20rpx auto 0;
				padding: 0rpx 0rpx;
				border-radius: 14rpx;
				display: flex;
				justify-content: space-around;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
				background: url(../../static/img/shenqing.jpg)center center;
				background-size: 100% auto;

				.left {
					background-color: #ffffffaa;
					padding: 30rpx 90rpx;
					.title {
						font-weight: bold;
					}

					.light {
						font-size: 24rpx;
						margin-top: 10rpx;
					}
				}

				.right {
					display: flex;
					justify-content: center;
					align-items: center;

					.btn {
						font-size: 28rpx;
						padding: 10rpx 20rpx;
						background-color: #4e8df6;
						color: #fff;
						border-radius: 14rpx;
						letter-spacing: 1rpx;
					}
				}
			}
		}

		.managerContainer {
			width: 92%;
			margin: 20rpx auto 0;

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

				.more {
					font-size: 24rpx;
					color: #ccc;
				}
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

			.managerBox {
				margin-top: 15rpx;
				overflow-x: auto;
				white-space: nowrap;

				.manager {
					display: inline-flex;
					flex-direction: column;
					width: 150rpx;
					// background-color: lightblue;
					margin-right: 20rpx;
					border-radius: 14rpx;
					box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

					.img {
						width: 100%;
						height: 200rpx;
						border-radius: 14rpx;
						background-color: #4e8df6;
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 100%;
							height: 100%;
						}
					}

					.info {
						display: flex;
						flex-direction: column;
						text-align: center;

						.work {
							font-size: 26rpx;
							margin-top: 10rpx;
							font-weight: bold;
						}

						.name {
							font-size: 26rpx;
							margin-top: 8rpx;

						}
					}
				}
			}
		}

		.companyContainer {
			.managerBox {
				.manager {
					width: 400rpx;
				}
			}
		}
	}
</style>
