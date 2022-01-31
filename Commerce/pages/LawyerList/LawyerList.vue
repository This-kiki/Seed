<template>
	<!-- 用户 -->
	<view class="mainContaienr">
		<view class="title">
			律师
		</view>
		<view class="imgContainer">
			<view class="imgBox" v-for="item in lawList" :key="item.openId" @click="checkIdentity(item.openId)">
				<view class="img" :style="{'background-image':'url('+item.img+')'}">
				</view>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 律师列表
				lawList: [],
			};
		},
		created() {
			this.getLawyerList()
		},
		methods: {
			// 获取律师列表
			async getLawyerList() {
				let data = {
					current: 1,
					limit: 200,
					key: "",
				}
				let res = await this.$api.getLawyerList(data)
				console.log(res)
				let nowList = res.data.rows
				this.lawList.push.apply(this.lawList, nowList)
			},
			// 查看详情
			seeDetail(openId) {
				uni.navigateTo({
					url: `/pages/UserListDetail/UserListDetail?id=${openId}&flag=${this.flag}`
				})
			},
			// 检查身份
			checkIdentity(openId) {
				let identity = uni.getStorageSync("identity")
				this.identity = identity
				if (identity == 0) {
					uni.showModal({
						title: "暂无权限",
						content: "请申请入会",
						showCancel: false
					})
				}else{
					this.seeDetail(openId)
				}
			},
		}
	}
</script>

<style lang="scss">
	.mainContaienr {
		width: 96%;
		margin: 20rpx auto 0;
		padding-bottom: 100rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			position: relative;
			margin-left: 20rpx;
		}

		.title:before {
			content: "";
			position: absolute;
			width: 8rpx;
			height: 36rpx;
			background-color: #36c1ba;
			top: 5rpx;
			left: -20rpx;
			border-radius: 5rpx;
		}

		.imgContainer {
			margin-top: 20rpx;
			display: flex;
			// justify-content: space-between;
			flex-wrap: wrap;

			.imgBox {
				width: 30%;
				margin-left: 20rpx;

				.img {
					width: 100%;
					height: 280rpx;
					background-color: #36c1ba;
					border-radius: 14rpx;
					box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}

				.work {
					text-align: center;
					font-size: 26rpx;
					margin-top: 10rpx;
					font-weight: bold;
					color: #666;
				}

				.name {
					text-align: center;
					font-size: 28rpx;
					margin: 4rpx 0 20rpx;
					letter-spacing: 1rpx;
				}
			}
		}
	}
</style>
