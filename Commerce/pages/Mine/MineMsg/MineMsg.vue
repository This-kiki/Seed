<template>
	<view class="body">
		<!-- 顶部 -->
		<topBar :nav="setNav"></topBar>
		<view class="container">
			<view class="ui-all">
				<view class="avatar" @tap="avatarChoose">
					<view class="imgAvatar"><view class="iavatar" :style="'background: url(' + mineMsg.img + ') no-repeat center/cover #eeeeee;'"></view></view>
					<text v-if="mineMsg.img">修改头像</text>
					<text v-if="!mineMsg.img">选择头像</text>
				</view>
				<view class="text-box">
					<text>姓名</text>
					<input class="input-box" type="text" v-model="mineMsg.name" placeholder-class="place" />
				</view>
				<view class="picker-box">
					<text>生日</text>
					<picker class="picker" mode="date" v-model="mineMsg.birth" @change="bindDateChange">
						<view class="picker-text">{{ mineMsg.birth ? mineMsg.birth : ' ' }}</view>
					</picker>
				</view>
				<view class="picker-box">
					<text>性别</text>
					<picker class="picker" mode="selector" range-key="name" v-model="mineMsg.sex" @change="bindSexChange" :range="sex">
						<view class="picker-text">{{ mineMsg.sex == 0 ? '男' : mineMsg.sex == 1 ? '女' : '' }}</view>
					</picker>
				</view>
				<view class="picker-box">
					<text>籍贯</text>
					<picker class="picker" mode="region" v-model="mineMsg.place" @change="bindRegionChange">
						<view class="picker-text">{{ mineMsg.place ? mineMsg.place : ' ' }}</view>
					</picker>
				</view>
				<view class="text-box">
					<text>手机号</text>
					<input class="input-box" type="text" v-model="mineMsg.phone" placeholder-class="place" />
				</view>
				<view class="text-box">
					<text>工作单位</text>
					<input class="input-box" type="text" v-model="mineMsg.work" placeholder-class="place" />
				</view>
				<view class="text-box">
					<text>工作职位</text>
					<input class="input-box" type="text" v-model="mineMsg.position" placeholder-class="place" />
				</view>
			</view>
			<button class="save" @tap="save">保 存 修 改</button>
		</view>
	</view>
</template>

<script>
import { regular } from '../../../util/common.js';
export default {
	data() {
		return {
			setNav: {
				titleColor: 'black',
				navTitle: '个人资料',
				bgColor: 'white',
				isShowBackBtn: true,
				backBtnColor: 'black'
			},
			temp: null,
			mineMsg: {
				img: '',
				name: '',
				birth: '',
				sex: 3,
				place: '',
				phone: '',
				work: '',
				position: ''
			},
			sex: [
				{
					id: 0,
					name: '男'
				},
				{
					id: 1,
					name: '女'
				}
			]
		};
	},
	mounted() {
		this.getUserInfo();
	},
	methods: {
		judge() {
			// console.log(regular(this.mineMsg))
			return regular(this.mineMsg);
		},
		getUserInfo() {
			this.$api.getUserMsg().then(res => {
				// this.mineMsg = res.data.userBaseInfo;
				var obj = res.data.userBaseInfo
				for(let key  in obj){
					// console.log(key,'-',obj[key])
					this.mineMsg[key] = obj[key]
				}
				// if (this.mineMsg.place == null) {
				// 	this.mineMsg.place = '';
				// }
			});
		},
		bindSexChange(e) {
			this.mineMsg.sex = e.detail.value;
		},
		bindDateChange(e) {
			this.mineMsg.birth = e.detail.value;
		},
		bindRegionChange(e) {
			// console.log(e)
			this.mineMsg.place = e.detail.value.join('-');
		},
		save() {
			if (this.judge().status == true) {
				uni.showLoading({
					title: '正在提交'
				});
				if (this.temp) {
					this.$api
						.uploadPicture({
							tempFilePaths: this.temp
						})
						.then(res => {
							// console.log(res)
							var obj = this.mineMsg;
							obj.img = res.data.url;
							this.$api
								.changeUserMsg(obj)
								.then(res => {
									uni.hideLoading();
									if (res.code == 20000) {
										uni.showToast({
											title: '修改成功',
											duration: 2000
										});
										setTimeout(() => {
											uni.navigateBack({});
										}, 1000)
									}
								})
								.catch(err => {
									uni.hideLoading();
									uni.showToast({
										title: '提交失败，请重新提交',
										icon: 'none'
									});
								});
						});
				} else if (this.mineMsg.img) {
					var obj = this.mineMsg;
					this.$api
						.changeUserMsg(obj)
						.then(res => {
							uni.hideLoading();
							if (res.code == 20000) {
								uni.showToast({
									title: '修改成功',
									duration: 2000
								});
								setTimeout(() => {
									uni.navigateBack({});
								}, 1000)
							}
						})
						.catch(err => {
							uni.hideLoading();
							uni.showToast({
								title: '提交失败，请重新提交',
								icon: 'none'
							});
						});
				}
			} else {
				uni.showToast({
					title: this.judge().value,
					icon: 'none'
				});
				return false;
			}
		},
		isPoneAvailable(poneInput) {
			var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(poneInput)) {
				return false;
			} else {
				return true;
			}
		},
		avatarChoose() {
			let that = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					const tempFilePaths = res.tempFilePaths;
					that.temp = tempFilePaths;
					that.mineMsg.img = tempFilePaths[0];
				}
			});
		}
	}
};
</script>

<style lang="scss">
.body {
	width: 100%;
}
.container {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	.ui-all {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		.avatar {
			width: 100%;
			height: 180rpx;
			border-bottom: solid 1px #f2f2f2;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;

			.imgAvatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;
				margin-left: 50rpx;

				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 40rpx;
			}
		}

		.text-box {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			border-bottom: solid 1px #f2f2f2;

			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 30rpx;
				width: 150rpx;
			}

			.input-box {
				color: rgb(121, 121, 121);
				margin-left: 20rpx;
				font-size: 28rpx;
			}

			.place {
				color: rgb(200, 200, 200);
			}
		}
		.text-box:hover {
			background-color: #eaeaea;
		}
		.textarea-box {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			border-bottom: solid 1px #f2f2f2;

			text {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 30rpx;
				width: 150rpx;
				height: 100rpx;
			}

			.textarea {
				color: rgb(121, 121, 121);
				margin-left: 20rpx;
				font-size: 28rpx;
				height: 150rpx;
				width: 95%;
				border: solid 1px #f2f2f2;
			}

			.place {
				color: rgb(200, 200, 200);
			}
		}

		.picker-box {
			width: 100%;
			height: 100rpx;
			display: flex;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			border-bottom: solid 1px #f2f2f2;

			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 30rpx;
				width: 150rpx;
			}

			.picker {
				width: 80%;
				height: 100rpx;
			}

			.picker-text {
				color: rgb(121, 121, 121);
				margin-left: 26rpx;
				height: 100rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
		}
		.picker-box:hover {
			background-color: #eaeaea;
		}
	}

	.save {
		width: 80%;
		background: #030303;
		border: none;
		color: #ffffff;
		margin: 100rpx 0rpx;
		font-size: 28rpx;
	}
}
</style>
