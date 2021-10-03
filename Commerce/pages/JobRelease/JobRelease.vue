<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体 -->
		<view class="mainContainer">
			<view class="common">
				<text>招聘岗位</text>
				<input type="text" v-model="jobInfo.job" placeholder="请填写招聘岗位" />
			</view>
			<view class="common">
				<text>招聘类型</text>
				<picker @change="selectCategory" range-key="name" :value="index" :range="cateList">
					<view class="input">{{cateList[jobInfo.category].name}}</view>
				</picker>
			</view>
			<view class="common">
				<text>招聘关键词</text>
				<input type="text" v-model="jobInfo.brief" placeholder="请填写招聘关键词" />
			</view>
			<view class="common">
				<text>需求描述</text>
				<textarea type="text" v-model="jobInfo.need" placeholder="请填写需求描述" />
			</view>
			<view class="common">
				<text>学历要求</text>
				<textarea type="text" v-model="jobInfo.education" placeholder="请填写学历要求" />
			</view>
			<view class="common">
				<text>经验要求</text>
				<textarea type="text" v-model="jobInfo.experience" placeholder="请填写经验要求" />
			</view>
			<view class="common">
				<text>招聘人数</text>
				<input type="text" v-model="jobInfo.num" placeholder="请填写招聘人数(数字)" />
			</view>
			<view class="common">
				<text>地址</text>
				<textarea type="text" v-model="jobInfo.place" placeholder="请填写地址" />
			</view>
			<view class="common">
				<text>薪资</text>
				<input type="text" v-model="jobInfo.reward" placeholder="请填写薪资" />
			</view>
			<view class="release" @click="releaseJobNeed()">
				<text class="iconfont icon-submit"></text>
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
					category: 0,
					education: "",
					experience: '',
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
				]
			};
		},
		onLoad(options) {
			if (options.id) {
				this.setNav.navTitle = "修改招聘"
				this.flag = 2
				this.getJobDetail(options.id)
			}
		},
		methods: {
			selectCategory(e) {
				this.jobInfo.category = e.detail.value
			},
			// 发布招聘
			async releaseJobNeed() {
				this.jobInfo.num = parseInt(this.jobInfo.num)
				this.jobInfo.category = parseInt(this.jobInfo.category)
				if (this.flag == 2) {
					this.editJobNeed()
					return
				}
				let res = await this.$api.releaseJobNeed(this.jobInfo)
				// console.log(res)
				if (res.code == 20000) {
					uni.showToast({
						title: "发布成功"
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 400)
				} else {
					uni.showToast({
						icon: "none",
						title: "发布失败"
					})
				}
			},
			// 获取招聘详情
			async getJobDetail(id) {
				let res = await this.$api.getJobDetail({
					id
				})
				// console.log(res)
				this.jobInfo = res.data.detail
				this.jobInfo.category =res.data.detail.classfication
			},
			// 修改招聘信息
			async editJobNeed() {
				let res = await this.$api.editJobNeed(this.jobInfo)
				// console.log(res)
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

			.common {
				margin-bottom: 20rpx;

				input,
				.input {
					background-color: #f1f1f1;
					margin-top: 20rpx;
					border-radius: 10rpx;
					padding: 20rpx;
					letter-spacing: 1rpx;
				}

				textarea {
					background-color: #f1f1f1;
					margin-top: 20rpx;
					border-radius: 10rpx;
					padding: 20rpx;
					letter-spacing: 1rpx;
				}
			}

			.release {
				width: 120rpx;
				margin: 50rpx 40rpx 0 500rpx;
				padding: 10rpx;
				background-color: #eee;
				border-radius: 10rpx;

				.iconfont {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
