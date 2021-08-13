<template>
	<view class="UserListContainer">
		<!-- 顶部 -->
		<topBar :nav="setNav" :loading="setLoading"></topBar>
		<!-- 管理层 -->
		<view class="mainContaienr">
			<view class="title">
				管理层介绍
			</view>
			<view class="imgContainer">
				<view class="imgBox" v-for="item in managerList" :key="item.openId"  @click="seeDetail(item.openId)">
					<view class="img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 用户 -->
		<view class="mainContaienr">
			<view class="title">
				会员风采
			</view>
			<view class="imgContainer">
				<view class="imgBox" v-for="item in userList" :key="item.openId" @click="seeDetail(item.openId)">
					<view class="img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
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
					navTitle: "会员风采",
					bgColor: "white",
					isShowBackBtn: true,
					backBtnColor: "black"
				},
				// 管理层列表
				managerList: [],
				// 会员列表
				userList: []
			};
		},
		created() {
			this.getManagerList()
			this.getUserList()
		},
		methods: {
			// 管理层列表
			async getManagerList() {
				let data = {
					current: 1,
					limit: 200
				}
				let res = await this.$api.getManagerList(data)
				// console.log(res)
				this.managerList = res.data.rows
			},
			// 会员列表
			async getUserList() {
				let data = {
					current: 1,
					limit: 200
				}
				let res = await this.$api.getManagerList(data)
				// console.log(res)
				this.userList = res.data.rows
			},
			// 查看详情
			seeDetail(openId) {
				uni.navigateTo({
					url:`/pages/UserListDetail/UserListDetail?id=${openId}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.UserListContainer {
		padding-bottom: 50rpx;

		.mainContaienr {
			width: 96%;
			margin: 20rpx auto 0;

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
				background-color: lightblue;
				top: 5rpx;
				left: -20rpx;
				border-radius: 5rpx;
			}

			.imgContainer {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.imgBox {
					width: 30%;

					.img {
						width: 100%;
						height: 260rpx;	
						background-color: lightblue;
						border-radius: 14rpx;
					    box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

						image {
							width: 100%;
							height: 100%;
							border-radius: 14rpx;
						}
					}
					.name{
						text-align: center;
						font-size: 28rpx;
						margin: 15rpx 0 20rpx;
						letter-spacing: 1rpx;
					}
				}
			}
		}
	}
</style>
