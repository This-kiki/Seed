<template>
	<view class="jobContainer">
		<view class="selectLine"
			:style="{'height':height.titleBarHeight+'px','padding-top':height.statusBarHeight+'px'}">
			<view class="select">
				<view class="common" v-for="item in selectLine" :key="item.id" :class="current==item.id?'active':''"
					@click="goSwiper(item.id)">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 去除留白 -->
		<view class="helpWhite"
			:style="{'height':height.titleBarHeight+'px','padding-top':height.statusBarHeight+'px'}">
		</view>
		<!-- 搜索框 -->
		<view class="inputLine">
			<input class="input" type="text" v-model="inputValue" placeholder="请输入关键字" @focus="showBtn=true"
				@blur="showBtn=false" />
			<view class="searchBtn" v-if="showBtn" @click="searchJob()">
				搜索
			</view>
			<view class="clearBtn" v-if="showBtn" @click="clearBtn()">
				清除搜索
			</view>
		</view>
		<!-- swiper -->
		<view class="swiperContainer">
			<swiper class="swiper" :current="current" @change="changeSwiper"
				:style="{'height':height.swiperHeight-40+'px'}">
				<swiper-item class="swiperItem">
					<JobPart :cate="3" :height="height.swiperHeight-40" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<JobPart :cate="0" :height="height.swiperHeight-40" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<JobPart :cate="1" :height="height.swiperHeight-40" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<JobPart :cate="2" :height="height.swiperHeight-40" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<ResumeList :height="height.swiperHeight-40" v-if="submitResume" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 发布按钮 -->
		<view class="addBtn" @click="openSubmit()" v-if="identity!=0">
			<view class="iconfont icon-tianjia">
			</view>
		</view>
		<!-- 发布 -->
		<uni-popup ref="popup" type="bottom" :mask-click="false">
			<view class="submitContainer">
				<view class="join" v-if="identity==0" @click="goPage('joinPage')&closeSubmit()">
					立即入会 <text class="iconfont icon-xiangyou-copy"></text>
				</view>
				<view class="submitList">
					<view class="common info" @click="goPage('JobRelease')&closeSubmit()">
						<image src="../../static/icon/1.png" mode=""></image>
						<text>招聘</text>
					</view>
					<view class="common info" @click="release()&closeSubmit()" v-if="current==4">
						<text class="iconfont icon-submit"></text>
						<text>发布简历</text>
					</view>
					<view class="common info" @click="norelease()&closeSubmit()" v-if="current==4">
						<text class="iconfont icon-shanchu"></text>
						<text>撤回简历</text>
					</view>
				</view>
				<view class="close" @click="closeSubmit()">
					<view class="iconfont icon-quxiao">
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import JobPart from "../JobPart/JobPart"
	import ResumeList from "../ResumeList/ResumeList"
	export default {
		components: {
			JobPart,
			ResumeList
		},
		data() {
			return {
				height: {},
				current: 0,
				selectLine: [{
						id: 0,
						name: "社招"
					}, {
						id: 1,
						name: "兼职"
					},
					{
						id: 2,
						name: "实习"
					},
					{
						id: 3,
						name: "校招"
					},
					{
						id: 4,
						name: "求职"
					},
				],
				// 输入框内容
				inputValue: "",
				// 显示按钮
				showBtn: false,
				// 身份
				identity: 0,
				submitResume: true
			}
		},
		onLoad() {
			this.height = uni.getStorageSync('height')
			this.identity = uni.getStorageSync('identity')
			this.getResume()
		},
		onShow() {
			setTimeout(() => {
				uni.showTabBar()
			}, 400)
		},
		methods: {
			// 选择
			goSwiper(id) {
				this.current = id
			},
			// 当swiper滑动时
			changeSwiper(e) {
				let detail = e.detail
				this.current = detail.current
			},

			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				let resumeInfo = res.data.resume
				// console.log(this.resumeInfo)
				if (resumeInfo == null) {
					uni.showModal({
						title: '提示',
						content: '请先添加简历！',
						success: async function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/JobResume/JobResume"
								})
							} else if (res.cancel) {
								return
							}
						}
					})
				} else {
					return
				}
			},
			// 搜索工作
			searchJob() {
				uni.navigateTo({
					url: `/pages/JobSearch/JobSearch?input=${this.inputValue}`
				})
				this.inputValue = ""
			},
			// 清除搜索
			clearBtn() {
				this.inputValue = ""
			},
			// 跳转页面
			goPage(page) {
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				})
			},
			// 弹出发布框
			openSubmit() {
				uni.hideTabBar()
				this.$refs.popup.open('bottom')
			},
			// 关闭发布框
			closeSubmit() {
				this.$refs.popup.close('bottom')
				setTimeout(() => {
					uni.showTabBar()
				}, 400)
			},
			// 发布简历
			release() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定发布简历？',
					success: async function(res) {
						if (res.confirm) {
							let res = await that.$api.releaseResume({
								publish: 1
							})
							if (res.code == 20000) {
								uni.showToast({
									title: '发布成功！'
								})
								that.submitResume = false
								setTimeout(() => {
									that.submitResume = true
								}, 100)
							}
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			// 撤回
			norelease() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定撤回简历？',
					success: async function(res) {
						if (res.confirm) {
							let res = await that.$api.releaseResume({
								publish: 0
							})
							if (res.code == 20000) {
								uni.showToast({
									title: '撤回成功！'
								})
								that.submitResume = false
								setTimeout(() => {
									that.submitResume = true
								}, 100)
							}
						} else if (res.cancel) {
							return
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jobContainer {
		height: 100vh;
		background-color: #ffffff;
		position: relative;
		overflow-y: hidden;

		.selectLine {
			position: fixed;
			box-sizing: border-box;
			background-color: #36c1ba;
			display: flex;
			justify-content: space-between;
			width: 100%;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			.select {
				font-size: 26rpx;
				padding: 20rpx;
				// width: 60%;
				display: flex;
				align-items: center;
				justify-content: space-around;
				background-color: #36c1ba;

				.common {
					margin-right: 20rpx;
					text-align: center;
					color: #eee;
					font-size: 26rpx;
					transition: 0.2s ease-in-out;
				}

				.active {
					font-weight: bold;
					color: #fff;
					position: relative;
					font-size: 34rpx;
					transition: 0.2s ease-in-out;
				}
			}
		}

		.inputLine {
			box-sizing: border-box;
			position: fixed;
			width: 100%;
			height: 40px;
			padding: 0 3%;
			background-color: #36c1ba;
			padding-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			z-index: 99;

			.input {
				width: 100%;
				height: 60rpx;
				margin: 0 auto;
				padding: 0 20rpx;
				background-color: #fff;
				text-align: center;
				border-radius: 14rpx;
				letter-spacing: 1rpx;
				transition: 0.2s ease-in-out;
			}

			.searchBtn {
				font-size: 24rpx;
				width: 100rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #fff;
			}

			.clearBtn {
				font-size: 24rpx;
				width: 180rpx;
				line-height: 60rpx;
				padding: 0 0 0 20rpx;
				color: #fff;
			}
		}

		.swiperContainer {
			margin-top: 40px;
			background-color: #f5f5f5;

			.swiper {
				.swiperItem {
					overflow-y: scroll;
				}
			}
		}

		.addBtn {
			position: fixed;
			bottom: 60rpx;
			right: 40rpx;
			height: 100rpx;
			width: 100rpx;
			background-color: #36c1ba;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			.iconfont {
				color: #ffff;
				font-size: 60rpx;
				font-weight: bold;
			}
		}

		.submitContainer {
			background-color: #fff;
			width: 100%;
			margin: 0 auto;
			border-radius: 10rpx;
			padding: 60rpx 30rpx 30rpx;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			border-top-left-radius: 40rpx;
			border-top-right-radius: 40rpx;

			.join {
				font-size: 28rpx;
				color: #36c1ba;

				.iconfont {
					font-size: 24rpx;
					margin-left: 10rpx;
				}
			}

			.submitList {
				display: flex;
				padding: 60rpx 0 40rpx;
				border-bottom: 10rpx solid #f8f8f8;

				.common {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 60rpx;

					image {
						width: 80rpx;
						height: 80rpx;
					}

					.iconfont {
						font-size: 60rpx;
						color: #36c1ba;
						padding: 0 0 10rpx;
					}

					text {
						font-size: 28rpx;
						letter-spacing: 1rpx;
						margin-top: 12rpx;
					}
				}
			}

			.close {
				padding: 40rpx 0;
				text-align: center;
				color: #999;

				.iconfont {
					font-size: 60rpx;
				}
			}
		}
	}
</style>
