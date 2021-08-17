<template>
	<view class="lawContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 时间浏览量 -->
		<view class="top">
			<view class="date">
				{{lawDetail.createTime}}
			</view>
			<view class="view">
				<text class="iconfont icon-view"></text>
				{{lawDetail.view}}
			</view>
		</view>
		<!-- 文本内容 -->
		<view class="content" v-html="lawDetail.content">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setNav: {
					titleColor: "black",
					navTitle: "法律常识详情",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// id
				id: "",
				// 详情
				lawDetail: {}
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getLawInfoDetail()
		},
		methods: {
			// 获得常识详情
			async getLawInfoDetail() {
				let res = await this.$api.getLawInfoDetail({
					id: this.id
				})
				console.log(res)
				this.lawDetail = res.data.rows
				this.setNav.navTitle = this.lawDetail.title
			}
		}
	}
</script>

<style lang="scss">
	.lawContainer {
		padding-bottom: 50rpx;
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #f1f1f1;

		.top {
			width: 94%;
			margin: 20rpx auto 0;
			display: flex;
			justify-content: space-between;
			color: #999;
			font-size: 24rpx;

			.view {
				display: flex;
				align-items: center;

				.iconfont {
					margin-right: 8rpx;
				}
			}
		}

		.content {
			width: 94%;
			margin: 30rpx auto 0;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			min-height: 400rpx;
			box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
		}
	}
</style>
