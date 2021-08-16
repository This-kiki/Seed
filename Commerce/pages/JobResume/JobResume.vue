<template>
	<view class="jobContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 主体 -->
		<view class="mainContainer" v-if="resumeInfo!=null">
			<view class="img">
				<image :src="resumeInfo.img" mode=""></image>
			</view>
			<view class="name">
				{{resumeInfo.name}}
			</view>
			<view class="common">
				<text>计算机水平</text>
				{{resumeInfo.computer}}
			</view>
			<view class="common">
				<text>英语水平</text>
				{{resumeInfo.english}}
			</view>
			<view class="common">
				<text>健康状况</text>
				{{resumeInfo.health}}
			</view>
			<view class="common">
				<text>婚姻状况</text>
				{{resumeInfo.marriage}}
			</view>
			<view class="common">
				<text>自我介绍</text>
				<view class="content">
					{{resumeInfo.evaluate}}
				</view>
			</view>
			<view class="common">
				<text>现所在地</text>
				<view class="content">
					{{resumeInfo.location}}
				</view>
			</view>
			<view class="common">
				<text>主要专业课程</text>
				<view class="content">
					{{resumeInfo.course}}
				</view>
			</view>
			<view class="common">
				<text>获奖情况</text>
				<view class="content">
					{{resumeInfo.award}}
				</view>
			</view>
			<view class="common">
				<text>所获证书</text>
				<view class="content">
					{{resumeInfo.certificate}}
				</view>
			</view>
			<view class="common">
				<text>社会实践</text>
				<view class="content">
					{{resumeInfo.social}}
				</view>
			</view>
			<view class="common">
				<text>爱好</text>
				<view class="content">
					{{resumeInfo.hobby}}
				</view>
			</view>
		</view>
		<!-- 操作 -->
		<view class="operateContainer">
			<view class="addEdit" @click="addResume()">
				<text class="iconfont icon-xiugai"></text>
				{{addEdit}}
			</view>
			<view class="delete" @click="deleteResume()">
				<text class="iconfont icon-shanchu"></text>
				删除
			</view>
		</view>
		<view class="noData" v-if="resumeInfo==null">
			暂无简历
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "我的简历",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 简历信息
				resumeInfo: {},
				// 添加/修改
				addEdit: "修改"
			}
		},
		onShow() {
			this.getResume()
		},
		methods: {
			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				// console.log(res)
				this.resumeInfo = res.data.resume
				if (this.resumeInfo == null) {
					this.addEdit = "添加"
					uni.showModal({
						content: "请先完善用户个人信息",
						confirmText: '确定',
						cancelText: '取消',
					})
				}
			},
			// 会员删除简历
			async deleteResume() {
				if (this.resumeInfo == null) {
					uni.showToast({
						icon: "none",
						title: "请先添加简历"
					})
				}
				let res = await this.$api.deleteResume({
					id: this.resumeInfo.id
				})
				console.log(res)
				if (res.code == 20000) {
					uni.showToast({
						title: "删除成功"
					})
					this.getResume()
				}
			},
			// 添加/修改简历
			addResume() {
				if (this.resumeInfo)
					uni.navigateTo({
						url: `/pages/JobResumeAdd/JobResumeAdd?id=${this.resumeInfo.id}`
					})
				else
					uni.navigateTo({
						url: `/pages/JobResumeAdd/JobResumeAdd`
					})
			}
		}
	}
</script>

<style lang="scss">
	.jobContainer {
		padding-bottom: 150rpx;
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

			.img {
				width: 200rpx;
				height: 250rpx;
				margin: 10rpx auto;
				background-color: lightblue;
				border-radius: 14rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 14rpx;
				}
			}

			.name {
				margin: 20rpx auto;
			}

			.common {
				margin-bottom: 20rpx;
				font-size: 28rpx;
				padding-bottom: 20rpx;
				border-bottom: 1rpx #eee solid;

				text {
					margin-right: 20rpx;
					font-size: 24rpx;
					color: #333;
				}

				.content {
					margin-top: 10rpx;
					letter-spacing: 1rpx;
				}
			}
		}

		.operateContainer {
			width: 96%;
			height: 120rpx;
			position: fixed;
			right: 2%;
			bottom: 10rpx;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
			background-color: #fff;
			border-radius: 14rpx;
			padding: 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.iconfont {
				margin-right: 10rpx;
			}

			.addEdit {
				padding: 10rpx;
				background-color: #56b6c2;
				color: #fff;
				border-radius: 10rpx;
			}

			.delete {
				padding: 10rpx;
				background-color: #e06c75;
				color: #fff;
				border-radius: 10rpx;
			}
		}
		.noData{
			margin: 300rpx auto;
			text-align: center;
			color: #999;
		}
	}
</style>
