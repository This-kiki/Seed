<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体 -->
		<view class="mainContainer">
			<view class="category">
				<picker @change="selectCategory" range-key="name" :value="index" :range="cateList">
					<view class="input">{{`发布${cateList[jobInfo.classfication].name}`}}</view>
					<text>切换招聘类型</text>
				</picker>
			</view>
			<view class="common" @click="hopeJob()">
				<text>职位名称</text>
				<input type="text" v-model="jobInfo.job" placeholder="请选择职位名称" disabled />
			</view>
			<view class="common">
				<text>经验要求</text>
				<picker @change="selectExperience" range-key="name" :value="index" :range="experienceList">
					<view class="input">{{jobInfo.experience?jobInfo.experience:'请选择经验要求'}}</view>
				</picker>
			</view>
			<view class="common">
				<text>最低学历</text>
				<picker @change="selectEducation" range-key="name" :value="index" :range="educationList">
					<view class="input">{{jobInfo.education?jobInfo.education:"请选择最低学历"}}</view>
				</picker>
			</view>
			<view class="common">
				<text>薪资范围</text>
				<picker @change="selectReward" :value="index" :range="rewardList" mode='multiSelector'>
					<view class="input">{{jobInfo.reward?jobInfo.reward:"请选择薪资范围"}}</view>
				</picker>
			</view>
			<view class="common" @click="goNeed()">
				<text>职位描述</text>
				<input type="text" v-model="jobInfo.need" placeholder="请填写职位描述" disabled />
			</view>
			<view class="common">
				<text>职位关键词</text>
				<input type="text" v-model="jobInfo.brief" placeholder="请填写职位关键词(空格间隔 最多三条)" @input="changeInput()" />
			</view>
			<view class="common">
				<text>招聘人数</text>
				<input type="text" v-model="jobInfo.num" placeholder="请填写招聘人数(数字)" @input="changeInput()" />
			</view>
			<view class="common">
				<text>工作地点</text>
				<input type="text" v-model="jobInfo.place" placeholder="请填写工作地点" @input="changeInput()" />
			</view>
			<view class="release" @click="releaseJobNeed()">
				发布
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
					navTitle: "发布招聘",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 表单
				jobInfo: {
					brief: "",
					classfication: 0,
					education: "",
					experience: "",
					job: "",
					need: "",
					num: "",
					place: "",
					reward: ''
				},
				// flag
				flag: 1,
				cateList: [{
						id: 0,
						name: "兼职"
					},
					{
						id: 1,
						name: "实习"
					},
					{
						id: 2,
						name: "校招"
					},
					{
						id: 3,
						name: "社招"
					},
				],
				experienceList: [{
						id: 0,
						name: "不限"
					},
					{
						id: 1,
						name: "1年以内"
					},
					{
						id: 2,
						name: "1-3年"
					},
					{
						id: 3,
						name: "3-5年"
					},
					{
						id: 4,
						name: "5-10年"
					},
					{
						id: 5,
						name: "10年以上"
					}
				],
				educationList: [{
						id: 0,
						name: "小学"
					},
					{
						id: 1,
						name: "初中"
					},
					{
						id: 2,
						name: "高中"
					},
					{
						id: 3,
						name: "大专"
					},
					{
						id: 4,
						name: "本科"
					},
					{
						id: 5,
						name: "硕士"
					},
					{
						id: 6,
						name: "博士"
					}
				],
				rewardList: [
					['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k', '10k', '11k', '12k', '13k', '14k', '15k',
						'16k', '17k', '18k', '19k', '20k', '其他'
					],
					['2k', '3k', '4k', '5k', '6k', '7k', '8k', '9k', '10k', '11k', '12k', '13k', '14k', '15k', '16k',
						'17k', '18k', '19k', '20k', '21k', '其他'
					],
					['12薪', '13薪', '14薪', '15薪', '16薪', '17薪', '18薪', '其他']
				],
				identity: 0
			};
		},
		onLoad(options) {
			if (options.id) {
				this.setNav.navTitle = "修改招聘"
				this.flag = 2
				this.getJobDetail(options.id)
			} else {
				uni.setStorageSync('jobRelease', this.jobInfo)
			}
			this.identity = uni.getStorageSync('identity')
		},
		onShow() {
			this.jobInfo = uni.getStorageSync('jobRelease')
			if (uni.getStorageSync('hopeJob')) {
				this.jobInfo.job = uni.getStorageSync('hopeJob')
				uni.setStorageSync('jobRelease', this.jobInfo)
				uni.removeStorageSync('hopeJob')
			}
		},
		methods: {
			goNeed() {
				uni.navigateTo({
					url: "/pages/JobRelease/need"
				})
			},
			hopeJob() {
				uni.navigateTo({
					url: "/pages/JobResume/hopeJobList"
				})
			},
			changeInput() {
				uni.setStorageSync('jobRelease', this.jobInfo)
			},
			selectCategory(e) {
				this.jobInfo.classfication = e.detail.value
				uni.setStorageSync('jobRelease', this.jobInfo)
			},
			selectExperience(e) {
				this.jobInfo.experience = this.experienceList[e.detail.value].name
				uni.setStorageSync('jobRelease', this.jobInfo)
			},
			selectEducation(e) {
				this.jobInfo.education = this.educationList[e.detail.value].name
				uni.setStorageSync('jobRelease', this.jobInfo)
			},
			selectReward(e) {
				this.jobInfo.reward =
					`${this.rewardList[0][e.detail.value[0]]}-${this.rewardList[1][e.detail.value[1]]} ${this.rewardList[2][e.detail.value[2]]}`
				uni.setStorageSync('jobRelease', this.jobInfo)
			},
			// 发布招聘
			async releaseJobNeed() {
				this.jobInfo.num = parseInt(this.jobInfo.num)
				this.jobInfo.classfication = parseInt(this.jobInfo.classfication)
				if (this.flag == 2) {
					this.editJobNeed()
					return
				}
				for (let key in this.jobInfo) {
					if (this.jobInfo[key] == ""&&key!='classfication') {
						uni.showToast({
							icon: "none",
							title: "请将信息填写完整"
						})
						return
					}
				}
				if (this.identity != 3) {
					let that = this
					uni.showModal({
						title: '免责声明',
						content: '免责声明免责声明免责声明免责声明免责声明',
						success: async function(res) {
							if (res.confirm) {
								let res = await that.$api.releaseJobNeed(that.jobInfo)
								// console.log(res)
								if (res.code == 20000) {
									uni.showToast({
										title: "发布成功"
									})
									uni.removeStorageSync('jobRelease')
									setTimeout(() => {
										uni.navigateBack()
									}, 400)
								} else {
									uni.showToast({
										icon: "none",
										title: "发布失败"
									})
								}
							} else if (res.cancel) {
								return
							}
						}
					})
				} else {
					let res = await this.$api.releaseJobNeed(this.jobInfo)
					// console.log(res)
					if (res.code == 20000) {
						uni.showToast({
							title: "发布成功"
						})
						uni.removeStorageSync('jobRelease')
						setTimeout(() => {
							uni.navigateBack()
						}, 400)
					} else {
						uni.showToast({
							icon: "none",
							title: "发布失败"
						})
					}
				}
			},
			// 获取招聘详情
			async getJobDetail(id) {
				let res = await this.$api.getJobDetail({
					id
				})
				// console.log(res)
				this.jobInfo = res.data.detail
				uni.setStorageSync('jobRelease', this.jobInfo)
			},
			// 修改招聘信息
			async editJobNeed() {
				console.log(this.jobInfo)
				let res = await this.$api.editJobNeed(this.jobInfo)
				if (res.code == 20000) {
					uni.showToast({
						title: "修改成功"
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 400)
				} else {
					uni.showToast({
						icon: "none",
						title: "修改失败"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.jobContainer {
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.mainContainer {
			width: 100%;
			margin: 0 auto;
			padding: 30rpx 5% 60rpx;
			box-sizing: border-box;
			background-color: #fff;

			.category {
				position: relative;
				margin-bottom: 30rpx;

				.input {
					width: 100%;
					font-size: 44rpx;
					font-weight: bold;
				}

				text {
					position: absolute;
					bottom: 0;
					right: 0;
				}
			}

			.common {
				padding: 20rpx 0;
				border-bottom: 1rpx #eee solid;

				input,
				.input {
					margin-top: 20rpx;
					letter-spacing: 1rpx;
					height: 60rpx;
					font-size: 32rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.release {
				width: 100%;
				margin: 30rpx auto 0;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background-color: #36c1ba;
				color: #fff;
				border-radius: 10rpx;
				letter-spacing: 1rpx;
			}
		}
	}
</style>
