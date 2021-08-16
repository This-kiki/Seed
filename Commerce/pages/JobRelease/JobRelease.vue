<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体 -->
		<view class="mainContainer">
			<view class="common">
				<text>招聘岗位</text>
				<input type="text" v-model="jobInfo.job" />
			</view>
			<view class="common">
				<text>招聘关键词</text>
				<input type="text" v-model="jobInfo.brief" />
			</view>
			<view class="common">
				<text>需求描述</text>
				<textarea type="text" v-model="jobInfo.need" />
			</view>
			<view class="common">
				<text>招聘人数</text>
				<input type="text" v-model="jobInfo.num" placeholder="请填写数字" />
			</view>
			<view class="common">
				<text>地址</text>
				<textarea type="text" v-model="jobInfo.place" />
			</view>
			<view class="common">
				<text>薪资</text>
				<input type="text" v-model="jobInfo.reward" />
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
					job: "",
					brief: "",
					need: "",
					num: 0,
					place: "",
					reward: ''
				},
				// flag
				flag: 1
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
			// 发布招聘
			async releaseJobNeed() {
				this.jobInfo.num = parseInt(this.jobInfo.num)
				if(this.flag == 2){
					this.editJobNeed()
					return
				}
				let res = await this.$api.releaseJobNeed(this.jobInfo)
				// console.log(res)
				if (res.code == 20000) {
					uni.showToast({
						title: "发布成功"
					})
					uni.navigateBack()
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
			},
			// 修改招聘信息
			async editJobNeed(){
				let res = await this.$api.editJobNeed(this.jobInfo)
				// console.log(res)
				if (res.code == 20000) {
					uni.showToast({
						title: "修改成功"
					})
					uni.navigateBack()
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
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.mainContainer {
			width: 94%;
			margin: 20rpx auto 0;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #fff;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			border-radius: 14rpx;

			.common {
				margin-bottom: 20rpx;

				input {
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
