<template>
	<view class="homeContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<!-- 顶部操作 -->
		<view class="topLine">
			<view class="select">
				<view class="common" v-for="item in tapList" :key="item.id" @click="setActive(item.id)"
					:class="item.id==active?'active':''">
					{{item.name}}
				</view>
			</view>
			<view class="add" @click="openSubmit()">
				+
				<view class="text">
					发布
				</view>
			</view>
		</view>
		<!-- 去除留白 -->
		<view class="helpWhite">
		</view>
		<!-- 申请入会 -->
		<view class="submitSeed" v-if="flag==0">
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
		<!-- 资讯列表 -->
		<view class="infoList">
			<view class="infoBox" v-for="item in topList" :key="item.id" @click="seeInfoDetail(item.id)">
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
						<view class="imgBox" v-for="(i,index) in item.imag.slice(0,3)" :key="index">
							<image :src="i" mode=""></image>
						</view>
					</view>
					<view class="main">
						<view class="top" v-if="item.isTop">
							★
						</view>
						<view class="view">
							{{item.view}} 浏览
						</view>
						<view class="love">
							{{item.love}} 点赞
						</view>
						<view class="time">
							{{item.createTime.slice(0,10)}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载 -->
		<view class="loadMore" @click="loadMore()">
			点击加载更多
		</view>
		<!-- 发布 -->
		<uni-popup ref="popup" type="bottom">
			<view class="submitContainer">
				<view class="join" v-if="flag==0" @click="goPage('joinPage')&closeSubmit()">
					立即入会 >
				</view>
				<view class="submitList">
					<view class="common info" @click="goPage('InfoSubmit')&closeSubmit()">
						<image src="../../static/icon/1.png" mode=""></image>
						<text>资讯</text>
					</view>
					<view class="common law" @click="goPage('LawRelease')&closeSubmit()" v-if="flag==2||flag==0">
						<image src="../../static/icon/2.png" mode=""></image>
						<text>法律</text>
					</view>
				</view>
				<view class="close" @click="closeSubmit()">
					X
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "濠江区珠浦种子会",
					bgColor: "#fff"
				},
				// 所有资讯列表
				infoList: [],
				// 置顶资讯
				topList: [],
				// tap
				tapList: [{
						id: 0,
						name: "推荐"
					},
					{
						id: 1,
						name: "种子会介绍"
					},
					{
						id: 2,
						name: "管理层架构"
					},
					{
						id: 3,
						name: "个人会员"
					},
					{
						id: 4,
						name: "会员单位"
					},
					{
						id: 5,
						name: "法律援助"
					},
				],
				// 当前选择
				active: 0,
				// 是否会员
				flag: 0,
				// 页数
				current: 1,
			}
		},
		created() {
			// this.getTopHomeInfo()
			this.checkUser()
		},
		onShow() {
			this.current = 1
			this.infoList = []
			this.getTopHomeInfo()	
			this.active = 0
		},
		methods: {
			// 判断是否为会员
			async checkUser() {
				let res = await this.$api.getUserMsg()
				this.flag = res.data.userBaseInfo.identity
				console.log("身份", this.flag)
			},
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
						item.imag = JSON.parse(item.imag)
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
						item.imag = JSON.parse(item.imag)
					if (item.imag.length > 1) {
						item.isImg = true
					}
				})
				this.topList.push.apply(this.topList, this.infoList);
			},
			// 查看资讯详情
			seeInfoDetail(infoId) {
				uni.navigateTo({
					url: `/pages/RealTimeInfo/DetailedInfo/DetailedInfo?infoId=${infoId}`
				})
			},
			// 选择
			setActive(id) {
				this.active = id
				switch (id) {
					case 1:
						this.goPage("CompanyInfo");
						break;
					case 2:
						this.seeMore("ManagerList");
						break;
					case 3:
						this.seeMore("UserList");
						break;
					case 4:
						this.goPage("CompanyList");
						break;
					case 5:
						this.goPage("LawInfo");
						break;
				}
			},
			// 查看更多
			seeMore(flag) {
				if (flag == 'ManagerList')
					uni.navigateTo({
						url: `/pages/UserList/UserList?flag=1`
					})
				else
					uni.navigateTo({
						url: `/pages/${flag}/${flag}?flag=2`
					})
			},
			// 跳转页面
			goPage(page) {
				if (page == 'joinPage') {
					uni.navigateTo({
						url: `/pages/Mine/${page}/${page}`
					})
				}
				if (page == 'LawRelease' || page == 'InfoSubmit') {
					if (this.flag == 0) {
						uni.showToast({
							icon: "none",
							title: "请先申请入会"
						})
						return
					}
				}
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			},
			// 弹出发布框
			openSubmit() {
				this.$refs.popup.open('bottom')
			},
			// 关闭发布框
			closeSubmit() {
				this.$refs.popup.close('bottom')
			},
		}
	}
</script>
<style lang="scss">
	.homeContainer {
		min-height: 100vh;
		background-color: #ffffff;
		position: relative;

		.topLine {
			position: fixed;
			box-sizing: border-box;
			border-bottom: 1rpx #eee solid;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			width: 100%;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			.select {
				font-size: 26rpx;
				padding: 20rpx;
				width: 82%;
				overflow-x: scroll;
				white-space: nowrap;

				.common {
					margin-right: 20rpx;
					display: inline-block;
					width: 140rpx;
					text-align: center;
				}

				.active {
					font-weight: bold;
					color: #4e8df6;
					position: relative;
				}

				.active:after {
					background-color: #4e8df6;
					width: 50rpx;
					height: 6rpx;
					position: absolute;
					bottom: -20rpx;
					right: 46rpx;
					border-radius: 5rpx;
					content: "",
				}
			}
			
			.select::-webkit-scrollbar {
				display: none;
			}

			.add {
				position: absolute;
				right: 20rpx;
				bottom: 24rpx;
				color: #fff;
				background-color: #4e8df6;
				width: 44rpx;
				height: 44rpx;
				line-height: 42rpx;
				font-size: 38rpx;
				font-weight: bold;
				text-align: center;
				border-radius: 22rpx;

				.text {
					color: #333;
					font-size: 18rpx;
					font-weight: normal;
					margin-top: -8rpx;
				}
			}
		}

		.helpWhite {
			height: 100rpx;
		}

		.submitSeed {
			box-sizing: border-box;
			width: 98%;
			margin: 0rpx auto;
			border-radius: 14rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			background: url(../../static/img/5.jpeg)center center;
			background-size: 100% auto;

			.left {
				background-color: #ffffffaa;
				padding: 30rpx 110rpx 30rpx 70rpx;

				.title {
					font-weight: bold;
					font-size: 28rpx;
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
						justify-content: flex-end;
						align-items: center;
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
							font-size: 30rpx;
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

		.submitContainer {
			background-color: #fff;
			width: 94%;
			margin: 0 auto;
			border-radius: 10rpx;
			padding: 30rpx;
			box-sizing: border-box;

			.join {
				font-size: 28rpx;
				color: #555;
			}

			.submitList {
				display: flex;
				padding: 40rpx 0;
				border-bottom: 10rpx solid #f8f8f8;

				.common {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 60rpx;

					image {
						width: 60rpx;
						height: 60rpx;
					}

					text {
						font-size: 24rpx;
						letter-spacing: 1rpx;
						margin-top: 12rpx;
					}
				}
			}

			.close {
				padding: 40rpx 0;
				text-align: center;
				font-size: 40rpx;
				color: #999;
			}
		}
	}
</style>
