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
		<view class="inputLine" v-if="current!=4">
			<input class="input" type="text" v-model="inputValue" placeholder="请输入关键字" @focus="showBtn=true"
				@blur="showBtn=false" confirm-type="search" @confirm="searchJob()" />
			<view class="searchBtn" v-if="showBtn" @click="searchJob()">
				搜索
			</view>
			<view class="clearBtn" v-if="showBtn" @click="clearBtn()">
				清除搜索
			</view>
		</view>
		<view class="inputLine resumeList" v-if="current==4">
			<picker class="resumeInput" @change="statePicker" range-key="name" :value="index" :range="stateList">
				<input type="text" :value="stateList[resumeSearch.state].name" placeholder="状态" disabled />
			</picker>
			<input class="resumeInput" type="text" v-model="resumeSearch.position" placeholder="职位"
				@focus="showBtn=true" @blur="showBtn=false" />
			<input class="resumeInput" type="text" v-model="resumeSearch.city" placeholder="城市" @focus="showBtn=true"
				@blur="showBtn=false" />
			<picker class="resumeInput" @change="selectReward" :value="index" :range="rewardList" mode='multiSelector'
				@columnchange="selectLowPay">
				<input type="text" :value="resumeSearch.pay" placeholder="薪资" disabled />
			</picker>
			<view class="searchBtn" v-if="showBtn" @click="searchResume()">
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
					<JobPart v-if="isSubmit" :cate="3" :height="height.swiperHeight-40" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<JobPart v-if="isSubmit" :cate="0" :height="height.swiperHeight-40" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<JobPart v-if="isSubmit" :cate="1" :height="height.swiperHeight-40" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<JobPart v-if="isSubmit" :cate="2" :height="height.swiperHeight-40" />
				</swiper-item>
				<swiper-item class="swiperItem">
					<ResumeList :resumeSearch="resumeSearch" :height="height.swiperHeight-40" v-if="submitResume" />
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
					<view class="common info" @click="release()&closeSubmit()" v-if="current==4&&identity!=3">
						<text class="iconfont icon-submit"></text>
						<text>发布简历</text>
					</view>
					<view class="common info" @click="norelease()&closeSubmit()" v-if="current==4&&identity!=3">
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
				// 当前搜索类别
				cate: 3,
				// 显示按钮
				showBtn: false,
				// 身份
				identity: 0,
				submitResume: true,
				// 求职表单 
				resumeSearch: {
					position: "",
					state: "",
					pay: "",
					city: ""
				},
				// 状态列表
				stateList: [{
						name: "离职",
						id: 0
					},
					{
						name: "在职",
						id: 1
					}, {
						name: "不限",
						id: 3
					}
				],
				// 提交表单后刷新
				isSubmit: true,
				rewardList: [
					['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k', '10k', '11k', '12k', '13k', '14k', '15k',
						'16k', '17k', '18k', '19k', '20k', '其他'
					],
					['2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k', '10k', '11k', '12k', '13k', '14k', '15k', '16k',
						'17k', '18k', '19k', '20k', '21k', '其他'
					],
					['12薪', '13薪', '14薪', '15薪', '16薪', '17薪', '18薪', '其他']
				],
				// 个人简历
				resumeInfo: {}
			}
		},
		computed: {
			storeSubmit() {
				return this.$store.state.isSubmit
			}
		},
		watch: {
			storeSubmit() {
				this.isSubmit = false
				setTimeout(() => {
					this.isSubmit = true
				}, 100)
				this.$store.dispatch('setSubmit', false)
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
			selectLowPay(e) {
				let {
					column,
					value
				} = e.detail
				const upPay = ['2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k', '10k', '11k', '12k', '13k', '14k', '15k',
					'16k',
					'17k', '18k', '19k', '20k', '21k', '其他'
				]
				if (column) return
				this.rewardList[1] = upPay.slice(value, 999)
				this.$forceUpdate();
			},
			selectReward(e) {
				this.resumeSearch.pay =
					`${this.rewardList[0][e.detail.value[0]]}-${this.rewardList[1][e.detail.value[1]]} ${this.rewardList[2][e.detail.value[2]]}`
				this.showBtn = true
			},
			statePicker(e) {
				this.resumeSearch.state = parseInt(e.detail.value)
				this.showBtn = true
			},
			// 选择
			goSwiper(id) {
				this.current = id
			},
			// 当swiper滑动时
			changeSwiper(e) {
				let detail = e.detail
				this.current = detail.current
				switch (this.current) {
					case 0:
						this.cate = 3;
						break;
					case 1:
						this.cate = 0;
						break;
					case 2:
						this.cate = 1;
						break;
					case 3:
						this.cate = 2;
						break;
				}
			},
			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				this.resumeInfo = res.data.resume
				console.log("我的简历", this.resumeInfo)
				if (this.resumeInfo == null && this.identity != 3) {
					uni.showModal({
						title: '提示',
						content: '请先添加简历！',
						showCancel: false,
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
			// 判断简历是否完整 空缺项＜5
			checkResume() {
				let flag = 0
				for (let key in this.resumeInfo) {
					if (this.resumeInfo[key] == null || this.resumeInfo[key].length == 0) flag++
				}
				console.log("个人简历未填项", flag)
				return flag
			},
			// 搜索工作
			searchJob() {
				uni.navigateTo({
					url: `/pages/JobSearch/JobSearch?input=${this.inputValue}&cate=${this.cate}`
				})
				this.inputValue = ""
			},
			// 搜索简历
			searchResume() {
				this.submitResume = false
				setTimeout(() => {
					this.submitResume = true
				}, 100)
			},
			// 清除搜索
			clearBtn() {
				this.inputValue = ""
				this.
				resumeSearch = {
						position: "",
						state: "",
						pay: "",
						city: ""
					},
					this.submitResume = false
				setTimeout(() => {
					this.submitResume = true
				}, 100)
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
				if (this.checkResume() > 5) {
					uni.showModal({
						title: '提示',
						content: '请先将简历填写完整！',
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
					return
				}
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

		.resumeList {

			.resumeInput {
				width: 15%;
				height: 60rpx;
				line-height: 60rpx;
				margin: 0 auto;
				padding: 0 20rpx;
				background-color: #fff;
				text-align: center;
				border-radius: 14rpx;
				letter-spacing: 1rpx;
				transition: 0.2s ease-in-out;
				margin-right: 20rpx;
				display: flex;
				align-items: center;
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
