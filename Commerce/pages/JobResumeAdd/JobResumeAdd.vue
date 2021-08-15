<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<view class="mainContainer">
			<view class="common">
				<text>计算机水平</text>
				<input type="text" v-model="resumeInfo.computer" />
			</view>
			<view class="common">
				<text>英语水平</text>
				<input type="text" v-model="resumeInfo.english" />
			</view>
			<view class="common">
				<text>健康状况</text>
				<input type="text" v-model="resumeInfo.health" />
			</view>
			<view class="common">
				<text>婚姻状况</text>
				<input type="text" v-model="resumeInfo.marriage" />
			</view>
			<view class="common">
				<text>自我介绍</text>
				<view class="content">
					<textarea type="text" v-model="resumeInfo.evaluate" />
				</view>
			</view>
			<view class="common">
				<text>现所在地</text>
				<view class="content">
					<textarea type="text" v-model="resumeInfo.location" />
				</view>
			</view>
			<view class="common">
				<text>主要专业课程</text>
				<view class="content">
					<textarea type="text" v-model="resumeInfo.course" />
				</view>
			</view>
			<view class="common">
				<text>获奖情况</text>
				<view class="content">
					<textarea type="text" v-model="resumeInfo.award" />
				</view>
			</view>
			<view class="common">
				<text>所获证书</text>
				<view class="content">
					<textarea type="text" v-model="resumeInfo.certificate" />
				</view>
			</view>
			<view class="common">
				<text>社会实践</text>
				<view class="content">
					<textarea type="text" v-model="resumeInfo.social" />
				</view>
			</view>
			<view class="common">
				<text>爱好</text>
				<view class="content">
					<textarea type="text" v-model="resumeInfo.hobby" />
				</view>
			</view>
			<view class="operate" @click="addResume()">
				<text class="iconfont icon-xiugai"></text>
				添加
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
					navTitle: "添加简历",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 添加表单
				resumeInfo: {
					award: "",
					certificate: "",
					computer: "",
					course: "",
					english: "",
					evaluate: "",
					health: "",
					hobby: "",
					location: "",
					marriage: "",
					social: ""
				},

			};
		},
		onLoad(options) {
			if (options.id) {
				this.setNav.navTitle = "修改简历"
				this.getResume()
			}
		},
		methods: {
			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				// console.log(res)
				this.resumeInfo = res.data.resume
			},
			// 添加简历
			async addResume() {
				let res = await this.$api.addResume(this.resumeInfo)
				console.log(res)
				if (res.code == 20000) {
					uni.showToast({
						title: "添加成功"
					})
					uni.navigateBack({
						animationDuration: 500
					})
				} else {
					uni.showToast({
						icon: "none",
						title: "添加失败"
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
			width: 96%;
			margin: 20rpx auto 0;
			background-color: #fff;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			border-radius: 14rpx;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

			.common {
				margin-bottom: 20rpx;
			}

			text {
				font-size: 26rpx;
				color: #333;
			}

			input,
			textarea {
				background-color: #f1f1f1;
				margin-top: 10rpx;
				padding: 10rpx;
				border-radius: 10rpx;
			}

			.operate {
				margin-top: 20rpx;
				padding: 10rpx;
				background-color: #56b6ad;
				border-radius: 10rpx;
				color: #fff;
				width: 120rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.iconfont {
					color: #fff;
					font-size: 36rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
