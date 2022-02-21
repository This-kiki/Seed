<template>
	<view class="UserListContainer">
		<!-- 管理层 -->
		<view class="mainContaienr" v-if="flag==1">
			<view class="title">
				管理层介绍
			</view>
			<view class="imgContainer">
				<view class="imgBox" v-for="item in managerList" :key="item.openId" @click="checkIdentity(item.openId)">
					<view class="img" :style="{'background-image':'url('+item.img+')'}">
					</view>
					<view class="work">
						{{getIdentity(item.identity)}}
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
				<view class="noData" v-if="!managerList.length">
					暂无信息
				</view>
			</view>
		</view>
		<!-- 用户 -->
		<view class="mainContaienr" v-if="flag==2">
			<view class="title">
				会员风采
			</view>
			<view class="imgContainer">
				<view class="imgBox" v-for="item in userList" :key="item.openId" @click="checkIdentity(item.openId)">
					<view class="img" :style="{'background-image':'url('+item.img+')'}">
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
				<view class="noData" v-if="!userList.length">
					暂无信息
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['flag'],
		data() {
			return {
				// 管理层列表
				managerList: [],
				// 会员列表
				userList: [],
			};
		},
		created() {
			this.getManagerList()
			this.getUserList()
		},
		methods: {
			// 获取身份
			getIdentity(id) {
				switch (id) {
					case 4:
						return "荣誉会长";
					case 5:
						return "会长";
					case 6:
						return "副会长";
					case 7:
						return "执行委员会";
					case 8:
						return "秘书长";
					case 9:
						return "会计";
					case 10:
						return "出纳";
					case 11:
						return "会员";
				}
			},
			// 管理层列表
			async getManagerList() {
				let data = {
					current: 1,
					limit: 20000
				}
				let res = await this.$api.getManagerList(data)
				// console.log(res)
				this.managerList = res.data.rows
			},
			// 会员列表
			async getUserList() {
				let data = {
					current: 1,
					limit: 20000
				}
				let res = await this.$api.getUserList(data)
				// console.log(res)
				this.userList = res.data.rows
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
				} else {
					this.seeDetail(openId)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.UserListContainer {
		padding-bottom: 100rpx;
		user-select: text;
		-webkit-user-select: text;

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

			.noData {
				margin: 300rpx auto;
				text-align: center;
				color: #999;
			}
		}
	}
</style>
