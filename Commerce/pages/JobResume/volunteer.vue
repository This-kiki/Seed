<template>
	<view class="infoContainer">
		<view class="title">
			编辑志愿者服务经历
		</view>
		<view class="list">
			<view class="box" v-for="(item,index) in info.volunteerList" :key="index">
				<view class="tag">
					{{`第${info.volunteerList.length - index}项`}}
				</view>
				<view class="common">
					<text class="name">项目名称</text>
					<input type="text" v-model="item.volunteerName" placeholder="请填写项目名称" />
				</view>
				<view class="common">
					<text class="name">服务时长</text>
					<input type="text" v-model="item.volunteerLong" placeholder="请填写服务时长" />
				</view>
				<view class="common">
					<text class="name">服务时间</text>
					<input type="text" v-model="item.volunteerTime" placeholder="请填写服务时间" />
				</view>
				<view class="common">
					<text class="name">项目描述</text>
					<textarea v-model="item.volunteerDesc" placeholder="请填写项目描述" />
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="btn" @click="addNew()">
				新建
			</view>
			<view class="btn" @click="addResume()">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {}
			};
		},
		created() {
			this.getResume()
		},
		methods: {
			// 获取自己的简历
			async getResume() {
				let res = await this.$api.getResume()
				this.info = res.data.resume
				if (!this.info.volunteerList) {
					this.info.volunteerList = [{
						volunteerName: "",
						volunteerLong: "",
						volunteerTime: "",
						volunteerDesc: ""
					}]
				}
				this.info.volunteerList = this.info.volunteerList.reverse()
			},
			// 添加简历
			async addResume() {
				this.info.volunteerList = this.info.volunteerList.reverse()
				let res = await this.$api.addResume(this.info)
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
			// 添加一项志愿者
			addNew() {
				let item = {
					volunteerName: "",
					volunteerLong: "",
					volunteerTime: "",
					volunteerDesc: ""
				}
				this.info.volunteerList.unshift(item)
			}
		}
	}
</script>

<style lang="scss">
	.infoContainer {
		background-color: #f5f5f5;
		width: 100%;
		min-height: 100vh;

		.title {
			font-size: 38rpx;
			font-weight: bold;
			padding: 30rpx 5%;
		}

		.list {
			display: flex;
			justify-content: flex-start;
			overflow-x: scroll;
			padding-bottom: 50rpx;

			.box {
				background-color: #fff;
				padding: 40rpx 30rpx;
				width: 94%;
				margin: 0 3%;
				border-radius: 10rpx;
				box-shadow: 0 4px 8px 1px rgba(100, 100, 100, 0.1), 0 6px 16px 1px rgba(140, 140, 140, 0.08);

				.tag {
					font-size: 32rpx;
					font-weight: bold;
				}

				.common {
					padding: 20rpx 0;
					border-bottom: 4rpx #eee solid;

					.name {
						font-size: 28rpx;
						color: #666;
						margin-bottom: 10rpx;
					}

					input,
					picker {
						width: 100%;
						height: 40rpx;
					}
				}

			}
		}

		.bottom {
			display: flex;
			justify-content: space-around;
			width: 100%;

			.btn {
				width: 30%;
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
