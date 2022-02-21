<template>
	<view class="infoContainer">
		<view class="title">
			资格证书
		</view>
		<view class="container">
			<view class="common">
				<input type="text" v-model="inputValue" placeholder="请输入证书" />
				<view class="add" @click="addItem()">
					添加
				</view>
			</view>
			<view class="list">
				<view class="box" v-for="(item,index) in list" :key="index">
					{{item}}
					<text class="iconfont icon-shanchu" @click="deleteItem(item)"></text>
				</view>
			</view>
		</view>
		<view class="btn" @click="addResume()">
			保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				inputValue: "",
				certificate: "",
				list: []
			};
		},
		created() {
			this.getResume()
		},
		methods: {
			addItem() {
				if (!this.inputValue) {
					uni.showToast({
						icon: "none",
						title: '不能为空'
					})
					return
				}
				this.list.unshift(this.inputValue)
			},
			deleteItem(item) {
				this.list.forEach((i, index) => {
					if (i == item) {
						this.list.splice(index, 1)
					}
				})
			},
			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				this.certificate = res.data.resume.certificate
				if (this.certificate) {
					this.list = JSON.parse(this.certificate)
				} else {
					this.list = ['大学英语六级', "计算机二级", '网络工程师', '软件工程师', "普通话资格证"]
				}
			},
			// 添加简历
			async addResume() {
				this.certificate = JSON.stringify(this.list)
				let res = await this.$api.addResume({
					certificate: this.certificate
				})
				console.log(res)
				if (res.code == 20000) {
					uni.showToast({
						icon: "none",
						title: "保存成功"
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 300)
				} else {
					uni.showToast({
						icon: "none",
						title: "保存失败"
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.infoContainer {
		padding: 30rpx 5%;
		background-color: #fff;

		.title {
			font-size: 38rpx;
			font-weight: bold;
		}

		.container {
			margin-top: 30rpx;

			.common {
				padding: 20rpx 0;
				border-bottom: 1rpx #eee solid;
				display: flex;
				justify-content: space-between;

				input {
					width: 80%;
					height: 40rpx;
				}

				.add {
					color: #36c1ba;
					font-size: 30rpx;
				}
			}

			.list {
				margin-top: 20rpx;
				display: flex;
				flex-wrap: wrap;
				font-size: 24rpx;

				.box {
					padding: 4rpx 10rpx;
					border-radius: 8rpx;
					border: 1rpx solid #36c1ba;
					color: #36c1ba;
					margin: 0 14rpx 16rpx 0;

					.iconfont {
						font-size: 30rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.btn {
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
</style>
