<template>
	<view class="container">
		<view class="ui-all">
			<view class="avatar" @tap="avatarChoose">
				<view class="imgAvatar">
					<image class="page-headimg" :src="companyMsg.img" mode="aspectFill"></image>
				</view>
				<text v-if="companyMsg.img">修改公司标志图片</text>
				<text v-if="!companyMsg.img">选择公司标志图片</text>
			</view>
			<view class="text-box">
				<text>公司全称</text>
				<input class="input-box" type="text" v-model="companyMsg.companyName" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>注册资金</text>
				<input class="input-box" type="text" v-model="companyMsg.money" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>地址</text>
				<input class="input-box" type="text" v-model="companyMsg.address" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>公司联系电话</text>
				<input class="input-box" type="text" v-model="companyMsg.companyPhone" placeholder-class="place" />
			</view>
			<view class="textarea-box">
				<text>公司介绍</text>
				<textarea class="textarea" placeholder-class="place" v-model="companyMsg.content"></textarea>
			</view>
			<view class="text-box">
				<text>信用代码</text>
				<input class="input-box" type="text" v-model="companyMsg.creditCode" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>电子邮箱 </text>
				<input class="input-box" type="text" v-model="companyMsg.email" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>行业</text>
				<input class="input-box" type="text" v-model="companyMsg.industry" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>经营范围 </text>
				<input class="input-box" type="text" v-model="companyMsg.manageArea" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>企业人数</text>
				<input class="input-box" type="number" v-model="companyMsg.num" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>经营状态</text>
				<input class="input-box" type="text" v-model="companyMsg.manageStatus" placeholder-class="place" />
			</view>
			<view class="picker-box">
				<text>创建时间</text>
				<picker class="picker" mode="date" v-model="companyMsg.time" @change="bindDateChange">
					<view class="picker-text">
						{{companyMsg.time}}
					</view>
				</picker>
			</view>
			<view class="avatar" @tap="licenseAvatarChoose">
				<view class="imgAvatar">
					<image class="page-headimg" :src="companyMsg.license" mode="aspectFill"></image>
				</view>
				<text v-if="companyMsg.license">修改营业执照照片</text>
				<text v-if="!companyMsg.license">上传营业执照照片</text>
			</view>
			<view class="text-box">
				<text>法人代表姓名</text>
				<input class="input-box" type="text" v-model="companyMsg.representative" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>HR姓名</text>
				<input class="input-box" type="text" v-model="companyMsg.name" placeholder-class="place" />
			</view>
			<view class="picker-box">
				<text>HR性别</text>
				<picker class="picker" mode="selector" range-key="name" v-model="companyMsg.sex" @change="bindSexChange"
					:range="sexlist">
					<view class="picker-text">{{ companyMsg.sex == 0 ? '男' : companyMsg.sex == 1 ? '女' : '' }}</view>
				</picker>
			</view>
			<!-- 			<view class="text-box">
				<text>籍贯</text>
				<input class="input-box" type="text" v-model="companyMsg.place" placeholder-class="place" />
			</view> -->
			<view class="text-box">
				<text>HR手机号</text>
				<input class="input-box" type="text" v-model="companyMsg.phone" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>工作单位</text>
				<input class="input-box" type="text" v-model="companyMsg.work" placeholder-class="place" />
			</view>
			<view class="text-box">
				<text>工作职位</text>
				<input class="input-box" type="text" v-model="companyMsg.position" placeholder-class="place" />
			</view>
		</view>
		<button class="save" @tap="save">提 交 申 请</button>
	</view>
</template>

<script>
	import {
		regular
	} from '../../../util/common.js';
	export default {
		data() {
			return {
				temp: '',
				temp1: '',
				companyMsg: {
					img: '',
					address: '',
					companyName: '',
					companyPhone: '',
					content: '',
					creditCode: '',
					email: '',
					industry: '',
					license: '',
					manageArea: '',
					manageStatus: '',
					money: '',
					name: '',
					num: '',
					phone: '',
					representative: '',
					sex: 3,
					time: '',
				},
				sexlist: [{
						id: 0,
						name: '男'
					},
					{
						id: 1,
						name: '女'
					}
				]
			}
		},
		methods: {
			judge() {
				return regular(this.companyMsg);
			},
			bindSexChange(e) {
				this.companyMsg.sex = this.sexlist[e.detail.value].id;
			},
			bindDateChange(e) {
				this.companyMsg.time = e.detail.value;
			},
			save() {
				if (this.judge().status == true) {
					uni.showLoading({
						title: '正在提交'
					})
					this.$api.uploadPicture({
							tempFilePaths: this.temp
						})
						.then((img_res) => {
							// console.log(img_res)
							var obj = this.companyMsg
							obj.img = img_res.data.url
							this.$api.uploadPicture({
									tempFilePaths: this.temp1
								})
								.then((license_res) => {
									obj.license = license_res.data.url
									obj.openId = uni.getStorageSync('openid');
									this.$api.applyComopany(obj)
										.then((res) => {
											uni.hideLoading()
											if (res.success == true) {
												uni.showToast({
													title: '申请成功',
													duration: 2000
												});
												setTimeout(() => {
													uni.navigateBack({});
												}, 1000)
											} else {
												uni.showToast({
													title: res.message,
													icon: 'none'
												})
											}
										})
										.catch((err) => {
											uni.hideLoading()
											uni.showToast({
												title: '提交失败，请重新提交',
												icon: 'none'
											})
										})
								})
								.catch((err) => {
									uni.hideLoading()
									uni.showToast({
										title: '图片上传失败',
										icon: 'none'
									})
								})
						})
						.catch((err) => {
							uni.hideLoading()
							uni.showToast({
								title: '图片上传失败',
								icon: 'none'
							})
						})
				} else {
					uni.showToast({
						title: this.judge().value,
						icon: 'none'
					});
					return false
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
						const tempFilePaths = res.tempFilePaths
						that.temp = tempFilePaths
						that.companyMsg.img = tempFilePaths[0]
						// that.$api.uploadPicture({tempFilePaths: tempFilePaths}).then((res) => {
						// 	console.log(res)
						// })
					}
				});
			},
			licenseAvatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						const tempFilePaths = res.tempFilePaths
						that.temp1 = tempFilePaths
						that.companyMsg.license = tempFilePaths[0]
						// that.$api.uploadPicture({tempFilePaths: tempFilePaths}).then((res) => {
						// 	console.log(res)
						// })
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		user-select: text;
		-webkit-user-select: text;

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
					background-color: #d1d1d1;

					.iavatar {
						width: 100%;
						height: 100%;
						display: block;
					}
					
					.page-headimg {
						height: 140rpx;
						width: 140rpx;
						border-radius: 80rpx;
						overflow: hidden;
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
